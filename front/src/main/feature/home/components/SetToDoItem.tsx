import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import styled from 'styled-components/native'
import addIcon from '@assets/icon/addIcon.png';
import { useDispatch } from 'react-redux';
import routineSlice from '../slice/routine';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface SetToDoItemInterface {
    setIsBottomSheet: Dispatch<SetStateAction<boolean>>
}

// 투두 리스트 등록
const SetToDoItem = ({setIsBottomSheet}: SetToDoItemInterface) => {
  const dispatch = useDispatch();
  let nextId = useRef(0)

  const [text, setText] = useState('')

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text.trim())
  }

  // 파스텔 색상을 랜덤하게 선택하는 함수
  const generateRandomPastelColor = (): string => {
    const pastelColors = ['#FF4500', '#00FF00', '#00FFFF', '#FF007F', '#008080', '#0066FF', '#BF94E4', '#2A52BE', '#FF8C00', '#00FF7F']
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  }

  // 사용 예시
  const new_color = generateRandomPastelColor()

  const setTodo = () => {
    setIsBottomSheet((prev) => !prev)
    dispatch(routineSlice.actions.setRoutine({
      id: nextId.current,
      title: text,
      bgColor: new_color
    }))
    nextId.current += 1
  }

  return (
    <Container>
      <Title>무엇을 하실건가요?</Title>
      <Space />
      <Input onChange={(e) => onChange(e)} />
      <Bottom>
        <AddButton onPress={setTodo}>
          <AddIcon source={addIcon} />
        </AddButton>
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
    color: #000;
`

const Input = styled.TextInput`
    height: 50px;
    width: 100%;
    border: 1px solid gray;
    color: #000;
`

const Bottom = styled.View`
  align-items: center;
  margin-top: auto;
`

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
