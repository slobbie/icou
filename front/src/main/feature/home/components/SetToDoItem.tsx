import React, {useState} from 'react'
import styled from 'styled-components/native'
import {useDispatch, useSelector} from 'react-redux';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import InputLabel from '@common/components/input/InputLabel';
import ButtonCommon from '@common/components/button/ButtonCommon';
import GlobalPopupController from '@common/components/popup/GlobalPopupController';
import {RootState} from '@store/reducer';
import todoSlice from '@feature/home/slice/todoSlice';


// 투두 리스트 등록
const SetToDoItem = () => {
  const dispatch = useDispatch();
  /** 투두 리스트 아이디 */
  const todoId = useSelector((state: RootState) => state.todo.todoId);

  /** 입력되는 투두 내용 상태 */
  const [todoText, setTodoText] = useState('');

   /** 투두 onChange 이벤트  */
  const onChangeTodoItem = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTodoText(e.nativeEvent.text)
  }

  /** 투두 아이템 컬러 랜덤 셋팅 함수  */
  const generateRandomPastelColor = (): string => {
    const pastelColors = ['#2a7aec', '#e65555', '#FAFAFA', '#de7faf'];
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }

  /** 투두 아이템 컬러 랜덤 셋팅 상수  */
  const new_color = generateRandomPastelColor()

  /** 투두 아이템 디스패치 이벤트  */
  const setTodoItem = () => {
    dispatch(todoSlice.actions.setRoutine({
      id: todoId,
      title: todoText,
      bgColor: new_color
    }))
    const nextId = todoId + 1
    dispatch(todoSlice.actions.updateTodoId(nextId))
    GlobalPopupController.hideModal()
  }

  return (
    <Container>
      <Title>무엇을 하실건가요?</Title>
      <Space />
      <InputLabel topText='제목' onChange={(e) => onChangeTodoItem(e)} />
      <Bottom>
        <ButtonCommon
          size="M"
          disabled={!todoText}
          onPress={setTodoItem}
          label={'등록하기'}
        />
      </Bottom>
    </Container>
  )
}

export default SetToDoItem


const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 25px;
`

const Space = styled.View`
  margin-bottom: 100px;
`

const Title = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.white_fff};
`

const Bottom = styled.View`
  align-items: center;
  margin-top: auto;
  width: 100%;
  height: 50px;
`
