import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { Image, Modal, Picker, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Fdicon from '../../atom/icon';
import { get_file } from '../atom/config'
import Fdicon from '../atom/icon';
import { get } from '../atom/storage'
import { userboard, userboardright } from './api'
import SetDistribution from './components/set-distribution';
import { IUserboard, IUserboardRight } from './interface'

interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void,
	route: {
		params: {
			data: string[]
		}
	}
}

export default (prop: IProp) => {
	const [states, set_states] = useState({
		userboard: [] as IUserboard[],
		userboardright: [] as IUserboardRight[],
		visible: false as boolean
	})
	// 初始化查询报警代码列表
	useEffect(() => {
		(async () => {
			const mes_id = await get<string>('mes_id')
			const userboard_res = await userboard(mes_id)
			const userboardright_res = await userboardright('mes_id', 'mes_ids')
			console.log('userboard_res', userboard_res, 'userboardright_res', userboardright_res)
			set_states({
				...states,
				userboard: userboard_res.data,
				userboardright: userboardright_res.data.list
			})

		})()
	}, []);

	function alertIndex(index: number) {
		set_states({
			...states,
			visible: true
		})
	}


	return (
		<ScrollView>
			<View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#fff', minHeight: 200, paddingTop: 20 }}>
				<View style={{ flex: 0.25, borderRightWidth: 0.5, borderColor: '#e2e1de' }}>
					<View style={{
						height: 45, backgroundColor: '#fff', marginBottom: 20
					}}>
						<Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 18 }}>报警代码列表</Text>
					</View>
					{(() => {
						if (states.userboard.length > 0) {
							return states.userboard.map((item, index) => {
								return (
									<TouchableOpacity onPress={() => alertIndex(index)} >
										<View key={index} style={{ height: 45, borderWidth: 1, borderRadius: 10, borderColor: '#e2e1de', backgroundColor: '#fff', width: '80%', marginLeft: '10%', marginBottom: 15 }}>
											<Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>
										</View>
									</TouchableOpacity>
								)
							})
						}
					})()}
				</View>
				<View style={{ flex: 0.75, paddingLeft: 10, paddingRight: 10 }}>
					<View style={{ height: 45, backgroundColor: '#fff', marginBottom: 20 }}><Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 18 }}>报警代码详情</Text></View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
						{(() => {
							if (states.userboardright.length > 0) {
								return states.userboardright.map((item, index) => {
									return (
										<View key={index} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '25%' }}>
											<Image source={{ uri: get_file + item.mes_alarm_picture }} style={{ borderRadius: 5, width: 120, height: 70, backgroundColor: 'rgba(0,0,0,0.2)' }} />
											<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>
										</View>
									)
								})
							} else {
								return <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
									<Fdicon name='guanbi' size={20} color='#333'></Fdicon>
									<Text style={{ fontSize: 18, textAlign: 'center' }}>暂无数据~</Text>
								</View>
							}
						})()}
					</View>
				</View>
				<SetDistribution visible={states.visible} id={''} toHide={() => {
					set_states({
						...states,
						visible: false
					})
				}} />
			</View>
			{/* 全展示效果 */}
			{/* <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff', paddingTop: 20 }}>
				<View style={{ height: 45, backgroundColor: '#fff', marginBottom: 20 }}><Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 18 }}>报警代码详情</Text></View>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '20%' }}>
						<View style={{ height: 70, width: 120 }}>
							<Image source={require('../../imgs/science5.png')} style={{ borderRadius: 5, width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>水泵是否正常</Text>
					</View>
				</View>
			</View> */}
			{/* 筛选 start */}
			{/* {(() => {
				if (0) {
					return (
						<Modal transparent={true}>
							<TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.3)', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} activeOpacity={1}>
								<View style={{ backgroundColor: 'rgba(0,0,0,.3)', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', justifyContent: 'center' }}>
									<View style={{ margin: 50, backgroundColor: '#fff', borderRadius: 5 }}>
										<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: '#999' }}>
											<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 35 }}>提交安灯报警</Text>
											<Fdicon name='guanbi' size={16} color='#333'></Fdicon>
										</View>
										<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
											<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 80 }}>可用设备代码：</Text>
											<Picker
												style={{ height: 35, width: 100 }} >
												<Picker.Item label="java" value="java" />
												<Picker.Item label="JavaScript" value="js" />
											</Picker>
										</View>
										<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
											<TouchableOpacity style={{ borderBottomLeftRadius: 5, height: 40, flex: 1 }}>
												<Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 40, color: '#333' }}>取消</Text>
											</TouchableOpacity>
											<TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#0099ff', height: 40, flex: 1 }}>
												<Text style={{ fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 40 }}>提交</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						</Modal>
					);
				}
			})()} */}
			{/* 筛选 end */}
		</ScrollView>

	);
}
