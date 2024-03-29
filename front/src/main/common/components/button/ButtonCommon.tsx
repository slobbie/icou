import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled, { css } from 'styled-components/native'

export type buttonSize = 'S' | 'M'  | 'L'

export interface commonButtonProps extends HTMLButtonElement {
    /**Button onPress event 입니다. */
    onPress?: Function | any
    /**Button Text label props 입니다. */
    label?: string | any
    /**Button Custom style props 입니다. */
    style?: object
    /**Button disabled 입니다. */
    disabled?: boolean
    /**Button size 'S' | 'M'  | 'L' 입니다. */
    size?: buttonSize
    /** loading Ui 처리를 위한 props  */
    isLoading?: boolean
}

// 기본 버튼
const ButtonCommon = ({
  onPress,
  label = '',
  style,
  disabled = false,
  size = 'L',
  isLoading = false,
  ...rest
}: commonButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={style}
      size={size}
      {...rest}
    >
      {isLoading ?
        <ActivityIndicator color="#fff" />
        :
        <Text disabled={disabled} >{label}</Text>
      }
    </Pressable>
  )
}

export default ButtonCommon


const sizeStyles = css<commonButtonProps>`
${props =>
    props.size === 'L' &&
  css`
    width: 100%;
    height: 50px;
  `}
${props =>
    props.size === 'M' &&
  css`
    width: 45%;
    height: 50px;
  `}
  ${props =>
    props.size === 'S' &&
    css`
      width: 24%;
      height: 50px;
    `}
  ${(props) =>
    props.disabled ?
      css`
    background-color: ${({theme}) => theme.colors.gray_eee};
    color: ${({theme}) => theme.colors.gray_8c8c8c};
    `
      :
      css`
    background-color: ${({theme}) => theme.colors.btn_0066ff};
    color: ${({theme}) => theme.colors.white_fff};
  `}
`


const Pressable = styled.Pressable<commonButtonProps>`
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.btn_0066ff};
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.gray_eee};
  border-radius: 5px;
  ${sizeStyles};
`

const Text = styled.Text<commonButtonProps>`
  width: 100%;
  border: none;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  ${(props) =>
    props.disabled ?
      css`
      color: ${({theme}) => theme.colors.gray_8c8c8c};
      border-color: ${({theme}) => theme.colors.gray_e5e5e5};
    `
      :
      css`
      color: ${({theme}) => theme.colors.white_fff};
      border-color: #E5E5E5;
    `
}
`
