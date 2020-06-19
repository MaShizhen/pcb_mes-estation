// import RNSerialPort from '@koimy/react-native-serial-port'
// import React from 'react';
// import { Button, DeviceEventEmitter, Text, TouchableHighlight, View } from 'react-native';
// import bytes2str from '../atom/bytes2str'

// export default () => {

// 	return (
// 		<View style={{ padding: 20 }}>
// 			<Button onPress={() => {
// 				RNSerialPort.getAllDevicesPath((result) => {
// 					console.log(result);
// 				});
// 			}} title='获取设备的路径列表'></Button>

// 			<TouchableHighlight style={{ margin: 200 }} onPress={() => {
// 				RNSerialPort.openSerialPort('/dev/ttyS4', '9600')
// 				// 监听串口回传数据
// 				DeviceEventEmitter.addListener('onSerialPortRecevieData', (receiveData) => {
// 					console.log("onSerialPortRecevieData", receiveData);
// 					const str = bytes2str(receiveData)
// 					console.log('卡号: ', str);
// 				})
// 				// 监听接收串口开关的状态
// 				DeviceEventEmitter.addListener('onSerialPortOpenStatus', (status) => {
// 					console.log("onSerialPortOpenStatus");
// 				})

// 			}} ><Text>打开串口</Text></TouchableHighlight>

// 			<Button onPress={() => {
// 				const byteData = [0x00, 0x01, 0x02, 0x03, 0x05]
// 				RNSerialPort.sendByteData(byteData);
// 			}} title='发送数据'></Button>

// 			{/* <Button onPress={() => {

// 			}} title='监听串口的状态 和 监听串口回传数据'></Button> */}

// 		</View >
// 	)
// }
