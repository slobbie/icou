import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
// import {Colors} from '@feature/home/util/colors';
// import CardContainer from '@feature/home/components/CardContainer';
// import {useSharedValue} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import BottomSheet from '@common/components/BottomSheet';
// import { chatGPT} from '../api/recommendations';
import routineSlice from '../slice/routine';
import TodoCards from '../components/TodoCard';
import addIcon from '@assets/icon/addIcon.png';
import SetToDoItem from '../components/SetToDoItem';
import UpdateToItem from '../components/UpdateToItem';

// 홈스크린
const HomeScreen = () => {
  const dispatch = useDispatch();
  const routines = useSelector((state: RootState) => state.routine.routines);
  // const firstPriority = useSharedValue(1);
  // const secondPriority = useSharedValue(0.9);
  // const thirdPriority = useSharedValue(0.8);
  // const fourPriority = useSharedValue(0.7);
  // const fivePriority = useSharedValue(0.6);

  const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
  const [isUpdateBottomSheet, setUpdateIsBottomSheet] = useState<boolean>(false);

  // const [count, setCount] = useState(0)us


  // 루틴 호출
  // const handlePresentModalPress = useCallback(async () => {
  //   console.log('실행')
  //   const res = await chatGPT(`
  //   나에게 건강에 좋은 5가지을 추천해줘 응답 형태는 아래와 같은 JSON 형태로
  //   [
  //     {
  //       "title": "물마시기",
  //       "dec": "적당한양의 물을 마시며 피부가 좋아집니다."
  //     }
  //   ]
  //   `);
  //   const result = JSON.parse(res.choices[0].message.content)
  //   console.log(result)
  //   for (const value of result) {
  //     dispatch(routineSlice.actions.setRoutine(value))
  //   }
  // }, [dispatch]);


  // color 와 priority 배열
  // const priorityArray = [
  //   {priority: fivePriority, color: Colors.DARK_RED},
  //   {priority: fourPriority, color: Colors.DARK_BLUE},
  //   {priority: thirdPriority, color: Colors.LIGHT_BLUE},
  //   {priority: secondPriority, color: Colors.LIGHT_RED},
  //   {priority: firstPriority, color: Colors.LIGHT_GOLD},
  // ];

  interface TaskInterface {
    id?: number
    title?: string;
    index?: number;
  }

  // 투두 리스트 추가
  const setTodo = () => {
    setIsBottomSheet((prev) => !prev)
  }

  const TASKS = routines.map((title, index) => ({ title, index }));

  const [tasks, setTasks] = useState(TASKS)

  const onDismiss = useCallback((items: TaskInterface) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.index !== items.index));
    dispatch(routineSlice.actions.deleteTodo(items.id))
  }, [dispatch]);

  const scrollRef = useRef(null);

  const reRenderTodo = useCallback(() => {
    setTasks([...routines.map((title, index) => ({ title, index }))]);
  }, [routines])

  useEffect(() => {
    reRenderTodo()
  }, [reRenderTodo]);


  return (
    <>
      <Container>
        <RooView>
          {/* <Container> */}
          {/* <>
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
            </> */}
          {routines.length > 3 ?
            null
            :
            <LogBox>
              <Log>어떤 계획이 있으신가요?</Log>
              <Space />
              <LogSmall>오늘의 투두를 적어보세요</LogSmall>
            </LogBox>
          }
          <ScrollViewBox>
            {tasks.map((item) => {
              return (
                <TodoCards
                  key={item.index}
                  simultaneousHandlers={scrollRef}
                  task={item.title}
                  onDismiss={onDismiss}
                  setUpdateIsBottomSheet={setUpdateIsBottomSheet}
                />
              )
            })}
          </ScrollViewBox>
          <Bottom>
            <AddButton onPress={setTodo}>
              <AddIcon source={addIcon} />
            </AddButton>
          </Bottom>
        </RooView>
      </Container>
      <BottomSheet
        modalVisible={isUpdateBottomSheet}
        setModalVisible={setUpdateIsBottomSheet}
      >
        <UpdateToItem setUpdateIsBottomSheet={setUpdateIsBottomSheet} />
        {/* <SetToDoItem setIsBottomSheet={setIsBottomSheet}/> */}
      </BottomSheet>

      <BottomSheet
        modalVisible={isBottomSheet}
        setModalVisible={setIsBottomSheet}
      >
        <SetToDoItem setIsBottomSheet={setIsBottomSheet}/>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.bg_141515};
`;


const LogBox = styled.View`
  background-color: ${({theme}) => theme.colors.bg_141515};
  align-items: center;
  justify-content: center;
  height: 200px;
`

const Log = styled.Text`
  color: ${({theme}) => theme.colors.white_fff};
  font-size: 22px;
`

const LogSmall = styled.Text`
  color: ${({theme}) => theme.colors.white_fff};
  font-size: 16px;
  opacity: 0.6;
`

const Space = styled.View`
 margin-bottom: 16px;
`

const RooView = styled(GestureHandlerRootView)`
  flex: 1;
`;


const AddButton = styled.Pressable`
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background-color: tomato;
  justify-content: center;
  align-items: center;
`;

const AddIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

const ScrollViewBox = styled(ScrollView)`
 flex: 1;
`
const Bottom = styled.View`
  align-items: center;
  margin-bottom: 15px;
`
