// import React from 'react';
// import {
// 	Platform,
// 	Text,
// 	TouchableOpacity,
// 	View
// } from 'react-native';
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// class AppV2Mifare extends React.Component {
// 	componentDidMount() {
// 		NfcManager.start();
// 	}

// 	componentWillUnmount() {
// 		this._cleanUp();
// 	}

// 	render() {
// 		return (
// 			<View style={{ padding: 20 }}>
// 				<Text>NFC Demo</Text>
// 				<TouchableOpacity
// 					style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
// 					onPress={this._test}
// 				>
// 					<Text>Test</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
// 					onPress={this._cleanUp}
// 				>
// 					<Text>Cancel Test</Text>
// 				</TouchableOpacity>
// 			</View>
// 		)
// 	}

// 	_cleanUp = () => {
// 		NfcManager.cancelTechnologyRequest().catch(() => 0);
// 	}

// 	_test = async () => {
// 		try {
// 			const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
// 			await NfcManager.requestTechnology(tech);
// 			// console.warn(resp);

// 			// the NFC uid can be found in tag.id
// 			const tag = await NfcManager.getTag();
// 			console.warn('tag； ', tag);

// 			// if (Platform.OS === 'ios') {
// 			// 	resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
// 			// } else {
// 			// 	resp = await NfcManager.transceive([0x30, 0x00]);
// 			// }
// 			// console.warn(resp);

// 			this._cleanUp();
// 		} catch (ex) {
// 			console.warn('ex', ex);
// 			this._cleanUp();
// 		}
// 	}
// }

// export default AppV2Mifare;