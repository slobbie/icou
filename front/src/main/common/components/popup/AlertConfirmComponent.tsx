import React, {Dispatch, SetStateAction} from 'react'
import {Modal} from 'react-native'
import GlobalPopupController from './GlobalPopupController';
import styled from 'styled-components/native';

interface ConfirmAlertInterface {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    content?: string
    confirmEvent?: Function
    cancelEvent?: Function
}


const AlertConfirmComponent = (props: ConfirmAlertInterface) => {
  // i18n
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.setVisible(false)}
    >
      <CenteredView>
        <ModalView>
          <ModalText>{props.content}</ModalText>
          <ButtonView>
            <CancelButtons
              onPress={
                () => {
                  props.cancelEvent ?
                    props.cancelEvent() :
                    GlobalPopupController.hideModal()
                }
              }
            >
              <CancelButtonText>
                취소
              </CancelButtonText>
            </CancelButtons>
            <ConfirmButtons
              onPress={() =>
                props.confirmEvent ?
                  props.confirmEvent() :
                  GlobalPopupController.hideModal()
              }
            >
              <ConfirmText>
                확인
              </ConfirmText>
            </ConfirmButtons>
          </ButtonView>
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

export default AlertConfirmComponent


export const CenteredView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.8);

`
export const ModalView = styled.View`
  width: 90%;
  margin: 20px;
  background-color: ${({theme}) => theme.colors.bg_3b3b3e};
  border-radius: 5px;
  padding: 35px;
  align-items: center;
`

export const ButtonsView = styled.View`
  flex-direction: row;
`

export const Button = styled.Pressable`
  border-radius: 5px;
  padding: 10px;
`

export const ConfirmButtons = styled(Button)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.btn_0066ff};
  width: 110px;
  border-radius: 5px;
`

export const CancelButtons = styled(Button)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white_fff};
  border: 1px solid #ddd;
  margin-right: 10px;
  width: 110px;
`

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.white_fff};
  padding: 10px 27px;
  text-align: center;
`

export const CancelText = styled.Text`
  color: ${({theme}) => theme.colors.black_000};
  padding: 10px 27px;
  text-align: center;
`
export const ModalText = styled.Text`
  color: ${({theme}) => theme.colors.white_fff};
  margin-bottom: 50px;
  text-align: center;
`
export const ConfirmText = styled.Text`
  color: ${({theme}) => theme.colors.white_fff};
  padding: 10px 27px;
  text-align: center;
`

export const CancelButtonText = styled.Text`
  color: ${({theme}) => theme.colors.black_000};
  padding: 10px 27px;
  text-align: center;
`

export const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
