// import RNSerialPort from '@koimy/react-native-serial-port';
// import { DeviceEventEmitter } from 'react-native';

// let instance = null

// export default class RNSerialPortManager {

// 	constructor() {
// 		if (!instance) {
// 			instance = this;
// 			DeviceEventEmitter.addListener('onSerialPortRecevieData', this.onSerialPortRecevieData, this)
// 			// 监听接收串口开关的状态
// 			DeviceEventEmitter.addListener('onSerialPortOpenStatus', this.onSerialPortOpenStatus, this)
// 			console.log("Newinstance");
// 		}
// 		return instance;
// 	}

// 	/***
// 	* 类方法
// 	*/
// 	static ShareInstance() {
// 		const singleton = new RNSerialPortManager();
// 		return singleton;
// 	}

// 	// 监听串口的状态
// 	onSerialPortOpenStatus(status) {
// 		alert(status)
// 		console.log("onSerialPortOpenStatus");
// 		// 处理逻辑
// 	}

// 	// 监听串口回传数据
// 	onSerialPortRecevieData(receiveData) {
// 		console.log(receiveData);
// 		console.log("onSerialPortRecevieData");
// 		// 处理接收的数据
// 	}

// 	// 获取设备列表
// 	getDeviceLsit() {
// 		return new Promise((resolve, reject) => {
// 			RNSerialPort.getAllDevicesPath((result) => {
// 				console.log(result);
// 				resolve(result)
// 				// ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
// 			});
// 		})

// 	}

// 	// 打开虚拟串口
// 	openSerialPort(portStr, Baudrates) {
// 		RNSerialPort.openSerialPort(portStr, Baudrates);
// 	}

// 	// 发送数据
// 	writeByteData(data) {
// 		RNSerialPort.sendByteData(data);
// 	}
// }

// export const SerialPortManager = RNSerialPortManager.ShareInstance();