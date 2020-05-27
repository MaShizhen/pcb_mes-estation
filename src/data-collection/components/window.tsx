import { Modal, Text, TouchableHighlight, TouchableOpacity, View, Alert, StyleSheet, ScrollView, TextInput } from "react-native";
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Fdicon from '../../atom/icon';
import React, { useState } from 'react';
interface IProp {
	visible: boolean;
	id: string;
	onHide: () => void
}

export default (prop: IProp) => {
	const [visible, sets_visible] = useState(false)
	const tableHead = ['业务级参数代码', '业务级参数名称', '业务级参数说明', '业务级参数类型', '创建时间', '当前值', '下发值', '操作'];
	const tableData = [
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
	];




	return (
		<Modal
			animationType={"fade"}
			transparent={true}
			visible={prop.visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			<View style={styles.max}>
				<View style={styles.container}>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>设备代码:</Text>
						<Text>gx001</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>设备名称:</Text>
						<Text>gx001</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>业务级参数代码:</Text>
						<Text>gx001</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>业务级参数名称:</Text>
						<Text>gx001</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>当前值:</Text>
						<Text>gx001</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 35 }}>
						<Text style={{ width: 180, textAlign: 'right', lineHeight: 35 }}>修改值:</Text>
						<TextInput style={{ borderColor: '#999', borderWidth: 1 }}></TextInput>
					</View>
					<View style={{ height: 35, width: 100 }}>
						<Text style={{ lineHeight: 35, textAlign: 'center' }}>下发</Text>
					</View>
				</View>
			</View>
		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'red', flex: 1 },
	container: { backgroundColor: '#fff', marginLeft: 80, marginRight: 100 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' }
});