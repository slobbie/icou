/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react'
import ModalComponent from '../Modal'
import GlobalPopupController, { CustomPopupRef, alertType, handlerType } from './GlobalPopupController'


const useGlobalPopup = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const modalRef = useRef<CustomPopupRef>()
  const [customMessage, setCustomMessage] = useState<string>('')
  const [alertType, setAlertType] = useState<string>('alert')
  const [handle, setHandle] = useState<Function>(() => () => {})
  const [cancelHandle, setCancelHandle] = useState<Function>(() => () => {})
  const [modalChildren, setModalChildren] = useState<React.ReactNode>()
  // ! TODO:다중으로 사용 할수 있는 방법으로 개선

  useLayoutEffect(() => {
    GlobalPopupController.setModalRef(modalRef)
  }, [])

  useImperativeHandle(
    modalRef,
    () => ({
      /**
      * @description show popup
      */
      show: (message: string) => {
        setModalVisible(true)
        if (message) {
          setCustomMessage(message)
        }
      },
      /**
      * @description close popup
      */
      hide: () => {
        setModalVisible(false)
        setCustomMessage('')
      },
      /**
      * @description show popup type
      */
      getType: (type: alertType) => {
        setAlertType(type)
      },
      /**
      * @description get confirm event
      */
      getHandler: (handler?: handlerType) => {
        if (handler) {
          setHandle(() => () => handler())
        }
      },
      /**
      * @description get cancel event
      */
      getCancelHandler: (cancelHandler?: handlerType) => {
        if (cancelHandler) {
          setCancelHandle(() => () => cancelHandle())
        }
      },
      /**
      * @description get children
      */
      getChildren: (children: React.ReactNode) => {
        if (children) {
          setModalChildren(children)
        }
      }
    }),
    []
  )

  const confirmClick = () => {
    setHandle(handle)
    setModalVisible(false)
  }

  const cancelClick = () => {
    setCancelHandle(cancelHandle)
    setModalVisible(false)
  }

  const RenderValue = {
    modal: <ModalComponent
      visible={modalVisible}
      setVisible={setModalVisible}
    />,
  }

  const Component = () => {
    // return modalVisible ? RenderValue[alertType] : null

    switch (alertType) {
      case 'modal':
        return modalVisible ? RenderValue.modal : null
      default:
        break
    }
  }

  return (
    <>
      <Component />
    </>
  )
}


export default forwardRef(useGlobalPopup)
