import React from 'react'
import InputCommon, { InputCommonInterface } from '@common/components/input/InputCommon'
import styled from 'styled-components/native'

interface InputLabel extends InputCommonInterface {
    topText: string;
}

// 인풋 라벨
const InputLabel = (props: InputLabel) => {
  return (
    <Container>
      <TopArea>
        <TopText>{props.topText}</TopText>
      </TopArea>
      <InputCommon {...props}/>
    </Container>
  )
}

export default InputLabel;

const Container = styled.View`
    width: 100%;
`

const TopArea = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`
const TopText = styled.Text`
  color: #fff;
  font-weight: 400;
  font-size: 16px;
`
