import React, { useCallback } from 'react'
import { PermissionStatus, RESULTS, check, openSettings, request } from 'react-native-permissions'
import { permissionsByOS } from '../permission'

/** 앱권한 요청 Hooks */
const usePermissions = () => {


    /** 단일 앱권한 요청 함수  */
    const requestPermission = useCallback(async(
        permission: string,
        onSuccess?: () => void,
        onFailed?: (message: string) => void,
        isEssential = false
    ) => {

      /** 앱권한 상태 변수 */
      let requested: PermissionStatus

      /** 요청 앱권한 상수 */
      const needPermission = permissionsByOS[permission]

      /** 앱권한 체크 상수 */
      const checkedPermission = await check(needPermission)

      /** 앱권한 요청 성공시 호출 */
      const permissionSuccess = () => {
        if(onSuccess) {
            onSuccess()
        }
        return true
      }

      /** 앱권한 요청 실패시 호출 */
      const permissionError = (message: string = '', essential: boolean = false) => {
        if (essential) {
            openSettings().catch(() => console.warn('cannot open settings'))
        }
        /** onFailed 이 있다면 실패 메세지 전달 */
        if (onFailed) {
            onFailed(message)
        }
        return false
      }

      switch(checkedPermission) {
        /** 권한이 부여됨 */
        case RESULTS.GRANTED:
            return permissionSuccess()
        /** 권한이 요청되지 않았거나 거부되었지만 요청가능 */
        case RESULTS.DENIED:
            /** 권한 재요청 */
            requested = await request(needPermission)
            /** 권한 재요청 결과가 권한 부여라면 */
            if (requested = RESULTS.GRANTED) {
                return permissionSuccess()
            } else {
                return permissionError('permission_DENIED', isEssential)
            }
        /** 권한이 부여 되지만 제한이 있음 */
        case RESULTS.LIMITED:
            return
        /** 이 기능은 사용할수 없음 (현재 장치에서) */
        case RESULTS.UNAVAILABLE:
            return permissionError('permission_UNAVAILABLE', isEssential)
        /** 권한이 거부되어 더 이상 요청 할수 없음 */
        case RESULTS.BLOCKED:
            return permissionError('permission_BLOCKED',  isEssential)
        default:
            return permissionError('',  isEssential)
      }
    }, [])


    /** 복수 앱권한 요청 함수  */
    const requestPermissions = useCallback(async(
        permissions: string[],
        onSuccess?: () => void,
        onFailed?: () => void,
        essential = false
    ) => {

        const permissionsResult = permissions.reduce(
            async (previousPermission, currentPermission) => {
              const previousPermissionResult = await previousPermission
              /** 전달 받은 permissions 배열을 순회 하며 권한 체크  */
              const currentPermissionResult = await requestPermission(
                currentPermission
              )
              /** 권한 요청를 담은 배열 */
              previousPermissionResult.push(currentPermissionResult)
              return previousPermissionResult
            },
            Promise.resolve<boolean[]>([])
          )


        permissionsResult.then((result) => {
            if (result.every(Boolean) && onSuccess) {
              onSuccess()
            }
            if (!result.every(Boolean) && onFailed) {
              if (essential) {
                openSettings().catch(() => console.warn('cannot open settings'))
              }
              onFailed()
            }
          })

    }, [])


  return {
    requestPermission,
    requestPermissions
  }
}

export default usePermissions
