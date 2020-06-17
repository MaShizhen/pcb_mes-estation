import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import RNBootSplash from "react-native-bootsplash";
import { ticket_login } from '../atom/server'
import { get } from '../atom/storage';

import { Text, TouchableOpacity, View } from 'react-native'


// 引入页面
import home from '../home'
import login from '../login'
// import nfc from '../nfc'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

export default function App() {
	const navigation_container = useRef<NavigationContainerRef>(null);

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
					navigation_container.current.navigate('home')
				}
			}
			RNBootSplash.hide(); // immediate
		})()
	}, []);

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

			{/* {(() => {
				return (<View style={{ backgroundColor: 'rgba(0,0,0,.3)', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center' }}>
					<View style={{ backgroundColor: '#fff', borderRadius: 5, alignItems: 'center', justifyContent: 'center', width: '35%', marginLeft: '35%' }}>
						<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 160 }}>有新版本，是否更新？</Text>
						<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
							<TouchableOpacity style={{ borderBottomLeftRadius: 5, height: 60, flex: 1 }}>
								<Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 60, color: '#333' }}>取消</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#0099ff', height: 60, flex: 1 }}>
								<Text style={{ fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 60 }}>确认</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>);
			})()} */}
		</NavigationContainer>
	);
}
