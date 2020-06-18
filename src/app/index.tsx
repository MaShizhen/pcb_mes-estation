import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import MessageBox from '../atom/message-box'
import { ticket_login } from '../atom/server'
import { get, set } from '../atom/storage';


// 引入页面
import home from '../home'
import login from '../login'
// import nfc from '../nfc'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

export default function App() {
	const navigation_container = useRef<NavigationContainerRef>(null);

	const [update, set_update] = useState(true)

	useEffect(() => {
		(async () => {
			const _server_address = await get<string>('server_address')
			if (_server_address) {

			}
		})()
	})

	useEffect(() => {
		(async () => {
			const _server_address = await get<string>('server_address')
			if (_server_address) {
				const is_online = await ticket_login()
				if (is_online && is_online.code) {
					await set('sessionid', is_online.sessionid)
					navigation_container.current.navigate('home')
				}
			}
			RNBootSplash.hide(); // immediate
		})()
	}, []);

	// 更新
	function to_update() {

	}

	return (
		<NavigationContainer ref={navigation_container}>
			<Stack.Navigator initialRouteName='login' screenOptions={{
				headerStyle: {
					height: 0
				},
				headerTitle: ''
			}}>
				<Stack.Screen name='login' component={login} />
				<Stack.Screen name='home' component={home} />
				{/* <Stack.Screen name='nfc' component={nfc} /> */}
			</Stack.Navigator>

			<MessageBox visible={update} toCencel={() => set_update(false)} toConfirm={() => to_update()}>
				<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 160 }}>有新版本，是否更新？</Text>
			</MessageBox>

		</NavigationContainer>
	);
}
