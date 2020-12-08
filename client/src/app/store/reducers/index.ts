import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface IRootState {
  [fromUser.name]: fromUser.State;
}

export const REDUCERS = new InjectionToken<ActionReducerMap<IRootState>>('Root reducers token', {
  factory: () => ({
    [fromUser.name]: fromUser.reducer,
  })
});

export { fromUser };
