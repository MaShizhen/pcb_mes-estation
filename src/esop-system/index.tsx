import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import uselocal from '../atom/use-local'

export default () => {
	const local = uselocal({
		source: '',
		end_time: 0
	})

	useEffect(() => {
		local.source = 'http://192.168.1.238/soft/node.pdf'
		const end_time = new Date().getTime() + 2000
		local.end_time = end_time

		setTimeout(() => {
			local.source = ''
		}, end_time - new Date().getTime());

	}, []);

	return (
		<View>
			<View>
				<Text>版本：{JSON.stringify(local)}</Text>
				<Button title='test' onPress={() => {
					// console.log(local.source)
				}}></Button>
			</View>
			{(() => {
				if (local.source) {
					return <Pdf
						scale={2}
						minScale={1.0}
						maxScale={5.0}
						horizontal={false}
						source={{ uri: local.source }}
						onLoadComplete={(numberOfPages, filePath) => {
							// 加载完成回调
							// Alert.alert(`number of pages: ${numberOfPages}`);
						}}
						onPageChanged={(page, numberOfPages) => {
							// 翻页回调
							// Alert.alert(`current page: ${page}`);
						}}
						onError={(error) => {
							// Alert.alert(`Error: ${error}`);
						}}
						style={styles.pdf} />
				} else {
					return <Text>没有数据</Text>
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