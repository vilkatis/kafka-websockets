import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserActions } from '../actions';

@Injectable()
export class RootEffects {
  public init$: Observable<Action> = createEffect(() => this.actions$
    .pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        return [UserActions.loginRequest({})]
      })
    )
  );

  public constructor(private actions$: Actions) {}
}
