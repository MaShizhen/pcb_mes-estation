// import RNSerialPort from '@koimy/react-native-serial-port'
import { DeviceEventEmitter } from 'react-native';
import bytes2str from './bytes2str'

export default async function rfid() {
	return new Promise(async (resolve, reject) => {
		try {
			// RNSerialPort.openSerialPort('/dev/ttyS4', '9600')
			// 监听串口回传数据
			DeviceEventEmitter.addListener('onSerialPortRecevieData', (receiveData) => {
				const str = bytes2str(receiveData)
				resolve({
					code: 1,
					id: str
				})
			})
			// 监听接收串口开关的状态
			// DeviceEventEmitter.addListener('onSerialPortOpenStatus', (status) => {
			// 	console.log("onSerialPortOpenStatus");
			// })
		} catch (error) {
			reject({
				code: 0,
				msg: 'rfid读取失败'
			})
		} finally {
			// RNSerialPort.close()
		}
	})
}
