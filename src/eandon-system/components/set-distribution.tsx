import React, { useEffect, useState } from 'react';
import { Alert, Modal, Picker, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Fdicon from '../../atom/icon';
import { get, set } from '../../atom/storage'
import { equipmentlist } from '../../home/api';
import { IEquipmentList } from '../../home/interface'
interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void
}

export default (prop: IProp) => {
	const [states, set_states] = useState({
		equipmentlist: [] as IEquipmentList[],
		mes_process_code: '', // 工序编号
		mes_process_name: '', // 工序名称
		mes_device_code: '',// 设备mes_id
		mes_id: '', // 员工名称
		mes_staff_name: '',
		mes_staff_code: '',
		focused_index: 0 as number
	})

	// 头部设备下拉数据
	useEffect(() => {
		(async () => {
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			// const mes_ids = await get<string>('mes_ids')
			const equipmentlist_res = await equipmentlist(mes_staff_code, mes_staff_name)
			set_states({
				...states,
				equipmentlist: equipmentlist_res.data.sub
			})
		})()

	}, []);


	return (
		<Modal
			animationType={"fade"}
			transparent={true}
			visible={prop.visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			<TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
				prop.toHide()
			}}>
				<TouchableOpacity
					activeOpacity={1}
					style={{ backgroundColor: '#fff', width: '30%', marginLeft: '35%', borderRadius: 5 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, borderBottomColor: '#999' }}>
						<Text style={{ fontSize: 18, color: '#333' }}>提交安灯报警</Text>
						<TouchableHighlight
							style={{ padding: 13 }}
							onPress={() => prop.toHide()}
							underlayColor='transparent'>
							<Fdicon name='guanbi' size={20} color='#333'></Fdicon>
						</TouchableHighlight>
					</View>
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
						<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 150 }}>可用设备代码：</Text>
						<Picker
							style={{ height: 35, width: 250 }} >
							{
								states.equipmentlist.map((item, index) => {
									return <Picker.Item label={item.mes_device_name} key={index} value={item.mes_device_code} />
								})
							}
						</Picker>
					</View>
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
						<TouchableOpacity style={{ borderBottomLeftRadius: 5, height: 50, flex: 1 }}>
							<Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 50, color: '#333' }}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#0099ff', height: 50, flex: 1 }}>
							<Text style={{ fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 50 }}>提交</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal >
	);
}

const styles = StyleSheet.create({
	max: { backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'red', flex: 1 },
	container: { backgroundColor: '#fff', width: 400 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { width: 150, textAlign: 'right', lineHeight: 45, fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' },
	out: { flexDirection: 'row', alignItems: 'center', height: 45 },
	mintext: { width: 150, paddingLeft: 5, fontSize: 16, color: '#333' },
	input: { borderColor: '#999', borderWidth: 1, width: 150, lineHeight: 45, padding: 0, marginLeft: 5 }
});