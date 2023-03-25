import React, {useCallback, useMemo} from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import {Colors} from '@feature/home/util/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';

interface cartProps {
  color: string;
  style: object;
}

// 홈 카드
const Card = ({color, style}: cartProps) => {
  const routine = useSelector((state: RootState) => state.routine);

  const getColor = useCallback(() => {
    switch (color) {
      case Colors.LIGHT_BLUE:
        return Colors.DARK_BLUE;
      case Colors.LIGHT_RED:
        return Colors.DARK_RED;
      case Colors.LIGHT_GOLD:
        return Colors.DARK_GOLD;
    }
  }, [color]);

  const bgColor = useMemo(
    () => ({
      backgroundColor: getColor(),
    }),
    [getColor],
  );

  return (
    <View style={style}>
      <Spacer>
        <Container>
          <Box>
            <Title>물 5번 마시기</Title>
            <Dec>건강을 위해 5번 마셔주세요.</Dec>
            <Count>0</Count>
            <ConfirmButton>
              <ButtonText>확인</ButtonText>
            </ConfirmButton>
          </Box>
        </Container>
      </Spacer>
    </View>
  );
};

export default Card;

const View = styled(Animated.View)`
  flex: 1;
`;

const Spacer = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
`;

const Dec = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
`;

const ConfirmButton = styled.Pressable`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
  background-color: tomato;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const Count = styled.Text`
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
`;
