import { useNavigation } from '@react-navigation/native'
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fdicon from '../atom/icon';
import { login } from '../atom/server'
import { set } from '../atom/storage';
import toast from '../atom/toast'
import useStates from '../atom/use-states'
import { getuserroleinfo } from './api'

export default () => {
	const nvigation = useNavigation()

	const states = useStates({
		account: 'user01',
		pwd: '111111'
	})

	async function tologin() {
		try {
			const res = await login(states.account, states.pwd)
			await set('sessionid', res.sessionID)
			await set('usercode', res.usercode)
			await set('ticket', res.remember_me_ticket)
			const userinfo = await getuserroleinfo(res.usercode)
			await set('mes_staff_code', userinfo.user.pub_user_connect[0].pk_val)
			await set('mes_staff_name', userinfo.user.pub_user_connect[0].search_field_val)
			nvigation.navigate('home')

		} catch (error) {
			toast('error', error.message);
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
				<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', width: '30%' }}>
					<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', opacity: 1 }}>
						<View style={{ flexDirection: 'row', width: 60, borderRightWidth: 1, borderRightColor: '#fffdf5', justifyContent: 'center' }}>
							<Text style={{ fontSize: 18, color: '#fffdf5' }}>账号</Text>
						</View>
					</View>
					<TextInput placeholder='请输入账号' underlineColorAndroid="transparent" style={styles.inputs} placeholderTextColor='#fffdf5' onChangeText={(text) => states.account = text}>
					</TextInput>
				</View>
				<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#fffdf5', alignItems: 'center', width: '30%' }}>
					<View style={{ height: 70, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ececec', alignItems: 'center' }}>
						<View style={{ flexDirection: 'row', width: 60, borderRightWidth: 1, borderRightColor: '#ddd', justifyContent: 'center' }}>
							< Text style={{ fontSize: 18, color: '#fffdf5' }}>密码</Text>
						</View>
					</View>
					<TextInput placeholder='请输入密码' style={styles.inputs} placeholderTextColor='#fffdf5' secureTextEntry={true} underlineColorAndroid="transparent" onChangeText={(text) => states.pwd = text}>
					</TextInput>
				</View>
				<TouchableOpacity onPress={() => tologin()} style={{ height: 70, width: 600, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', marginTop: 50, borderRadius: 35 }}>
					<Text style={{ color: '#FFF', fontSize: 18, alignItems: 'center' }}>登录</Text>
				</TouchableOpacity>
				<View style={{ marginTop: 20 }}>
					<Text style={{ color: '#fffdf5' }}>切换登录方式</Text>
				</View>
				<View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
					<Fdicon name='qia1' size={70} color='#242c3a'></Fdicon>
					<Fdicon name='zhiwen-xianxing' size={67} color='#242c3a'></Fdicon>
					<Fdicon name='id1' size={70} color='#242c3a'></Fdicon>
					<Fdicon name='nfc-1' size={70} color='#242c3a'></Fdicon>
				</View>
				{/* ID登录 */}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='id1' size={100} color='#242c3a'></Fdicon>
					<Text style={{}}>请使用ID进行登录</Text>
				</View> */}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='qia1' size={100} color='#242c3a'></Fdicon>
					<Text style={{}}>请刷智能卡进行登录</Text>
				</View> */}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='zhiwen-xianxing' size={100} color='#242c3a'></Fdicon>
					<Text style={{}}>请刷指纹进行登录</Text>
				</View> */}
				{/* <View style={{ marginTop: 40 }}>
					<Fdicon name='nfc-1' size={100} color='#242c3a'></Fdicon>
					<Text style={{}}>请使用NFC进行登录</Text>
				</View>
				<View style={{ height: 70, width: '20%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#242c3a', marginTop: 50, opacity: 0.5, borderRadius: 35 }}>
				</View>
				<View style={{ position: 'relative', top: -45 }}>
					<Text style={{ color: '#FFF', fontSize: 18 }}>密码登录</Text>
				</View> */}
			</View>
		</ImageBackground >
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
