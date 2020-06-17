import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { get_file } from '../atom/config';
import { format } from '../atom/dt';
import Fdicon from '../atom/icon';
import { get } from '../atom/storage'
import { useresoplist } from './api';
import { Iuseresoplis } from './interface';

export default () => {
	const [states, set_states] = useState({
		useresoplist: {} as Iuseresoplis,
		mes_staff_name: '',
		mes_staff_code: '',
		file_names: '',
		state_esop: 0,
		recovery_time: 0,
		mes_valid_status: 0
	})

	useEffect(() => {
		// setTimeout(() => {
		// 	local.source = ''
		// }, end_time - new Date().getTime());
		(async () => {
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			const useresoplist_res = await useresoplist(mes_staff_code, mes_staff_name)
			console.log('useresoplist_res122222', useresoplist_res)
			set_states({
				...states,
				useresoplist: useresoplist_res.data,
				file_names: get_file + useresoplist_res.data.file_name,
				recovery_time: useresoplist_res.data.recovery_time
			})
			// local.source = 'http://192.168.1.238/soft/node.pdf'
			// const end_time = new Date().getTime() + 2000
			// local.end_time = end_time
		})()

	}, []);
	return (
		<View>
			{(() => {
				if (states.file_names) {
					return <Pdf
						scale={2}
						minScale={1.0}
						maxScale={5.0}
						horizontal={false}
						source={{ uri: states.file_names }}
						onLoadComplete={(numberOfPages, filePath) => {
							// 加载完成回调
							// Alert.alert(`number of pages: ${numberOfPages}`);
						}}
						onPageChanged={(page, numberOfPages) => {
							// 翻页回调
							// Alert.alert(`current page: ${page}`);
						}}
						onError={(error) => {
							set_states({
								...states,
								file_names: '',
								state_esop: 1
							})
						}}
						style={styles.pdf} />
				} else {
					return <View style={{ backgroundColor: '#fff', height: '100%' }}>
						<View style={{ flexDirection: 'column', alignItems: 'center', marginTop: '20%' }}>
							<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
							<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>{states.state_esop === 0 ? '暂无数据' : '文件地址无效'}~</Text>
						</View>
					</View>
				}
			})()}
		</View>
	);
}

const styles = StyleSheet.create({
	pdf: {
		width: '100%',
		height: '100%'
	}
});