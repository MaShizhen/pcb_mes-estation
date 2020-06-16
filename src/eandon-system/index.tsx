import React, { useEffect, useState } from 'react';
import { Image, Picker, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { get_file } from '../atom/config';
import Fdicon from '../atom/icon';
import MessageBox from '../atom/message-box';
import { get } from '../atom/storage';
import toast from '../atom/toast';
import { equipmentlist } from '../home/api';
import { IEquipmentList } from '../home/interface';
import { andonboardlight, boardadd, userboard, userboardright } from './api';
import { IUserboard, IUserboardRight } from './interface';

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
	// 弹窗内设备列表
	const [equipment_list, set_equipment_list] = useState<IEquipmentList[]>([])
	// 设置左侧弹窗显示
	const [message_box, set_message_box] = useState({
		index: 0,
		args: {}
	})

	const [selectedValue, setSelectedValue] = useState(0);

	// 初始化查询报警代码列表
	useEffect(() => {
		(async () => {
			const mes_id = await get<string>('mes_id')
			const userboard_res = await userboard(mes_id)
			const userboardright_res = await userboardright('74c08b13-aa1e-48fh-a9bc-60257665afa7', '')
			set_states({
				...states,
				userboard: userboard_res.data,
				userboardright: userboardright_res.data.list
			})

		})()
	}, []);

	// 头部设备下拉数据
	useEffect(() => {
		(async () => {
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			// const mes_ids = await get<string>('mes_ids')
			const equipmentlist_res = await equipmentlist(mes_staff_code, mes_staff_name)
			set_equipment_list(equipmentlist_res.data.sub)
		})()

	}, []);

	/**
	 * 下发
	 */
	async function issue(args: object) {
		const obj = args as unknown as IUserboard
		const mes_process_mesid = await get<string>('mes_id')
		try {
			await boardadd({
				mes_alarm_mesid: obj.mes_id,
				mes_process_mesid,
				mes_device_mesid: equipment_list[selectedValue].mes_id,
				effective_staff: '',
				mes_create_staffid: '',
				mes_create_staff: ''
			})
			toast('success', '提交成功')
		} catch (error) {
			toast('error', '提交失败')
		}
	}

	/**
	 * 移除报警
	 */
	async function remove(args: object) {
		try {
			const obj = args as unknown as IUserboardRight
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			await andonboardlight(mes_staff_code, mes_staff_name, obj.mes_id, obj.effective_time)
			toast('success', '解除成功')
		} catch (error) {
			toast('error', '解除失败')
		}
	}

	/**
	 * 校验权限
	 */
	async function check(args: { _index: number }) {
		const _index = args._index
		if (_index === 1) {
			await issue(args)
		} else if (_index === 3) {
			await remove(args)
		}
		// 隐藏弹窗
		set_message_box({
			index: 0,
			args: null
		})
	}

	return (
		<ScrollView>
			<View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
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
									<TouchableOpacity key={index} onPress={() => set_message_box({ index: 1, args: item })} >
										<View style={{ height: 45, borderWidth: 1, borderRadius: 10, borderColor: '#e2e1de', backgroundColor: '#fff', width: '80%', marginLeft: '10%', marginBottom: 15 }}>
											<Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>
										</View>
									</TouchableOpacity>
								)
							})
						} else {
							return <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
								<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
								<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
							</View>
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
										<TouchableOpacity key={index} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '25%' }} onPress={() => {
											set_message_box({
												index: 3,
												args: item
											})
										}}>
											<Image source={{ uri: get_file + item.mes_alarm_picture }} style={{ borderRadius: 5, width: 120, height: 70, backgroundColor: 'rgba(0,0,0,0.2)' }} />
											<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>
										</TouchableOpacity>
									)
								})
							} else {
								return <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
									<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
									<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
								</View>
							}
						})()}
					</View>
				</View>
			</View>


			<MessageBox title="提交安灯报警" visible={message_box.index === 1} toConfirm={(args) => set_message_box({
				index: 2,
				args: {
					...args,
					_index: 1
				}
			})} toCencel={() => set_message_box({ index: 0, args: null })}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>可用设备代码：</Text>
					<Picker selectedValue={equipment_list[selectedValue].mes_id} onValueChange={(_, itemIndex) => setSelectedValue(itemIndex)} style={{ height: 35, width: 250 }} >
						{
							equipment_list.map((item, index) => {
								return <Picker.Item label={item.mes_device_name} key={index} value={item.mes_id} />
							})
						}
					</Picker>
				</View>
			</MessageBox>

			<MessageBox args={message_box.args} title="验证" visible={message_box.index === 2} toConfirm={(args: { _index: number }) => {
				check(args)
			}} toCencel={(args: { _index: number }) => {
				set_message_box({ index: args._index, args: null })
			}}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>请刷卡验证登录</Text>
				</View>
			</MessageBox>

			<MessageBox title="提示" visible={message_box.index === 3} toConfirm={(args) => set_message_box({
				index: 2,
				args: {
					...args,
					_index: 3
				}
			})} toCencel={() => set_message_box({ index: 0, args: null })}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>是否解除安灯报警？</Text>
				</View>
			</MessageBox>


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
