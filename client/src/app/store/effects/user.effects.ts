import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { ApiService, WebsocketService } from '../../providers';
import { of } from 'rxjs';
import { UserActions } from '../actions';
import { select, Store } from '@ngrx/store';
import { IRootState } from '../reducers';
import { UserSelectors } from '../selectors';

@Injectable()
export class UserEffects {
  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loginRequest),
      switchMap(() => of(UserActions.loginSuccess({userId: uuid()}))
      )
    )
  );

  public subscribeToWebsocket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.loginSuccess),
      switchMap(({userId}) =>
        this._websocketService.subscribeToSocket(userId).pipe(
          map(response => {
            return UserActions.socketUpdate(response);
          })
        )
      )
    )
  );

  public addProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UserActions.addProductRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this._store.pipe(select(UserSelectors.selectUserId)))
      )),
      switchMap(([{ productName}, userId]) =>
        this._apiService.addProduct(userId, { productName }).pipe(
          map(response => {
            return UserActions.addProductSuccess();
          }),
          catchError(err => of(UserActions.addProductFailure()))
        )
      )
    )
  );

  public constructor(private _actions$: Actions, private _store: Store<IRootState>, private _apiService: ApiService, private _websocketService: WebsocketService) {
  }
}
