import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import { Button } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fdicon from '../atom/icon';
import SetDistribution from './components/set-distribution'
interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void
}

export default (prop: IProp) => {
	const [visible, sets_visible] = useState(false)
	const tableHead = ['业务级参数代码', '业务级参数名称', '业务级参数说明', '业务级参数类型', '创建时间', '当前值', '下发值', '操作'];
	const tableData = [
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['1', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['2', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取'],
		['3', '设备1202-设备电流', '设备1202-设备电流', '数值', '2020-02-02 17:58', '0.5', '11111', '读取']
	];

	function alertIndex(data: number) {
		sets_visible(true)
	}

	function element(data: string, index: number, cellIndex: number) {
		if (cellIndex === 6) {
			return (
				<TouchableOpacity onPress={() => alertIndex(index)} >
					<View style={{ borderWidth: 1, borderColor: '#999', flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, width: '70%', marginLeft: '15%' }}>
						<Text style={{ lineHeight: 40, fontSize: 16, color: '#333' }}>下发值</Text>
						<Fdicon name='xiangqing' size={22} color='#242c3a'></Fdicon>
					</View>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity >
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 45, justifyContent: 'space-around' }}>
						<Button onPress={() => alertIndex(index)} info>
							<Text style={{ padding: 25, color: '#fff', fontSize: 16 }}>读 取</Text>
						</Button>
						<Button onPress={() => alertIndex(index)} info>
							<Text style={{ padding: 25, color: '#fff', fontSize: 16 }}>下 发</Text>
						</Button>
					</View >
				</TouchableOpacity >
			);
		}
	}

	return (

		<View style={{ padding: 16, paddingTop: 30, backgroundColor: '#fff' }}>
			<Table>
				<Row data={tableHead} style={styles.head} textStyle={styles.text} />
				<ScrollView style={{ marginBottom: '6.2%' }}>
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
				</ScrollView>
			</Table>
			<SetDistribution visible={visible} id={''} toHide={() => {
				sets_visible(false)
			}} />
		</View>

	);
}

const styles = StyleSheet.create({
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center', fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff', backgroundColor: '#fff' }
});
