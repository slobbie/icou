import React, {MutableRefObject} from 'react'

export type CustomPopupRef = {
  show: (message: string) => void
  hide: () => void
  getType: (type: alertType) => void
  getHandler: (handler?:  handlerType) => void
  getCancelHandler: (handler?:  handlerType) => void
  getChildren: (children?: React.ReactNode) => void
}

export type alertType = 'alert' | 'confirm' | 'modal' | 'permission' | 'toastPopup' | 'loading'
export type handlerType = Function

export default class GlobalPopupController {
    static modalRef: MutableRefObject<CustomPopupRef>;

    static setModalRef = (ref: any) => {
      this.modalRef = ref
    }

    static showAlert = (type: alertType, message: string, handler?:  handlerType, cancelHandler?:  handlerType) => {
      this.modalRef.current?.getType(type)
      this.modalRef.current?.show(message)
      this.modalRef.current?.getHandler(handler)
      this.modalRef.current?.getCancelHandler(cancelHandler)
    }

    static showModal = (type: alertType, message: string, children: React.ReactNode) => {
      this.modalRef.current?.getType(type)
      this.modalRef.current?.show(message)
      this.modalRef.current?.getChildren(children)
    }

    static hideModal = () => {
      this.modalRef.current?.hide()
    }

}


// const usePopupController = (ref?: any) => {
//   let modalRef = useRef<CustomPopupRef>(null);

//   const setPopupRef = () => {
//     modalRef = ref
//     console.log('정해석 modalRef', modalRef)
//   }

//   const showAlert = (
//     type: alertType,
//     message: string,
//     handler?: handlerType,
//     cancelHandler?: handlerType,
//   ) => {
//     modalRef.current?.getType(type);
//     modalRef.current?.show(message);
//     modalRef.current?.getHandler(handler);
//     modalRef.current?.getCancelHandler(cancelHandler);
//   };

//   const showModal = (
//     type: alertType,
//     message: string,
//     children: React.ReactNode,
//   ) => {
//     modalRef.current?.getType(type);
//     modalRef.current?.show(message);
//     modalRef.current?.getChildren(children);
//   };

//   const hideModal = () => {
//     modalRef.current?.hide();
//   };

//   return { modalRef, setPopupRef, showAlert, showModal, hideModal };
// };

// export default usePopupController;
