import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Picker, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AnyAction, Dispatch } from 'redux';
import uuid from 'uuid';
import { get_file } from '../atom/config';
import Fdicon from '../atom/icon';
import loading from '../atom/loading';
import MessageBox from '../atom/message-box';
import nfc from '../atom/nfc';
import rfid from '../atom/rfid';
import { get } from '../atom/storage';
import toast from '../atom/toast';
import { equipmentlist } from '../home/api';
import { IEquipmentList } from '../home/interface';
import { andonboardlight, boardadd, userboard, userboardright, verified } from './api';
import { IUserboard, IUserboardRight } from './interface';

interface IProps {
	equipment_mes_id: string;
	process_mes_id: string;
	dispatch: Dispatch<AnyAction>
}

export default (props: IProps) => {

	const [userboard_data, set_userboard_data] = useState<IUserboard[]>([])
	const [userboardright_data, set_userboardright_data] = useState<IUserboardRight[]>([])

	const [states, set_states] = useState({
		visible: false as boolean,
		page_num: 1,
		card_identification: ''
	})
	// 弹窗内设备列表
	const [equipment_list, set_equipment_list] = useState<IEquipmentList[]>([])
	// 设置左侧弹窗显示
	const [message_box, set_message_box] = useState({
		index: 0,
		args: {}
	})

	const [selectedValue, setSelectedValue] = useState(0);
	const [reload, set_reload] = useState('');

	const [card_type, set_card_type] = useState('1');
	const cards = [{
		name: 'id',
		flag: '1'
	}, {
		name: 'ic',
		flag: '2'
	}]

	// const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;

	// 查询报警代码列表
	useEffect(() => {
		(async () => {
			const load = await loading()
			const userboard_res = await userboard(props.process_mes_id)
			set_userboard_data(userboard_res.data)
			await load.destroy()
		})()
	}, [props.process_mes_id]);

	// 查询报警代码详情
	useEffect(() => {
		(async () => {
			const load = await loading()
			const userboardright_res = await userboardright(props.process_mes_id, props.equipment_mes_id, states.page_num)
			set_userboardright_data(userboardright_res.data.list)
			await load.destroy()
		})()
	}, [props.process_mes_id, reload]);

	// 头部设备下拉数据
	useEffect(() => {
		(async () => {
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			const equipmentlist_res = await equipmentlist(mes_staff_code, mes_staff_name)
			set_equipment_list(equipmentlist_res.data.sub)
			setSelectedValue(equipmentlist_res.data.sub.findIndex((item) => {
				return item.mes_id === props.equipment_mes_id
			}))
		})()
	}, [props.equipment_mes_id]);

	/**
	 * 下发
	 */
	async function issue(args: object, staff_no: string, staff_name: string) {
		const obj = args as unknown as IUserboard
		const mes_process_mesid = await get<string>('process_mes_id')
		try {
			await boardadd({
				mes_alarm_mesid: obj.mes_id,
				mes_process_mesid,
				mes_device_mesid: equipment_list[selectedValue].mes_id,
				effective_staff: staff_name,
				mes_create_staffid: staff_no,
				mes_create_staff: staff_name
			})
			return toast('success', '提交成功')
		} catch (error) {
			return toast('error', '提交失败')
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
			return toast('success', '解除成功')
		} catch (error) {
			return toast('error', '解除失败')
		}
	}

	/**
	 * 校验权限
	 */
	async function check(args: { _index: number }) {

		const code = await (() => {
			if (card_type === '1') {
				set_states({ ...states, card_identification: '0' })
				return rfid()
			} else {
				set_states({ ...states, card_identification: '1' })
				return nfc()
			}
		})() as { id: string }

		const id_code = code.id
		try {
			const sawadika = await verified(id_code, states.card_identification)
			if (sawadika.data.length > 0) {
				const _index = args._index
				if (_index === 1) {
					await issue(args, sawadika.data[0].staff_no, sawadika.data[0].staff_name)
				} else if (_index === 3) {
					await remove(args)
				}
				// 隐藏弹窗
				set_message_box({
					index: 0,
					args: null
				})
				set_reload(uuid())
				return toast('success', '验证成功')
			} else {
				return toast('error', '验证失败')
			}
		} catch (error) {
			return toast('error', '验证失败')
		}
	}

	return (
		<ScrollView style={{ height: '100%', backgroundColor: '#fff' }}>
			<View style={{ flexDirection: 'row', marginTop: 20 }}>
				<View style={{ width: '25%' }}>
					<View style={{
						height: 45, marginBottom: 20
					}}>
						<Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 18 }}>报警代码列表</Text>
					</View>
					{(() => {
						if (userboard_data.length > 0) {
							return userboard_data.map((item, index) => {
								return (
									<TouchableOpacity key={index} onPress={() => set_message_box({ index: 1, args: item })} >
										<View style={{ height: 45, borderWidth: 1, borderRadius: 10, borderColor: '#e2e1de', width: '80%', marginLeft: '10%', marginBottom: 15 }}>
											<Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>
										</View>
									</TouchableOpacity>
								)
							})
						} else {
							return <View style={{ flex: 1 }}>
								<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
									<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
									<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
								</View>
							</View>
						}
					})()}
				</View>
				<View style={{ borderRightWidth: 0.5, borderColor: '#e2e1de', height: '100%' }}></View>
				<View style={{ paddingLeft: 10, paddingRight: 10, width: '75%', height: windowHeight }}>
					<View style={{ height: 45, marginBottom: 20 }}><Text style={{ lineHeight: 45, textAlign: 'center', fontSize: 18 }}>报警代码详情</Text></View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
						{(() => {
							if (userboardright_data.length > 0) {
								return userboardright_data.map((item, index) => {
									const color = item.business_status === 2 ? 'rgba(0,0,0,0.6)' : 'none'
									return (
										<TouchableOpacity key={index} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 120, width: '25%' }} onPress={() => {
											if (item.business_status === 2) {
												return
											}
											set_message_box({
												index: 3,
												args: item
											})
										}}>
											<Image source={{ uri: get_file + item.mes_alarm_picture }} style={{ borderRadius: 5, width: 120, height: 70, backgroundColor: 'rgba(0,0,0,0.2)' }} />
											<Text style={{ height: 30, lineHeight: 30, textAlign: 'center', fontSize: 16 }}>{item.mes_alarm_name}</Text>

											<View style={{
												borderRadius: 5,
												width: 120,
												height: 70,
												backgroundColor: color,
												position: 'absolute',
												top: 5,
												alignItems: 'center',
												justifyContent: 'center'
											}}>
												{item.business_status === 1 && <Fdicon name='xiaoxi1' size={50} color='red'></Fdicon>}
											</View>

										</TouchableOpacity>
									)
								})
							} else {
								return <View style={{ flex: 1 }}>
									<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
										<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
										<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
									</View>
								</View>
							}
						})()}
					</View>
				</View>
			</View>
			<MessageBox args={message_box.args} title="提交安灯报警" visible={message_box.index === 1} toConfirm={(args) => {
				set_message_box({
					index: 2,
					args: {
						...args,
						_index: 1
					}
				})
			}} toCencel={() => set_message_box({ index: 0, args: null })}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', flexWrap: 'nowrap' }}>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>可用设备代码：</Text>
					<Picker selectedValue={equipment_list.length > 0 ? equipment_list[selectedValue].mes_id : ''} onValueChange={(_, itemIndex) => setSelectedValue(itemIndex)} style={{ height: 35, width: 250 }} >
						{
							equipment_list.map((item, index) => {
								return <Picker.Item label={item.mes_device_name} key={index} value={item.mes_id} />
							})
						}
					</Picker>
				</View>
			</MessageBox>


			{/* 全展示效果 */}
			{/* <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}>
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

			<MessageBox args={message_box.args} title="验证" visible={message_box.index === 2} toConfirm={(args: { _index: number }) => {
				check(args)
			}} toCencel={(args: { _index: number }) => {
				set_message_box({ index: args._index, args: null })
			}}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
					<Picker selectedValue={card_type} onValueChange={(i) => set_card_type(i)} style={{ height: 35, width: 100 }} >
						{
							cards.map((item, index) => {
								return <Picker.Item label={item.name} key={index} value={item.flag} />
							})
						}
					</Picker>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>请刷卡验证登录</Text>
				</View>
			</MessageBox>

			<MessageBox args={message_box.args} title="提示" visible={message_box.index === 3} toConfirm={(args) => {
				set_message_box({
					index: 2,
					args: {
						...args,
						_index: 3
					}
				})
			}} toCencel={() => set_message_box({ index: 0, args: null })}>
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
					<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>是否解除安灯报警？</Text>
				</View>
			</MessageBox>

		</ScrollView >
	);
}
