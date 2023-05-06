import { Permission, PERMISSIONS } from "react-native-permissions";
import { ios } from "@common/hooks/usePlatform";

/** 앱권한 요청 인터페이스 */
interface PermissionsOS {
    [key: string]: Permission;
    calendar_READ: Permission;
    calendar_WRITE?: Permission;
}

/** for AOS */
const androidPermissions: PermissionsOS = {
    calendar_READ: PERMISSIONS.ANDROID.READ_CALENDAR,
    calendar_WRITE: PERMISSIONS.ANDROID.WRITE_CALENDAR
}

/** for ios */
const iosPermissions: PermissionsOS = {
    calendar_READ: PERMISSIONS.IOS.CALENDARS,
}


export const permissionsByOS = ios ? iosPermissions : androidPermissions
