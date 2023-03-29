import React, { useMemo } from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Colors} from '@feature/home/util/colors';
import CardContainer from '@feature/home/components/CardContainer';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import routineSlice from '../slice/routine';
import { RootState } from 'redux/store/reducer';

// 홈스크린
const HomeScreen = () => {
  const dispatch = useDispatch();
  const routine = useSelector((state: RootState) => state.routine.routine);
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  const fourPriority = useSharedValue(0.7);
  const fivePriority = useSharedValue(0.6);
  // 새로운 루틴 입력
  const onCreateRoutine = () => {
    dispatch(
      routineSlice.actions.setRoutine({
        title: '물 5번 마시기',
        dec: '건강을 위해 물 다섯컵 어때요?',
        count: 0,
        isDone: false,
      }),
    );
  };

  // const priority = useMemo((i: number) => {
  //   return firstPriority.value - (4 - i)
  // }, [])
  const minus = (index: number) => {
    return Number((0.4 - index * 0.1).toFixed(1));
  }

  return (
    <RooView>
      <Container>
        <AddButton>
          <ButtonLabel onPress={onCreateRoutine}>루틴 추가하기</ButtonLabel>
        </AddButton>
        {/* <>
          {routine.map((card, i) => {
            return (
              <CardContainer
                key={i}
                index={i}
                card={card}
                priority={firstPriority.value - minus(i)}
                firstPriority={firstPriority}
                secondPriority={secondPriority}
                thirdPriority={thirdPriority}
                fourPriority={fourPriority}
                fivePriority={fivePriority}
                color={Colors.LIGHT_BLUE}
              />
            )
          })}
        </> */}

        <CardContainer
          priority={fourPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          fourPriority={fourPriority}
          fivePriority={fivePriority}
          color={Colors.DARK_RED}
        />
        <CardContainer
          priority={fivePriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          fourPriority={fourPriority}
          fivePriority={fivePriority}
          color={Colors.DARK_BLUE}
        />
        <CardContainer
          priority={thirdPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          fourPriority={fourPriority}
          fivePriority={fivePriority}
          color={Colors.LIGHT_BLUE}
        />
        <CardContainer
          priority={secondPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          fourPriority={fourPriority}
          fivePriority={fivePriority}
          color={Colors.LIGHT_RED}
        />
        <CardContainer
          priority={firstPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
          fourPriority={fourPriority}
          fivePriority={fivePriority}
          color={Colors.LIGHT_GOLD}
        />
      </Container>
    </RooView>
  );
};

export default HomeScreen;

const RooView = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #333;
`;

const AddButton = styled.Pressable`
  width: 100px;
  height: 50px;
  background-color: tomato;
  justify-content: center;
  align-items: center;
`;

const ButtonLabel = styled.Text`
  color: #fff;
`;
