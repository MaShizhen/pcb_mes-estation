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
			<TouchableHighlight
				onPress={() => prop.onHide()}
				style={{ flex: 1 }}
				underlayColor='transparent'>
				<View style={styles.max}>
					<ScrollView >
						<View style={styles.container}>
							<Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
								<Row data={tableHead} style={styles.head} textStyle={styles.text} />
								<Rows data={tableData} textStyle={styles.text} style={styles.row} />
							</Table>
						</View>
					</ScrollView>
				</View>
			</TouchableHighlight>

		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: "center", flexDirection: 'row', justifyContent: 'center' },
	container: { padding: 16, backgroundColor: '#fff', margin: 20 },
	head: { height: 60, backgroundColor: '#f1f8ff' },
	row: { height: 60 },
	text: { margin: 6, textAlign: 'center' }
});
