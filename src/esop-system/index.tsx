import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
// import uselocal from '../atom/local'

export default () => {

	// const local = uselocal({
	// 	title: '2222'
	// })


	const source = { uri: 'http://192.168.1.238/soft/node.pdf', cache: false };

	return (
		<View>
			<Pdf
				scale={1}
				minScale={1.0}
				maxScale={5.0}
				horizontal={false}
				source={source}
				onLoadComplete={(numberOfPages, filePath) => {
					Alert.alert(`number of pages: ${numberOfPages}`);
				}}
				onPageChanged={(page, numberOfPages) => {
					Alert.alert(`current page: ${page}`);
				}}
				onError={(error) => {
					Alert.alert(`Error: ${error}`);

				}}
				style={styles.pdf} />
		</View>
	);
}

const styles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: '100%',
		height: '100%'
	}
});