import React, {MutableRefObject} from 'react'

export type CustomPopupRef = {
  show: (message: string) => void
  hide: () => void
  getType: (type: alertTypes | modalTypes | alarmTypes) => void
  getHandler: (handler?:  handlerType) => void
  getCancelHandler: (handler?:  handlerType) => void
  getChildren: (children?: React.ReactNode) => void
}

export type alertTypes = 'alert' | 'confirm'
export type modalTypes = 'modal' | 'bottomSheet'
export type alarmTypes = 'permission' | 'toastPopup'

export type handlerType = Function

export default class GlobalPopupController {
    static modalRef: MutableRefObject<CustomPopupRef>;

    static setModalRef = (ref: any) => {
      this.modalRef = ref
    }

    static showAlert = (type: alertTypes, message: string, handler?:  handlerType, cancelHandler?:  handlerType) => {
      this.modalRef.current?.getType(type)
      this.modalRef.current?.show(message)
      this.modalRef.current?.getHandler(handler)
      this.modalRef.current?.getCancelHandler(cancelHandler)
    }

    static showModal = (type: modalTypes, message: string, children: React.ReactNode) => {
      this.modalRef.current?.getType(type)
      this.modalRef.current?.show(message)
      this.modalRef.current?.getChildren(children)
    }

    static showAlarm = (type: modalTypes, message: string) => {
      this.modalRef.current?.getType(type)
      this.modalRef.current?.show(message)
    }

    static hideModal = () => {
      this.modalRef.current?.hide()
    }

}
