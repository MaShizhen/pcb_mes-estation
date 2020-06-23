// import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { get_file } from '../atom/config';
import Fdicon from '../atom/icon';
import loading from '../atom/loading';
import { get, set } from '../atom/storage'
import useSession from '../atom/useSession'
// import toast from '../atom/toast'
import { useresoplist } from './api';
import { Iuseresoplis } from './interface';

export default () => {
	const [session] = useSession()
	console.log(session)
	const [states, set_states] = useState({
		useresoplist: {} as Iuseresoplis,
		mes_staff_name: '',
		mes_staff_code: '',
		file_names: '',
		state_esop: 0,
		recovery_time: 0,
		mes_valid_status: 0,
		currentPage: 0,
		file_address: '',
		next: ''
	})

	useEffect(() => {
		// setTimeout(() => {
		// 	local.source = ''
		// }, end_time - new Date().getTime());
		(async () => {
			console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', states.file_address);
			const load = await loading()
			const mes_staff_code = await get<string>('mes_staff_code')
			const mes_staff_name = await get<string>('mes_staff_name')
			const useresoplist_res = await useresoplist(mes_staff_code, mes_staff_name)
			const page = await get<string>('page')
			if (useresoplist_res.data.length > 0) {
				set_states({
					...states,
					useresoplist: useresoplist_res.data[1],
					file_names: useresoplist_res.data[1].file_name,
					recovery_time: useresoplist_res.data[1].recovery_time,
					file_address: get_file + useresoplist_res.data[1].file_address,
					currentPage: Number(page),
					next: useresoplist_res.data[1] ? useresoplist_res.data[1].file_name : ''
				})
				console.log(useresoplist_res)
				const weitime = useresoplist_res.data[0].recovery_time - new Date().getTime()
				if (weitime <= 180000) {
					Alert.alert('error', `本文件将于${useresoplist_res.data[0].recovery_time}到期！！接替文件为${useresoplist_res.data[1].file_name}`)
					setTimeout(() => {
						set_states({
							...states,
							file_address: '',
							state_esop: 1
						})
					}, 180000)
				}
			}

			await load.destroy()
		})()

	}, [states.file_address, session]);
	return (
		<View>
			{(() => {
				if (states.file_names) {
					return <Pdf
						scale={2}
						minScale={1.0}
						maxScale={5.0}
						horizontal={false}
						source={{ uri: states.file_address }}
						page={states.currentPage}
						onLoadComplete={(numberOfPages, filePath) => {
							// 加载完成回调
							// Alert.alert(`number of pages: ${numberOfPages}`);
						}}
						onPageChanged={async (page, numberOfPages) => {
							// 翻页回调
							await set('paage', page)
							console.log(page)
							// states.recovery_time
							if (states.recovery_time <= new Date().getTime()) {

								set_states({
									...states,
									file_address: '',
									state_esop: 1
								})
							}
							console.log(states.file_names, states.file_names.split('id=')[2])
							// Alert.alert(`current page: ${page}`);
						}}
						onError={(error) => {
							set_states({
								...states,
								file_address: '',
								state_esop: 1
							})
						}}
						style={styles.pdf} />
				} else {
					return <View style={{ backgroundColor: '#fff', height: '100%' }}>
						<View style={{ flexDirection: 'column', alignItems: 'center', marginTop: '20%' }}>
							<Fdicon name='wushuju' size={60} color='#999'></Fdicon>
							<Text style={{ fontSize: 18, textAlign: 'center', color: '#999' }}>{states.state_esop === 0 ? JSON.stringify(session) : '文件地址无效'}~</Text>
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