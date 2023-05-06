import ButtonCommon from '@common/components/button/ButtonCommon'
import InputLabel from '@common/components/input/InputLabel'
import React, {useState} from 'react'
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'redux/store/reducer'
import styled from 'styled-components/native'
import routineSlice from '@feature/home/slice/todoSlice'
import GlobalPopupController from '@common/components/popup/GlobalPopupController'
import MarginComponent from '@common/components/space/MarginComponent'


// 투두 리스트 수정
const UpdateToItem = () => {
  const dispatch = useDispatch()
  /** 수정하기 위해 얻어온 투두 아이템 정보 */
  const getTodoItem = useSelector((state: RootState) => state.todo.getTodoItem)

  /** 업데이트 투두 텍스트 상태 */
  const [upDateTodoText, setUpDateTodoText] = useState('')

  /** 업데이트 투두 온체인지 이벤트 */
  const updateTodoOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setUpDateTodoText(e.nativeEvent.text)
  }

  /** 업데이트 투두 디스패치 이벤트 */
  const updateTodoItem = (title: string) => {
    dispatch(routineSlice.actions.updateTodoItem({
      id: getTodoItem.id,
      title: title,
      bgColor: getTodoItem.bgColor
    }))
    GlobalPopupController.hideModal()
  }

  return (
    <Container>
      <Title>수정하실 내용을 입력해주세요.</Title>
      <MarginComponent top={30} />
      <Title>제목</Title>
      <MarginComponent top={10} />
      <Title>{getTodoItem.title}</Title>
      <Space />
      <InputLabel
        topText='수정할 투두'
        onChange={(e) => updateTodoOnChange(e)}
      />
      <Bottom>
        <ButtonCommon
          size="M"
          disabled={!upDateTodoText}
          onPress={() => updateTodoItem(upDateTodoText)}
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
  color: ${({theme}) => theme.colors.white_fff};
`
const Bottom = styled.View`
  align-items: center;
  margin-top: auto;
  width: 100%;
  height: 50px;
`
