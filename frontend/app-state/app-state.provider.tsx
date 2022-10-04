import React, { ReactNode, ReactElement, useState } from 'react';
import AppstateContext, { DefaultAppState, defaultAppState } from './app-state.context';

const setAppStateProviderValue = (setAppState: (appState: DefaultAppState) => void, appState: DefaultAppState) => ({
  appState,
  setAppState
});

const AppStateProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const localization = defaultAppState.appState.language;
  // Init app state
  const [appState, setAppState] = useState({ ...defaultAppState.appState, language: localization });

  const val = setAppStateProviderValue(setAppState, appState);
  return <AppstateContext.Provider value={val}>{children}</AppstateContext.Provider>;
};

export default AppStateProvider;
