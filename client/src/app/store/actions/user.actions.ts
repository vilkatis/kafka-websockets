import { createAction, props } from '@ngrx/store';

interface ILoginRequest {
}

interface ILoginResponse {
  userId: string;
}

interface ISubscribeToWebsocketRequest {

}

interface IAddProductRequest {
  productName: string;
}

export const loginRequest = createAction('[User] Login request', props<ILoginRequest>());
export const loginSuccess = createAction('[User] Login success', props<ILoginResponse>());
export const loginFailure = createAction('[User] Login failure');

export const socketUpdate = createAction('[User] Socket update', props<any>());

export const addProductRequest = createAction('[User] Add product request', props<IAddProductRequest>());
export const addProductSuccess = createAction('[User] Add product success');
export const addProductFailure = createAction('[User] Add product failure');
