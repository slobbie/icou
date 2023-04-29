import React from 'react'
import styled from 'styled-components/native'

interface ModalComponentInterface {
  children?: React.ReactNode
}

// 모달
const ModalComponent = ({children}: ModalComponentInterface) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={true}
    >
      <CenteredView>
        <ModalView>
          {children}
        </ModalView>
      </CenteredView>
    </Modal>
  )
}

export default ModalComponent;

const Modal = styled.Modal`
`


export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.8);
`

export const ModalView = styled.View`
  /* flex: 1 */
  width: 90%;
  height: 30%;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  align-items: center;
  display: flex;
  justify-content: center;
`
