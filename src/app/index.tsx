import RNSerialPort from '@koimy/react-native-serial-port'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, View } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import { connect, Provider } from 'react-redux';
import check_new_version from '../atom/check-new-version'
import { update_url } from '../atom/config'
import get_changelog from '../atom/get-changelog'
import MessageBox from '../atom/message-box'
import { ticket_login } from '../atom/server'
import { get, set } from '../atom/storage';
import toast from '../atom/toast';
import upgrade_app from '../atom/upgrade-app';
import store from '../store/index'

// 引入页面
import home from '../home'
import login from '../login'
// import nfc from '../nfc'

const { Navigator, Screen } = createStackNavigator();

export default function App() {
	const navigation_container = useRef<NavigationContainerRef>(null);

	const [update, set_update] = useState({
		new: false,
		changelog: ''
	})

	// 检查版本更新
	useEffect(() => {
		(async () => {
			// const _server_address = await get<string>('server_address')
			if (update_url) {
				const res = await check_new_version(update_url)
				if (res.code) {
					const changelog = await get_changelog(update_url, res.result.androidVersion)
					const json = JSON.parse(changelog)
					set_update({
						new: true,
						changelog: json.android
					})
				}
			}
		})()
	}, [])

	// ticket_login, 在线状态下跳首页
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
			// 隐藏启动图
			RNBootSplash.hide(); // immediate
		})()
	}, []);

	// 更新
	async function to_update() {
		await upgrade_app(update_url)
	}

	// 开启串口监听
	useEffect(() => {
		setTimeout(() => {
			RNSerialPort.openSerialPort('/dev/ttyS4', '9600')
			// 监听接收串口开关的状态
			// DeviceEventEmitter.addListener('onSerialPortOpenStatus', (status) => {
			// 	console.log("onSerialPortOpenStatus", status);
			// })
		}, 1000);
	}, [])
	// return <Button
	// 	title="测试"
	// 	onPress={() => {
	// 		return toast('success', '11111111111111')
	// 	}}
	// />

	return (
		<Provider store={store}>
			<NavigationContainer ref={navigation_container}>
				<Navigator initialRouteName='login' screenOptions={{
					headerStyle: {
						height: 0
					},
					headerTitle: '',
					headerBackTitle: ''
				}}>
					<Screen name='login' component={login} />
					<Screen name='home' component={
						connect(
							(state: { equipment_mes_id: string, process_mes_id: string }) => ({ equipment_mes_id: state.equipment_mes_id, process_mes_id: state.process_mes_id })
						)(home)
					} />
					{/* <Screen name='nfc' component={nfc} /> */}
				</Navigator>

				<MessageBox visible={update.new} toCencel={() => set_update({
					...update,
					new: false
				})} toConfirm={() => to_update()}>
					<View style={{ marginTop: 40, marginBottom: 40 }}>
						<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center' }}>有新版本，是否更新？</Text>
						<Text style={{ marginTop: 20, fontSize: 16, color: '#333333', textAlign: 'center' }}>{update.changelog}</Text>
					</View>
				</MessageBox>
			</NavigationContainer>
		</Provider>
	);
}

// import { RootSiblingParent } from 'react-native-root-siblings';
// <RootSiblingParent>
// </RootSiblingParent>
