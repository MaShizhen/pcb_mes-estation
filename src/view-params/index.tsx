// import { ICollectionInfo } from './interface';
import { Cell, Row, Table, TableWrapper } from '@koimy/react-native-table-component';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'native-base';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format } from '../atom/dt'
import Fdicon from '../atom/icon';
import useStates from '../atom/use-states';
import { collectioninfo } from './api';
import SetDistribution from './components/set-distribution';

interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void
}

export default (prop: IProp) => {
	const states = useStates({
		collectioninfo: [] as string[][],
		visible: false as boolean
	})

	// 初始化查询报警代码列表
	useEffect(() => {
		(async () => {
			const collectioninfo_res = await collectioninfo('DEV020101')
			states.collectioninfo = collectioninfo_res.data.list.map((item) => {
				return [
					item.mes_devicesub_bparamcode,
					item.mes_devicesub_bparamname,
					item.mes_devicesub_bparamdesc,
					item.mes_paramgroups_activity,
					format(item.mes_create_date, 'YYYY-MM-DD'),
					'',
					item.mes_devicesub_mdetailid,
					item.mes_paramgroups_type.toString()

					// item.mes_devicesub_deviceid
					// item.mes_paramgroups_unitname

				];
			});
		})()
	}, []);

	useFocusEffect(() => {
	})

	const tableHead = ['业务级参数代码', '业务级参数名称', '业务级参数说明', '业务级参数类型', '创建时间', '当前值', '下发值', '操作'];

	function alertIndex(data: number) {
		states.visible = true
	}

	function element(data: string, index: number, cellIndex: number) {
		if (cellIndex === 6) {
			return (
				<TouchableOpacity onPress={() => alertIndex(index)} >
					<View style={{ borderWidth: 1, borderColor: '#999', flexDirection: 'row', alignItems: 'center', height: 40, justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, width: '70%', marginLeft: '15%' }}>
						<Text style={{ lineHeight: 40, fontSize: 16, color: '#333' }}></Text>
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
						states.collectioninfo.map((rowData, index) => (
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
			<SetDistribution visible={states.visible} id={''} toHide={() => {
				states.visible = false
			}} />
		</View>

	);
}

const styles = StyleSheet.create({
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { margin: 6, textAlign: 'center', fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff', backgroundColor: '#fff' }
});
