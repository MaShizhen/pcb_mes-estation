import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import uuid from 'uuid'
import { mqtt } from '../../atom/config';
import Fdicon from '../../atom/icon';
import { listen, unsubscribe } from '../../atom/mqtt';
import toast from '../../atom/toast'
import { eboxdatawrite } from '../api';
import { IMqttRespose } from '../interface'

interface IProp {
	visible: boolean;
	row: {
		params: string[],
		arr: (string | string[])[],
		select_index: number,
		mes_id: string;
	};
	toHide: (select_index: number, writevalue: string) => void
}

export default (prop: IProp) => {
	const [value, onChangeText] = useState('');

	// 显示的时候清空输入框
	useFocusEffect(
		useCallback(() => {
			onChangeText('')
			return
		}, [])
	)

	function issue() {
		if (!value) {
			return toast('warning', '请输入修改值');
		} else {
			const arr = prop.row.arr[7]
			const mes_devicesub_deviceid = arr[0] as string
			const mes_devicesub_cparamid = arr[1] as string
			const request = uuid();

			const topic = '/push/' + request
			listen(mqtt, topic).then(async (res: IMqttRespose) => {
				await unsubscribe(mqtt, topic)
				prop.toHide(prop.row.select_index, res.msg.datavalue[0].writevalue)
				return toast('success', '下发成功');
			})

			eboxdatawrite(request, mes_devicesub_deviceid, mes_devicesub_cparamid, value).then(() => {
			})
		}
	}

	return (
		<Modal
			animationType={"fade"}
			transparent={true}
			visible={prop.visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			<TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center' }} onPress={() => {
				prop.toHide(-1, '')
			}}>
				<TouchableOpacity
					activeOpacity={1}
					style={{ backgroundColor: '#fff', width: '40%', marginLeft: '35%', borderRadius: 5 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, borderBottomColor: '#999' }}>
						<Text style={{ fontSize: 18, color: '#333' }}>设定下发值</Text>
						<TouchableHighlight
							style={{ padding: 13 }}
							onPress={() => prop.toHide(-1, '')}
							underlayColor='transparent'>
							<Fdicon name='guanbi' size={20} color='#333'></Fdicon>
						</TouchableHighlight>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>设备代码:</Text>
						<Text style={styles.mintext}>{prop.row ? prop.row.params[0] : ''}</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>设备名称:</Text>
						<Text style={styles.mintext}>{prop.row ? prop.row.params[1] : ''}</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>业务级参数代码:</Text>
						<Text style={styles.mintext}>{(prop.row && prop.row.arr) ? prop.row.arr[0] : ''}</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>业务级参数名称:</Text>
						<Text style={styles.mintext}>{(prop.row && prop.row.arr) ? prop.row.arr[1] : ''}</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>当前值:</Text>
						<Text style={styles.mintext}>{(prop.row && prop.row.arr) ? prop.row.arr[5] : ''}</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>修改值:{value}</Text>
						<TextInput onChangeText={text => {
							onChangeText(text)
						}} value={value} style={styles.input}></TextInput>
					</View>
					{/* <View style={{ height: 35, width: 100, backgroundColor: '#c8e1ff', position: 'relative', left: 180, top: 10, marginBottom: 10 }}>
						<Text style={{ lineHeight: 35, textAlign: 'center' }}>下发</Text>
					</View> */}
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 40, marginRight: 40, marginTop: 20 }}>
						<Button onPress={() => issue()} block info style={{ width: 150 }}>
							<Text style={{ color: '#fff', fontSize: 16 }}>下 发</Text>
						</Button>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal >

	);
}

const styles = StyleSheet.create({
	container: { backgroundColor: '#fff', width: 400 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { width: 150, textAlign: 'right', lineHeight: 45, fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' },
	out: { flexDirection: 'row', alignItems: 'center', height: 45 },
	mintext: { paddingLeft: 5, fontSize: 16, color: '#333', flex: 0.8 },
	input: { borderColor: '#999', borderWidth: 1, flex: 0.5, marginLeft: 5 }
});