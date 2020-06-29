import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fdicon from '../atom/icon';
import loading from '../atom/loading';
import MessageBox from '../atom/message-box'
import nfc from '../atom/nfc';
import rfid from '../atom/rfid';
import { login } from '../atom/server'
import { get, set } from '../atom/storage';
import toast from '../atom/toast'

export default () => {
	const navigation = useNavigation()

	const [account, set_account] = useState('')
	const [pwd, set_pwd] = useState('')
	const [display, set_display] = useState(false)
	const [server_address, set_server_address] = useState('')
	// 登录类型
	const [login_type, set_login_type] = useState<'0' | '1' | '2'>('2')
	const [card_id, set_card_id] = useState('')

	useEffect(() => {
		(async () => {
			const _server_address = await get<string>('server_address')
			set_server_address(_server_address)
		})()
	}, [display])

	async function tologin() {
		const load = await loading('0%')
		try {
			if (!server_address) {
				await load.destroy()
				set_display(true)
				return toast('warning', '请设置服务器地址');
			}
			if (login_type === '2') {
				if (!account) {
					return toast('warning', '请输入账号');
				} else if (!pwd) {
					return toast('warning', '请密码');
				}
			}

			const res = await login(account, pwd, login_type, card_id)
			await set('sessionid', res.sessionID)
			await set('usercode', res.usercode)
			await set('ticket', res.remember_me_ticket)
			await set('mes_staff_code', res.mes_staff_code)
			await set('mes_staff_name', res.mes_staff_name)
			navigation.reset({
				index: 0,
				routes: [{
					name: 'home'
				}]
			})
			await load.destroy()

		} catch (error) {
			set_login_type('2')
			await load.destroy()
			return toast('error', error.message);
		}
	}

	return (
		<ImageBackground source={require('../../imgs/science5.png')} style={{ width: '100%', height: '100%' }} >
			<View style={styles.header}>
				<View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
					<View style={{ marginLeft: 40, marginRight: 40, alignItems: 'center' }}>
						<Image source={require('../../imgs/logo.png')} style={{ width: 505, height: 72 }} />
					</View>
				</View>
				{/* 密码登录 */}
				{(() => {
					if (login_type === '2') {
						return (
							<>
								<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', width: 600 }}>
									<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', opacity: 1 }}>
										<View style={{ flexDirection: 'row', width: 60, borderRightWidth: 1, borderRightColor: '#fffdf5', justifyContent: 'center' }}>
											<Text style={{ fontSize: 18, color: '#fffdf5' }}>账号</Text>
										</View>
									</View>
									<TextInput placeholder='请输入账号' underlineColorAndroid="transparent" style={styles.inputs} placeholderTextColor='#fffdf5' onChangeText={(text) => set_account(text)}>
									</TextInput>
								</View>
								<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', width: 600 }}>
									<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ececec', alignItems: 'center' }}>
										<View style={{ flexDirection: 'row', width: 60, borderRightWidth: 1, borderRightColor: '#ddd', justifyContent: 'center' }}>
											< Text style={{ fontSize: 18, color: '#fffdf5' }}>密码</Text>
										</View>
									</View>
									<TextInput placeholder='请输入密码' style={styles.inputs} placeholderTextColor='#fffdf5' secureTextEntry={true} underlineColorAndroid="transparent" onChangeText={(text) => set_pwd(text)}>
									</TextInput>
								</View>
								<TouchableOpacity onPress={() => tologin()} style={{ height: 70, width: 600, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', marginTop: 50, borderRadius: 35 }}>
									<Text style={{ color: '#FFF', fontSize: 18, alignItems: 'center' }}>登录</Text>
								</TouchableOpacity>
							</>
						)
					}
				})()}

				{/* ID登录 */}
				{login_type === '0' && <View style={{ marginTop: 40, alignItems: 'center' }}>
					<Fdicon name='id1' size={100} color='#242c3a'></Fdicon>
					<Text>请使用ID进行登录</Text>
				</View>}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='qia1' size={100} color='#242c3a'></Fdicon>
					<Text>请刷智能卡进行登录</Text>
				</View> */}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='zhiwen-xianxing' size={100} color='#242c3a'></Fdicon>
					<Text>请刷指纹进行登录</Text>
				</View> */}
				{login_type === '1' && <View style={{ marginTop: 40, alignItems: 'center' }}>
					<Fdicon name='nfc-1' size={100} color='#242c3a'></Fdicon>
					<Text>请使用NFC进行登录</Text>
				</View>}
				{/*
				<View style={{ height: 70, width: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#242c3a', marginTop: 50, opacity: 0.5, borderRadius: 35 }}>
				</View>
				<View style={{ position: 'relative', top: -45 }}>
					<Text style={{ color: '#FFF', fontSize: 18 }}>密码登录</Text>
				</View> */}




				<View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
					{/* <Fdicon name='qia1' size={70} color='#242c3a'></Fdicon> */}
					{/* <Fdicon name='zhiwen-xianxing' size={67} color='#242c3a'></Fdicon> */}
					<Fdicon onPress={() => { set_login_type('2') }} name='jianpan' size={70} color={login_type === '2' ? '#409eff' : '#242c3a'}></Fdicon>
					<Fdicon onPress={async () => {
						set_login_type('0')
						const res = await rfid()
						if (res.code === 1) {
							set_card_id(res.id)
						}
						tologin()
					}} name='id1' size={70} color={login_type === '0' ? '#409eff' : '#242c3a'}></Fdicon>
					<Fdicon onPress={async () => {
						set_login_type('1')
						const res = await nfc()
						if (res.code === 1) {
							set_card_id(res.id)
						}
						tologin()
					}} name='nfc-1' size={70} color={login_type === '1' ? '#409eff' : '#242c3a'}></Fdicon>
				</View>
				<View style={{ marginTop: 20 }}>
					<TouchableOpacity onPress={() => set_display(true)}>
						<Text style={{ color: server_address ? 'black' : 'black' }}>{server_address ? server_address : '请配置服务器地址'}</Text>
					</TouchableOpacity>
				</View>

				<MessageBox visible={display} title='配置服务器地址' toCencel={() => set_display(false)} toConfirm={async () => { await set('server_address', server_address); set_display(false) }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, height: 160 }}>
						<Text style={{ fontSize: 16 }}>服务器地址:</Text>
						<TextInput
							style={{ borderColor: 'gray', borderBottomWidth: 1, flex: 0.8, paddingLeft: 5, fontSize: 16 }}
							onChangeText={text => set_server_address(text)}
							value={server_address}
							placeholder="请输入服务器地址"
						/>
					</View>
				</MessageBox>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	header: {
		flex: 1, alignItems: 'center', justifyContent: 'center'
	},
	inputs: {
		flex: 1, fontSize: 18, padding: 10
	}
});
