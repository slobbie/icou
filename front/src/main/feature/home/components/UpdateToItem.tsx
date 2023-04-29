import ButtonCommon from 'main/common/components/button/ButtonCommon'
import InputLabel from 'main/common/components/input/InputLabel'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store/reducer'
import styled from 'styled-components/native'
import routineSlice from '../slice/routine'


interface UpdateToItemInterface {
    setUpdateIsBottomSheet: Dispatch<SetStateAction<boolean>>
}

// 투두 리스트 수정
const UpdateToItem = ({setUpdateIsBottomSheet}: UpdateToItemInterface) => {
  const [todo, setTodo] = useState('')
  const getTodoItem = useSelector((state: RootState) => state.routine.getTodoItem[0])
  const dispatch = useDispatch()

  console.log(getTodoItem)

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTodo(e.nativeEvent.text.trim())
  }

  const updateTodoItem = (title: string) => {
    setUpdateIsBottomSheet((prev) => !prev)
    dispatch(routineSlice.actions.updateTodoItem({
      id: getTodoItem.id,
      title: title,
      bgColor: getTodoItem.bgColor
    }))
  }

  return (
    <Container>
      <Title>수정하실 내용을 입력해주세요.</Title>
      <Title>기존 내용</Title>
      <Title>{getTodoItem?.title}</Title>
      <Space />
      <InputLabel topText='수정할 투두' onChange={(e) => onChange(e)} />
      <Bottom>
        <ButtonCommon
          size="M"
          disabled={!todo}
          onPress={() => updateTodoItem(todo)}
          label={'수정하기'}
        />
      </Bottom>
    </Container>
  )
}

export default UpdateToItem

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
    color: #fff;
`
const Bottom = styled.View`
  align-items: center;
  margin-top: auto;
  width: 100%;
  height: 50px;
`
