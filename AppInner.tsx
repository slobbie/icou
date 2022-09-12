import React from 'react';
import {StyleSheet} from 'react-native';
import styled, {css} from '@emotion/native';
import SvgIcon from './src/components/common/svgIcon/SvgIcon';

const AppInner = () => {
  return (
    <Container>
      <SvgIcon name="PowerOff" />
    </Container>
  );
};

export default AppInner;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  background-color: red;
`;
