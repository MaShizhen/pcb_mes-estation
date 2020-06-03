/**
 * 获取设备唯一编号
 */

import DeviceInfo from 'react-native-device-info';

export default function get() {
	return DeviceInfo.getUniqueId();
}
