import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'uuid'
import { mqtt } from '../atom/config'
import { format } from '../atom/dt'
import Fdicon from '../atom/icon';
import loading from '../atom/loading';
import { listen, unsubscribe } from '../atom/mqtt'
import { collectioninfo, eboxdataread } from './api';
import SetDistribution from './components/set-distribution';
import { IMqttRespose } from './interface'

interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void,
	route: {
		params: {
			data: {
				arr: string[];
				mes_id: string;
			}
		}
	}
}

export default (prop: IProp) => {

	const [states, set_states] = useState({
		collectioninfo: [] as (string | string[])[][],
		visible: false as boolean,
		select_index: null as number,
		page_num: 1
	})
	// 初始化查询报警代码列表
	useEffect(() => {
		(async () => {
			const load = await loading()
			const collectioninfo_res = await collectioninfo(prop.route.params.data.mes_id, states.page_num)
			set_states({
				...states,
				collectioninfo: collectioninfo_res.data.list.reduce((p, item) => {
					p.push([
						item.mes_devicesub_bparamcode,
						item.mes_devicesub_bparamname,
						item.mes_devicesub_bparamdesc,
						item.mes_paramgroups_activity,
						format(item.mes_create_date, 'YYYY-MM-DD'),
						'',
						'',
						[item.mes_devicesub_deviceid, item.mes_devicesub_cparamid, item.mes_paramgroups_type.toString()]
					]);
					return p
				}, states.collectioninfo)
			})
			await load.destroy()
		})()
	}, [states.page_num]);

	const tableHead = ['业务级参数代码', '业务级参数名称', '业务级参数说明', '业务级参数类型', '创建时间', '当前值', '下发值', '操作'];

	function alertIndex(index: number) {
		set_states({
			...states,
			select_index: index,
			visible: true
		})
	}

	function read(index: number) {
		const data = states.collectioninfo[index]
		const arr = data[7]
		const mes_devicesub_deviceid = arr[0] as string
		const mes_devicesub_cparamid = arr[1] as string
		const request = uuid();

		const topic = '/push/' + request
		listen(mqtt, topic).then(async (res: IMqttRespose) => {
			await unsubscribe(mqtt, topic)
			const _collectioninfo = states.collectioninfo
			_collectioninfo[index][5] = res.msg.datavalue[0].readvalue
			set_states({
				...states,
				collectioninfo: _collectioninfo
			})
		})

		eboxdataread(request, mes_devicesub_deviceid, mes_devicesub_cparamid).then(() => {
		})
	}

	function element(index: number, cellIndex: number, cellData: string) {
		if (cellIndex === 6) {
			return (
				<TouchableOpacity onPress={() => alertIndex(index)} >
					<View style={{ borderWidth: 1, borderColor: '#999', flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, width: '70%', marginLeft: '15%' }}>
						<Text style={{ lineHeight: 40, fontSize: 16, color: '#333' }}>{cellData}</Text>
						<Fdicon name='xiangqing' size={22} color='#242c3a'></Fdicon>
					</View>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity >
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 45, justifyContent: 'space-around' }}>
						<Button onPress={() => read(index)} info>
							<Text style={{ padding: 25, color: '#fff', fontSize: 16 }}>读 取</Text>
						</Button>
					</View >
				</TouchableOpacity >
			);
		}
	}

	return (

		<View style={{ padding: 16, paddingTop: 30, backgroundColor: '#fff', flex: 1 }}>
			<Table>
				<Row data={tableHead} style={styles.head} textStyle={styles.text} />
				{(() => {
					if (states.collectioninfo.length > 0) {
						return <FlatList
							data={states.collectioninfo}
							style={{ marginBottom: '6.2%' }}
							onEndReached={() => {
								set_states({
									...states,
									page_num: states.page_num + 1
								})
							}}
							keyExtractor={(_, index) => {
								return index.toString()
							}}
							onEndReachedThreshold={0.1}
							renderItem={({ item, index }) => {
								return <TableWrapper key={index} style={styles.row}>
									{
										item.map((cellData: string, cellIndex) => {
											return (
												<Cell key={cellIndex} data={(cellIndex === 6 || cellIndex === 7) ? element(index, cellIndex, cellData) : cellData} textStyle={styles.text} />
											)
										})
									}
								</TableWrapper>
							}}>
						</FlatList>
					} else {
						return <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: '20%' }}>
							<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
							<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
						</View>
					}
				})()}
				{/* <ScrollView style={{}}>
					{(() => {
						if (states.collectioninfo.length > 0) {
							return states.collectioninfo.map((rowData, index) => (
								<TableWrapper key={index} style={styles.row}>
									{
										rowData.map((cellData: string, cellIndex) => (
											<Cell key={cellIndex} data={(cellIndex === 6 || cellIndex === 7) ? element(index, cellIndex, cellData) : cellData} textStyle={styles.text} />
										))
									}
								</TableWrapper>
							))
						} else {
							return <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: '20%' }}>
								<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
								<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>暂无数据~</Text>
							</View>
						}
					})()}
				</ScrollView> */}
			</Table>
			<SetDistribution visible={states.visible} row={{
				params: prop.route.params.data.arr,
				mes_id: prop.route.params.data.mes_id,
				arr: states.collectioninfo[states.select_index],
				select_index: states.select_index
			}} toHide={(select_index: number, writevalue: string) => {
				if (select_index !== -1) {
					const _collectioninfo = states.collectioninfo
					_collectioninfo[select_index][6] = writevalue
					set_states({
						...states,
						collectioninfo: _collectioninfo,
						visible: false
					})
				} else {
					set_states({
						...states,
						visible: false
					})
				}
			}} />
		</View>

	);
}

const styles = StyleSheet.create({
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center', fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff', backgroundColor: '#fff' }
});
