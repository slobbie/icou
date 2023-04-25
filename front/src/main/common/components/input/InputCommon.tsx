import React from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import styled from 'styled-components/native'

export interface InputCommonInterface  {
    value?: string
    placeholder?: string
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
    onChangeText?: (text: string) => void
    secureTextEntry?: boolean
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad'
    sameCheckImage?: boolean
    showImage?: boolean
    editable?: boolean
    maxLength?: number
    numberOfLines?: number
    multiline?: boolean
    onEndEditing?: any
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
}


// 기본 인풋
const InputCommon = (props: InputCommonInterface) => {
  return (
    <CustomInput
      {...props}
    />
  )
}

export default InputCommon

const CustomInput = styled.TextInput<InputCommonInterface>`
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #3B3B3E;
  padding: 13px 15px;
  font-size: 13px;
  text-decoration: none;
  border-radius: 5px;
`
