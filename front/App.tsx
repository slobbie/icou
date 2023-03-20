import StackNavigation from '@navigation/StackNavigation';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <StackNavigation />
    </Provider>
  );
};

export default App;
