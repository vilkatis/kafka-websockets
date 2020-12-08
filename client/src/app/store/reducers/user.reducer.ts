import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions';

export const name = 'user';

export interface State {
  userId: string;
}

const initialState: State = {
  userId: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { userId }) => ({
    ...state,
    userId,
  }))
);
