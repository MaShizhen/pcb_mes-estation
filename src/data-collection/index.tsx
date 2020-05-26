import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

export default class ExampleFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['设备编号', '设备名称', '设备图片', '设备说明', '所属工序', '有效状态', '审核状态', '创建时间'],
			tableData: [
				['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
				['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
				['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301'],
				['gx001', '钻机-DEV1301', '图片', '4', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301', '钻机-DEV1301']
			]
		}
	}

	_alertIndex(index) {
		Alert.alert(`This is row ${index + 1}`);
	}

	render() {
		const state = this.state;
		const element = (data, index) => (
			<TouchableOpacity onPress={() => this._alertIndex(index)} style={{ alignItems: 'center' }}>
				<Image style={{ width: '80%', height: 40 }} source={require('../../imgs/science5.png')} />
			</TouchableOpacity>
		);

		return (
			<ScrollView>
				<View style={styles.container}>
					<Table >
						<Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
						{
							state.tableData.map((rowData, index) => (
								<TouchableOpacity onPress={() => this._alertIndex(index)} style={{ borderBottomWidth: 1, borderColor: '#c8e1ff' }}>
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
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center' },
	row: { height: 60, flexDirection: 'row' }
});
