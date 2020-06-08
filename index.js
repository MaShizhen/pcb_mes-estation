import { AppRegistry, View, Text, Alert, Button } from 'react-native';
import React from 'react'
import C72RFIDScanner from "c72-rfid-scanner";
import RNSerialPort from '@koimy/react-native-serial-port';


import { name as appName } from './app.json';

const App = () => {

	/**
	 * QUICK NOT (MAKE SURE TO ONLY RUN METHODS WHEN THE POWER STATE IS ON
	 * OTHERWISE YOU WILL GET AN ERROR
	 */

	const [isReading, setIsReading] = React.useState();

	const [powerState, setPowerState] = React.useState('');

	const [tags, setTags] = React.useState([]);

	const showAlert = (title, data) => {
		Alert.alert(
			title,
			data,
			[
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false },
		);
	}

	const powerListener = (data) => {
		//console.log(data);
		setPowerState(data);
	}

	const tagListener = (data) => {
		//rssi = data[1] epc = data[0] //Iam only interested in the EPC tag
		setTags(tags => tags.concat(data[0]));
	}

	React.useEffect(() => {
		const scanner = C72RFIDScanner;
		scanner.initializeReader();
		scanner.powerListener(powerListener);
		scanner.tagListener(tagListener);
		return () => scanner.deInitializeReader();
	}, []);

	const readPower = async () => {
		try {
			let result = await C72RFIDScanner.readPower();
			showAlert('SUCCESS', `The result is ${result}`);
			console.log(result);
		} catch (error) {
			showAlert('FAILED', error.message);
		}
	}

	const scanSingleTag = async () => {
		try {
			let result = await C72RFIDScanner.readSingleTag();
			showAlert('SUCCESS', `The result is ${result}`);
			console.log(result);
		} catch (error) {
			showAlert('FAILED', error.message);
		}
	}

	const startReading = () => {
		C72RFIDScanner.startReadingTags(function success(message) {
			setIsReading(message);
		})
	}

	const stopReading = () => {
		C72RFIDScanner.stopReadingTags(function success(message) {
			setIsReading(false);
		});

		/**
		 * When I stop scanning I immediately return the tags in my state
		 * (You could render a view or do whatever you want with the data)
		 */
		console.log(tags);
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

			<View>
				<Text>{powerState}</Text>
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button style={{ margin: 10 }} onPress={() => readPower()} title='Read Power' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button style={{ margin: 10 }} onPress={() => scanSingleTag()} title='Read Single Tag' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button disabled={isReading} style={{ margin: 10 }} onPress={() => startReading()} title='Start Bulk Scan' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button disabled={!isReading} style={{ margin: 10 }} onPress={() => stopReading()} title='Stop Bulk Scan' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button style={{ margin: 10 }} onPress={() => {
					console.log('111111111')
					RNSerialPort.getAllDevicesPath((result) => {
						console.log(result);
					});
				}} title='获取设备的路径列表' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button style={{ margin: 10 }} onPress={() => {
					RNSerialPort.openSerialPort('/dev/ttyS4', 9600);
				}} title='打开串口' />
			</View>

			<View style={{ marginVertical: 20 }}>
				<Button style={{ margin: 10 }} onPress={() => {
					// 监听串口回传数据
					DeviceEventEmitter.addListener('onSerialPortRecevieData', (receiveData) => {
						console.log('onSerialPortRecevieData', receiveData);
					})
					//监听接收串口开关的状态
					DeviceEventEmitter.addListener('onSerialPortOpenStatus', (status) => {
						console.log('onSerialPortstatus', status);

					})
				}} title='监听串口回传数据' />
			</View>

		</View>
	);

}


AppRegistry.registerComponent(appName, () => App);
