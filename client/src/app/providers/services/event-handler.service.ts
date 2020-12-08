import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {
  public constructor(private _store: Store<IRootState>) {}

  // public catchEvent(event: IEvent): void {
  //   switch (event.type) {
  //     case 'auth':
  //       switch (event.action.type) {
  //         case 'login':
  //           this._store.dispatch(AuthActions.loginRequest());
  //           break;
  //       }
  //       break;
  //   }
  // }
}
