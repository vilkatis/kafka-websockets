import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromUser, IRootState } from '../reducers';

const selectUserState = createFeatureSelector<IRootState, fromUser.State>(fromUser.name);
export const selectUserId = createSelector(selectUserState, state => state.userId);
