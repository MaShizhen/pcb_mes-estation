// import { Picker } from '@react-native-community/picker'
import RNSerialPort from '@koimy/react-native-serial-port'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Picker, ScrollView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { mqtt } from '../atom/config'
import Icon from '../atom/icon'
import Fdicon from '../atom/icon';
import { config, listen_callback, unsubscribe } from '../atom/mqtt'
import { ticket_login } from '../atom/server'
import { get, set } from '../atom/storage'
import { equipmentlist } from './api';
import LoginOut from './components/login-out';

// 引入页面
import dashboard_system from '../dashboard-system'
import data_collection from '../data-collection'
import eandon_system from '../eandon-system'
import esop_system from '../esop-system'
import quality_management from '../quality-management'
import reporting_system from '../reporting-system'
import view_params from '../view-params'
import { IEquipmentList } from './interface'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

interface IProps {
	session: string;
	dispatch: Dispatch<AnyAction>
}

export default (props: IProps) => {
	// const use_session = useSession()

	const navigation = useNavigation();
	const [states, set_states] = useState({
		equipmentlist: [] as IEquipmentList[],
		mes_process_code: '', // 工序编号
		mes_process_name: '', // 工序名称
		mes_device_code: '',// 设备mes_id
		mes_id: '', // 员工名称
		mes_staff_name: '',
		mes_staff_code: '',
		focused_index: 0 as number,
		visible: false as boolean
	})

	// 开启串口监听
	useEffect(() => {
		RNSerialPort.openSerialPort('/dev/ttyS4', '9600')
		// 监听接收串口开关的状态
		// DeviceEventEmitter.addListener('onSerialPortOpenStatus', (status) => {
		// 	console.log("onSerialPortOpenStatus", status);
		// })
	}, [])

	// 初始化查询头部
	useEffect(() => {
		(async () => {
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			const equipmentlist_res = await equipmentlist(mes_staff_code, mes_staff_name)
			await set('mes_id', equipmentlist_res.data.mes_id)
			await set('mes_ids', equipmentlist_res.data.sub[0].mes_id)
			set_states({
				...states,
				equipmentlist: equipmentlist_res.data.sub,
				mes_process_name: equipmentlist_res.data.mes_process_name,
				mes_staff_code: equipmentlist_res.data.mes_staff_code,
				mes_staff_name: equipmentlist_res.data.mes_staff_name
			})
			config(mqtt)
		})()
	}, []);

	/**
	 * home显示时，开启定时更新登录日志服务
	 */
	useFocusEffect(
		useCallback(() => {
			const inv = setInterval(async () => {
				// (async () => {
				const sessionid = await get('sessionid')
				config(mqtt)
				await unsubscribe(mqtt, `/push/${sessionid}`)
				const is_online = await ticket_login()
				if (!(is_online && is_online.code)) {
					navigation.navigate('login')
				} else {
					await set('sessionid', is_online.sessionid)
					console.log('----------------------------', is_online.sessionid);

					listen_callback(mqtt, `/push/${is_online.sessionid}`, (res) => {
						props.dispatch({ type: 'message' })
					})
				}
				// })()
			}, 1000 * 60 * 5)
			/**
			 * home页面返回时，清除定时器
			 */
			return () => {
				clearInterval(inv)
			}
		}, [])
	)

	function alertClick() {
		set_states({
			...states,
			visible: true
		})
	}

	const menus = [
		{
			title: 'menus',
			data: [{
				name: 'ESOP',
				path: 'esop_system',
				color: '#fff',
				icon: 'propertysafety',
				icon_focused: 'property-safety',
				focused: true
			}, {
				name: '安灯系统',
				path: 'eandon_system',
				color: '#fff',
				icon: 'dengpao',
				icon_focused: 'dengpao1',
				focused: false
			}, {
				name: '数据采录',
				path: 'data_collection',
				color: '#fff',
				icon: 'wenbenbianji',
				icon_focused: 'wenbenbianjitianchong',
				focused: false
			}, {
				name: '品质管理',
				path: 'quality_management',
				color: '#fff',
				icon: 'pinzhi',
				icon_focused: 'yiliaozhiliangfenxi',
				focused: false
			}, {
				name: '看板系统',
				path: 'dashboard_system',
				color: '#fff',
				icon: 'jiankongmianban',
				icon_focused: 'jiankongmianban-mianxing',
				focused: false
			}, {
				name: '报表系统',
				path: 'reporting_system',
				color: '#fff',
				icon: 'tubiao',
				icon_focused: 'tubiao1',
				focused: false
			}]
		}
	]

	return (
		<Grid>
			<Row size={9}>
				<Image style={{
					height: 150, width: '100%', position: 'absolute'
				}} source={require('../../imgs/title_img.png')}></Image>
				<View style={{
					flexDirection: 'row', alignItems: 'center'
				}}>
					<Image style={{ height: 35, width: 130 }} source={require('../../imgs/logo.png')}></Image>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: '79%' }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ height: 35, lineHeight: 35, textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}>终端代码名称:</Text>
							<Text style={{ height: 35, lineHeight: 35, color: '#fff', fontSize: 16 }}>终端代码名称</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ height: 35, lineHeight: 35, textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}>工序代码名称:</Text>
							<Text style={{ height: 35, lineHeight: 35, color: '#fff', fontSize: 16 }}>{states.mes_process_name}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ height: 35, lineHeight: 35, textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}>员工编号:</Text>
							<Text style={{ height: 35, lineHeight: 35, color: '#fff', fontSize: 16 }}>{states.mes_staff_code}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ height: 35, lineHeight: 35, textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}>员工名称:</Text>
							<Text style={{ height: 35, lineHeight: 35, color: '#fff', fontSize: 16 }}>{states.mes_staff_name}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ height: 35, lineHeight: 35, textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}>所属设备:</Text>
							<Picker mode={'dialog'}
								style={{ height: 35, width: 220, color: '#fff', fontSize: 16 }} >
								{
									states.equipmentlist.map((item, index) => {
										return <Picker.Item label={item.mes_device_name} key={index} value={item.mes_device_code} />
									})
								}
							</Picker>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ textAlign: 'right', paddingLeft: 25, color: '#fff', fontSize: 16 }}><Fdicon name='xiaoxi1' size={18} color='red'></Fdicon>消息:</Text>
							<Text style={{ color: '#fff', fontSize: 18 }}>测试终端代码名称</Text>
						</View>
					</ScrollView>
				</View>
				{/* 头像 */}
				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', right: 10, top: 6 }} onPress={() => alertClick()}>
					<View style={{ alignItems: 'center' }}>
						<Image source={require('../../imgs/science5.png')} style={{ width: 30, height: 30, borderRadius: 15 }} />
					</View>
				</TouchableOpacity>
			</Row>
			<Row size={91}>
				<Col size={1.3} style={{ backgroundColor: 'black', alignItems: 'center', shadowColor: '#ccc', width: '100%' }} >
					<SectionList

						keyExtractor={(item) => {
							return item.path
						}}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity activeOpacity={0.9} style={{ justifyContent: 'center', backgroundColor: index === states.focused_index ? '#448AFF' : '#fff', height: 100, width: '100%', marginTop: 10, borderRadius: 20 }} onPress={
									() => {
										set_states({
											...states,
											focused_index: index
										})
										navigation.navigate(item.path)
									}}>
									<View style={{ alignItems: 'center', justifyContent: 'center' }}>
										<Icon style={{ alignContent: 'center' }} name={item.icon} size={35} color={index === states.focused_index ? '#fff' : '#448AFF'}></Icon>
										<Text style={{ marginTop: '10%', fontSize: 20, color: index === states.focused_index ? '#fff' : '#448AFF', fontWeight: 'bold' }}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							);
						}}
						sections={menus}
					/>
				</Col>
				<Col size={8.7}>
					<Stack.Navigator initialRouteName='esop_system' screenOptions={{
						animationEnabled: true
					}}>
						<Stack.Screen name='esop_system' component={connect((state: { session: string }) => ({ session: state.session }))(esop_system)} />
						<Stack.Screen name='eandon_system' component={eandon_system} />
						<Stack.Screen name='data_collection' component={data_collection} options={{
							title: '数据采录'
						}} />
						<Stack.Screen name='quality_management' component={quality_management} />
						<Stack.Screen name='dashboard_system' component={dashboard_system} />
						<Stack.Screen name='reporting_system' component={reporting_system} />
						<Stack.Screen name='view_params' component={view_params} options={{
							title: '查看参数'
						}} />
					</Stack.Navigator>
				</Col>
			</Row>

			<LoginOut visible={states.visible} toHide={() => {
				set_states({
					...states,
					visible: false
				})
			}} />
		</Grid>
	);
}
