/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {Text} from 'react-native';

import styled, {css} from '@emotion/native';
import Config from 'react-native-config';

const App = () => {
  const Key = Config.API_KEY;
  console.log(Key);
  return (
    <Container>
      <Text>Hi</Text>
    </Container>
  );
};

export default App;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  background-color: red;
`;
