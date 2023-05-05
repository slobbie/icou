import React, {useState} from 'react'
import styled from 'styled-components/native'
// import addIcon from '@assets/icon/addIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import routineSlice from '../slice/routine';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import InputLabel from 'main/common/components/input/InputLabel';
import ButtonCommon from 'main/common/components/button/ButtonCommon';
import GlobalPopupController from 'main/common/components/popup/GlobalPopupController';
import { RootState } from 'redux/store/reducer';


// 투두 리스트 등록
const SetToDoItem = () => {
  const dispatch = useDispatch();
  const todoId = useSelector((state: RootState) => state.routine.todoId)

  const [todo, setTodo] = useState('')

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTodo(e.nativeEvent.text.trim())
  }


  // 파스텔 색상을 랜덤하게 선택하는 함수
  const generateRandomPastelColor = (): string => {
    const pastelColors = ['#FF4500', '#00FF00', '#00FFFF', '#FF007F', '#008080', '#0066FF', '#BF94E4', '#2A52BE', '#FF8C00', '#00FF7F']
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }

  const new_color = generateRandomPastelColor()


  const setTodoItem = () => {
    dispatch(routineSlice.actions.setRoutine({
      id: todoId,
      title: todo,
      bgColor: new_color
    }))
    const nextId = todoId + 1
    dispatch(routineSlice.actions.updateTodoId(nextId))
    GlobalPopupController.hideModal()
  }


  return (
    <Container>
      <Title>무엇을 하실건가요?</Title>
      <Space />
      <InputLabel topText='제목' onChange={(e) => onChange(e)} />
      <Bottom>
        <ButtonCommon
          size="M"
          disabled={!todo}
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

// const Input = styled.TextInput`
//     height: 50px;
//     width: 100%;
//     border: 1px solid gray;
//     color: #000;
// `

const Bottom = styled.View`
  align-items: center;
  margin-top: auto;
  width: 100%;
  height: 50px;
`

// const AddButton = styled.Pressable`
//   width: 64px;
//   height: 64px;
//   border-radius: 100px;
//   background-color: tomato;
//   justify-content: center;
//   align-items: center;
// `;

// const AddIcon = styled.Image`
//   width: 30px;
//   height: 30px;
// `;
