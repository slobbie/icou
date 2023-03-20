import React from 'react';
import styled from 'styled-components/native';

const HomeScreen = () => {
  return (
    <SafeView>
      <Text>홈화면</Text>
    </SafeView>
  );
};

export default HomeScreen;

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: #604ae6;
`;

const Text = styled.Text``;

// const TabBar = styled.View`
//   background-color: #fff;
//   /* padding: ; */
// `;
