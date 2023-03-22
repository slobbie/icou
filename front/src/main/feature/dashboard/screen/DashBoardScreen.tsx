import React from 'react';
import styled from 'styled-components/native';

const DashBoardScreen = () => {
  return (
    <SafeView>
      <Text>DashBoard</Text>
    </SafeView>
  );
};

export default DashBoardScreen;

const SafeView = styled.SafeAreaView``;

const Text = styled.Text``;
