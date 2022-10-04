import { createContext } from 'react';

export type DefaultAppState = {
  language: string;
};

export const defaultAppState = {
  appState: {
    language: 'nl'
  } as DefaultAppState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAppState: (_appState: DefaultAppState): void => {}
};

const AppstateContext = createContext(defaultAppState);

export default AppstateContext;
