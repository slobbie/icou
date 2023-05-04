/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react'
import ModalComponent from '../Modal'
import GlobalPopupController, { CustomPopupRef, alarmTypes, alertTypes, handlerType, modalTypes } from './GlobalPopupController'
import BottomSheet from '../BottomSheet'
import AlertComponent from './AlertComponent'
import AlertConfirmComponent from './AlertConfirmComponent'


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
      getType: (type: alertTypes | modalTypes | alarmTypes) => {
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
    alert: <AlertComponent
      content={customMessage}
      confirmEvent={confirmClick}
      visible={modalVisible}
      setVisible={setModalVisible}
    />,
    alertConfirm: <AlertConfirmComponent
      content={customMessage}
      confirmEvent={confirmClick}
      cancelEvent={cancelClick}
      visible={modalVisible}
      setVisible={setModalVisible}
    />,
    modal: <ModalComponent
      visible={modalVisible}
      setVisible={setModalVisible}
    />,
    bottomSheet: <BottomSheet
      visible={modalVisible}
      setVisible={setModalVisible}
      children={modalChildren}
    />
  }

  const Component = () => {
    // return modalVisible ? RenderValue[alertType] : null

    switch (alertType) {
      case 'alert':
        return modalVisible ? RenderValue.alert : null
      case 'confirm':
        return modalVisible ? RenderValue.alertConfirm : null
      case 'modal':
        return modalVisible ? RenderValue.modal : null
      case 'bottomSheet':
        return modalVisible ? RenderValue.bottomSheet : null
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
