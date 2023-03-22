import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {Colors} from '@feature/home/util/colors';

interface cartProps {
  color: string;
  style: object;
}

const Card = ({color, style}: cartProps) => {
  const getColor = () => {
    switch (color) {
      case Colors.LIGHT_BLUE:
        return Colors.DARK_BLUE;
      case Colors.LIGHT_RED:
        return Colors.DARK_RED;
      case Colors.LIGHT_GOLD:
        return Colors.DARK_GOLD;
    }
  };
  return (
    <View style={style}>
      <Spacer>
        <Container>
          <Circle style={{backgroundColor: getColor()}} />
          <Box>
            <TopLine style={{backgroundColor: getColor()}} />
            <BottomLine style={{backgroundColor: getColor()}} />
          </Box>
        </Container>
      </Spacer>
    </View>
  );
};

export default Card;

const View = styled(Animated.View)``;

const Spacer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
`;

const Circle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const Box = styled.View`
  flex-direction: column;
`;

const TopLine = styled.View`
  height: 20px;
  width: 120px;
  border-radius: 40px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const BottomLine = styled.View`
  height: 20px;
  width: 60px;
  border-radius: 40px;
  margin-bottom: 20px;
  margin-left: 15px;
`;
