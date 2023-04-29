import StackNavigation from '@navigation/StackNavigation';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ThemeProvider} from 'styled-components/native';
import appTheme from '@common/styles/appTheme';
import GlobalPopup from 'main/common/components/popup/useGlobalPopup';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <StatusBar barStyle="default" />
        <StackNavigation />
        <GlobalPopup/>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
