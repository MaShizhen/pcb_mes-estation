import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import { useNavigation } from '@react-navigation/native'
import { Container } from 'native-base';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default () => {
	const navigation = useNavigation();

	const tableHead = ['设备编号', '设备名称', '设备图片', '设备说明', '所属工序', '有效状态', '审核状态', '创建时间']
	const tableData = [
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx002', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
		['gx003', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301']
	]

	function _alertIndex(data: number) {
		navigation.navigate('view_params')
	}

	function element(data: string, index: number) {
		return (
			<TouchableOpacity onPress={() => _alertIndex(index)} style={{ alignItems: 'center' }}>
				<Image style={{ width: '50%', height: 40 }} source={require('../../imgs/science5.png')} />
			</TouchableOpacity>
		);
	}

	return (

		<Container>
			<View style={styles.container}>
				<Table >
					<Row data={tableHead} style={styles.head} textStyle={styles.text} />
					<ScrollView style={{ marginBottom: '2.8%' }}>
						{
							tableData.map((rowData, index) => (
								<TouchableOpacity key={index} onPress={() => _alertIndex(index)} style={{ borderBottomWidth: 1, borderColor: '#c8e1ff' }}>
									<TableWrapper style={styles.row}>
										{
											rowData.map((cellData, cellIndex) => (
												<Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text} />
											))
										}
									</TableWrapper>
								</TouchableOpacity>
							))
						}
					</ScrollView>
				</Table>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center' },
	row: { height: 60, flexDirection: 'row' }
});
