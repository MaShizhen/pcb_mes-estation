import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from '../atom/dt';
import Fdicon from '../atom/icon';
import { get } from '../atom/storage'
import { collectionlist } from './api';

export default () => {
	const navigation = useNavigation();
	const [states, set_states] = useState({
		collectionlist: [] as {
			arr: string[]
			mes_id: string
		}[]
	})

	// 初始化查询报警代码列表
	useEffect(() => {
		(async () => {
			const mes_id = await get<string>('mes_id')
			const collectionlist_res = await collectionlist('mes_id', '')
			console.log('collectionlist_res', collectionlist_res)
			set_states({
				...states,
				collectionlist: collectionlist_res.data.list.map((item) => {
					return {
						arr: [
							item.mes_device_code,
							item.mes_device_name,
							item.mes_device_logo,
							item.mes_device_desc,
							item.mes_valid_status.toString(),
							item.mes_audit_status,
							format(item.mes_create_date, 'YYYY-MM-DD')
						],
						mes_id: item.mes_id
					}
				})
			})
		})()
	}, []);

	useFocusEffect(() => {
	})

	const tableHead = ['设备编号', '设备名称', '设备图片', '设备说明', '有效状态', '审核状态', '创建时间']

	function _alertIndex(index: number) {
		const data = states.collectionlist[index]
		navigation.navigate('view_params', {
			data
		})
	}

	function element(data: string | number, index: number) {
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
						{(() => {
							if (states.collectionlist.length > 0) {
								return states.collectionlist.map((rowData, index) => {
									return <TouchableOpacity key={index} onPress={() => _alertIndex(index)} style={{ borderBottomWidth: 1, borderColor: '#c8e1ff' }}>
										<TableWrapper style={styles.row}>
											{
												rowData.arr.map((cellData, cellIndex) => {
													return <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text} />
												})
											}
										</TableWrapper>
									</TouchableOpacity>
								})
							} else {
								return <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: '20%' }}>
									<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
									<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
								</View>
							}
						})()}
					</ScrollView>
				</Table>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center', fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row' }
});
