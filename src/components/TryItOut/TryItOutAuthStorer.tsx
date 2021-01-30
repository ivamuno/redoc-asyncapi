// https://kentcdodds.com/blog/how-to-use-react-context-effectively

import * as React from 'react';

export enum TryItOutAuthReducerEnum {
  Change,
  Clear
}

export interface TryItOutAuthStorerAction {
  type: TryItOutAuthReducerEnum;
  token: string;
}

export interface TryItOutAuthStorerAuthState {
  token: string;
}

export const initialState: TryItOutAuthStorerAuthState = {
  token: ''
};

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext({} as React.Dispatch<TryItOutAuthStorerAction>);

export const { Provider: AuthStateProvider, Consumer: AuthStateConsumer } = AuthStateContext;
export const { Provider: AuthDispatchProvider, Consumer: AuthDispatchConsumer } = AuthDispatchContext;

export const AuthReducer = (initialState: TryItOutAuthStorerAuthState, action: TryItOutAuthStorerAction) => {
  switch (action.type) {
    case TryItOutAuthReducerEnum.Change:
      return { token: action.token, };
    case TryItOutAuthReducerEnum.Clear:
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function useAuthState(): TryItOutAuthStorerAuthState {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export function useAuthDispatch(): React.Dispatch<TryItOutAuthStorerAction> {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = React.useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
