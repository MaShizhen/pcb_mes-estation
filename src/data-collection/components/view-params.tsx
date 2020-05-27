import React from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, StyleSheet, ScrollView } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

interface IProp {
	visible: boolean;
	id: string;
	onHide: () => void
}

export default (prop: IProp) => {
	const tableHead = ['业务级参数代码', '业务级参数名称', '业务级参数说明', '业务级参数类型', '创建时间', '当前值', '下发值', '操作'];
	const tableData = [
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['a', 'b', 'c', 'd']
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
				<ScrollView>
					<View style={styles.container}>
						<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
							<TouchableHighlight
								onPress={() => prop.onHide()}
								style={{ width: 150, height: 40 }}
								underlayColor='transparent'>
								<Text style={{ fontSize: 25, color: '#c8e1ff', textAlign: 'right', lineHeight: 40 }}>关闭</Text>
							</TouchableHighlight>
						</View>
						<Table style={{}}>
							<Row data={tableHead} style={styles.head} textStyle={styles.text} />
							<Rows data={tableData} textStyle={styles.text} style={styles.row} />
						</Table>
					</View>
				</ScrollView>
			</View>


		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: "center", flexDirection: 'row', justifyContent: 'center' },
	container: { backgroundColor: '#fff', margin: 20, minHeight: 200, padding: 15 },
	head: { height: 60, backgroundColor: '#f1f8ff' },
	row: { height: 60, backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: '#f1f8ff' },
	text: { margin: 6, textAlign: 'center' }
});
