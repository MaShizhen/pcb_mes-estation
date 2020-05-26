import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import ViewParams from './components/view-params'

export default () => {
	const [visible, set_visible] = useState(false)

	const tableHead = ['设备编号', '设备名称', '设备图片', '设备说明', '所属工序', '有效状态', '审核状态', '创建时间']
	const tableData = [
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301']
	]

	function _alertIndex(data: number) {
		set_visible(true)
	}

	function element(data: string, index: number) {
		return (
			<TouchableOpacity onPress={() => _alertIndex(index)} style={{ alignItems: 'center' }}>
				<Image style={{ width: '80%', height: 40 }} source={require('../../imgs/science5.png')} />
			</TouchableOpacity>
		);
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Table >
					<Row data={tableHead} style={styles.head} textStyle={styles.text} />
					{
						tableData.map((rowData, index) => (
							<TouchableOpacity onPress={() => _alertIndex(index)} style={{ borderBottomWidth: 1, borderColor: '#c8e1ff' }}>
								<TableWrapper key={index} style={styles.row}>
									{
										rowData.map((cellData, cellIndex) => (
											<Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text} />
										))
									}
								</TableWrapper>

							</TouchableOpacity>
						))
					}
				</Table>
			</View>
			<ViewParams visible={visible} id={''} onHide={() => {
				set_visible(false)
			}} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center' },
	row: { height: 60, flexDirection: 'row' }
});
