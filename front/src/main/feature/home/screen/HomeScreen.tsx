import React from 'react';
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
  const routines = useSelector((state: RootState) => state.routine.routine);
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);
  const fourPriority = useSharedValue(0.7);
  const fivePriority = useSharedValue(0.6);

  // TODO: chat gpt 호출 데이터로 변경 예정
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

  // color 와 priority 배열
  const priorityArray = [
    {priority: fivePriority, color: Colors.DARK_RED},
    {priority: fourPriority, color: Colors.DARK_BLUE},
    {priority: thirdPriority, color: Colors.LIGHT_BLUE},
    {priority: secondPriority, color: Colors.LIGHT_RED},
    {priority: firstPriority, color: Colors.LIGHT_GOLD}
  ]


  return (
    <RooView>
      <Container>
        <AddButton>
          <ButtonLabel onPress={onCreateRoutine}>루틴 추가하기</ButtonLabel>
        </AddButton>
        <>
          {routines.map((routine, i) => (
            <CardContainer
              key={i}
              routine={routine}
              priority={priorityArray[i].priority}
              firstPriority={firstPriority}
              secondPriority={secondPriority}
              thirdPriority={thirdPriority}
              fourPriority={fourPriority}
              fivePriority={fivePriority}
              color={priorityArray[i].color}
            />
          ))}
        </>
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
