import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import TodoCard from '@feature/home/components/TodoCard';
import addIcon from '@assets/icon/addIcon.png';
import SetToDoItem from '@feature/home/components/SetToDoItem';
import UpdateToItem from '@feature/home/components/UpdateToItem';
import GlobalPopupController from '@common/components/popup/GlobalPopupController';
import { TodoInterface, eventType } from '@feature/home/interface/home.interface';
import todoSlice from '@feature/home/slice/todoSlice';
import RNCalendarEvents from "react-native-calendar-events";
import { Alert } from 'react-native';

// 홈스크린
const HomeScreen = () => {
  const dispatch = useDispatch();

  // 스크롤뷰 ref
  const scrollRef = useRef(null);

  // 저장된 todo list
  const routines = useSelector((state: RootState) => state.todo.todoList);

  const TASKS = routines.map((title, index) => ({ title, index }));

  // 투두리스트 상태
  const [tasks, setTasks] = useState(TASKS)


  const getAllCalendarEvent = async () => {
    // RNCalendarEvents.checkPermissions().then(
    //   (result) => {
    //     Alert.alert('Auth check', result);
    //   },
    //   (result) => {
    //     console.error(result);
    //   },
    // );
  }
  //   try {
  //   const res = await RNCalendarEvents.findCalendars();
  //   console.log('달력', res)
  //   } catch {

  //   }
  // }


  useEffect(() => {
    getAllCalendarEvent()
  }, [])


  // TODO: dashboard 로 이동 예정
  // const firstPriority = useSharedValue(1);
  // const secondPriority = useSharedValue(0.9);
  // const thirdPriority = useSharedValue(0.8);
  // const fourPriority = useSharedValue(0.7);
  // const fivePriority = useSharedValue(0.6);



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

// TODO: dashboard 로 이동 예정
  // color 와 priority 배열
  // const priorityArray = [
  //   {priority: fivePriority, color: Colors.DARK_RED},
  //   {priority: fourPriority, color: Colors.DARK_BLUE},
  //   {priority: thirdPriority, color: Colors.LIGHT_BLUE},
  //   {priority: secondPriority, color: Colors.LIGHT_RED},
  //   {priority: firstPriority, color: Colors.LIGHT_GOLD},
  // ];


  /** set / update 바텀 시트 호출 */
  const showBottomSheetHandler = (eventType: eventType) => {
    GlobalPopupController.showModal('bottomSheet', '',
      eventType === 'set' ?
        <SetToDoItem />
        :
        <UpdateToItem />
    )
  }

  /** 투두 삭제 이벤트 */
  const onDismiss = useCallback((items: TodoInterface) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.index !== items.index));
    dispatch(todoSlice.actions.deleteTodo(items.id))
  }, [dispatch]);

  /** 투두 리스트가 변경될시 호출 */
  const reRenderTodo = useCallback(() => {
    setTasks([...routines.map((title, index) => ({ title, index }))]);
  }, [routines])

  /** 투두리스트 재 랜더링 */
  useEffect(() => {
    reRenderTodo()
  }, [reRenderTodo]);


  return (
    <>
      <Container>
        <RooView>
        {/* // TODO: dashboard 로 이동 예정 */}
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
                <TodoCard
                  key={item.index}
                  simultaneousHandlers={scrollRef}
                  todos={item.title}
                  onDismiss={onDismiss}
                  setUpdateIsBottomSheet={() => showBottomSheetHandler('update')}
                />
              )
            })}
          </ScrollViewBox>
          <Bottom>
            <AddButton onPress={() => showBottomSheetHandler('set')}>
              <AddIcon source={addIcon} />
            </AddButton>
          </Bottom>
        </RooView>
      </Container>
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
