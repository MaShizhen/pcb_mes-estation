import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Fdicon from '../../atom/icon';
import SetDistribution from './set-distribution'
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
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取']
	];

	function alertIndex(data: number) {
		sets_visible(true)
	}

	function element(data: string, index: number, cellIndex: number) {
		if (cellIndex === 6) {
			return (
				<TouchableOpacity onPress={() => alertIndex(index)} >
					<View style={{ borderWidth: 1, borderColor: '#999', flexDirection: 'row', alignItems: 'center', height: 30, justifyContent: 'space-around' }}>
						<Text style={{ lineHeight: 30 }}>下发值</Text>
						<Fdicon name='xiangqing' size={20} color='#242c3a'></Fdicon>
					</View>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity >
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 30, justifyContent: 'center' }}>
						<TouchableOpacity>
							<Text style={{ color: '#5194d6' }}>读取</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={{ color: '#5194d6', paddingLeft: 5 }}>下发</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity >
			);
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
							{
								tableData.map((rowData, index) => (
									<TableWrapper key={index} style={styles.row}>
										{
											rowData.map((cellData, cellIndex) => (
												<Cell key={cellIndex} data={(cellIndex === 6 || cellIndex === 7) ? element(cellData, index, cellIndex) : cellData} textStyle={styles.text} />
											))
										}
									</TableWrapper>
								))
							}
						</Table>
					</View>
				</ScrollView>
			</View>
			<SetDistribution visible={visible} id={''} onHide={() => {
				sets_visible(false)
			}} />
		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { backgroundColor: 'rgba(0,0,0,0.5)' },
	container: { backgroundColor: '#fff', margin: 30, padding: 15 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' }
});
