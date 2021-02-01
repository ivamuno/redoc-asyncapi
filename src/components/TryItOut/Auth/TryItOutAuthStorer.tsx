// https://kentcdodds.com/blog/how-to-use-react-context-effectively

import * as React from 'react';
import { OpenAPISecuritySchemeEnum } from '../../../types';

export enum TryItOutAuthReducerEnum {
  Change,
  Clear
}

export interface TryItOutAuthStorerAuthItemBase<T> {
  id: string;
  type: OpenAPISecuritySchemeEnum;
  scheme?: string;
  value: T;
}

export interface TryItOutAuthStorerBasicAuthItemValue {
  user: string;
  pass: string;
}

export interface TryItOutAuthStorerApiKeyItemValue {
  key: string;
}

export interface TryItOutAuthStorerAuthItem
  extends TryItOutAuthStorerAuthItemBase<TryItOutAuthStorerBasicAuthItemValue | TryItOutAuthStorerApiKeyItemValue> {
}

export class TryItOutAuthStorerAuthState {
  items: TryItOutAuthStorerAuthItem[] = [];
  static compare = (item1, item2) => item1.id === item2.id && item1.type === item2.type && item1.scheme === item2.scheme;
}

export interface TryItOutAuthStorerAction {
  type: TryItOutAuthReducerEnum;
  item: TryItOutAuthStorerAuthItem;
}

export const initialState: TryItOutAuthStorerAuthState = {
  items: []
};

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext({} as React.Dispatch<TryItOutAuthStorerAction>);

export const { Provider: AuthStateProvider, Consumer: AuthStateConsumer } = AuthStateContext;
export const { Provider: AuthDispatchProvider, Consumer: AuthDispatchConsumer } = AuthDispatchContext;

export const AuthReducer = (state: TryItOutAuthStorerAuthState, action: TryItOutAuthStorerAction) => {
  switch (action.type) {
    case TryItOutAuthReducerEnum.Change: {
      const item = state.items.find(i => TryItOutAuthStorerAuthState.compare(i, action.item));
      if (item) {
        item.value = action.item.value;
      } else {
        state.items.push(action.item);
      }

      return state;
    }
    case TryItOutAuthReducerEnum.Clear: {
      state.items = state.items.filter(i => !TryItOutAuthStorerAuthState.compare(i, action.item));
      return state;
    }
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
