import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import styled from 'styled-components/native';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Hello iCou</Text>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const SafeAreaView = styled.SafeAreaView``;
