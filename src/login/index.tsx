import React from 'react';
import { Image, Text, View } from 'react-native';
//  import { TextInput } from 'react-native-paper';

export default () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{/* <Image source={require('../../imgs/science5.png')} style={{ width: '100%', height: '100%' }} /> */}
			<View>
				<Image source={require('../../imgs/sifang.png')} style={{ width: 305, height: 72 }} />
			</View>
			<View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
				<Text style={{ fontSize: 14, color: '#666' }}>帐号</Text>
				{/* <TextInput placeholder='请输入用户名' style={{ flex: 1, fontSize: 14, color: '#333', padding: 10 }} autoCapitalize={'none'} keyboardType={'email-address'} maxLength={11}>
                </TextInput> */}
			</View>
		</View>
	);
}