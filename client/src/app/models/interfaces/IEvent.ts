type Keys<T> = keyof T;

interface Actions {
  user: UserActions;
}
interface UserActions {
  addInstrument: {
    type: 'addProduct';
    payload: string;
  };
}

type IAction<T, K extends Keys<T> = Keys<T>> = T[K];

export interface IEvent<T extends Keys<Actions> = Keys<Actions>> {
  type: T;
  action: IAction<Actions[T]>;
}
