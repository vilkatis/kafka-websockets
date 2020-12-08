import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from './store';
import { IEvent } from './models';
import { UserActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _store: Store<IRootState>) {
  }

  public catchEvent(event: IEvent) {
    switch (event.type) {
      case 'user':
        switch (event.action.type) {
          case 'addProduct':
            this._store.dispatch(UserActions.addProductRequest({productName: event.action.payload}));
            break;
        }
        break;
      default:
        break;
    }
  }
}
