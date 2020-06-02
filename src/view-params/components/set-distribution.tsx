import { Button } from 'native-base';
import React from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Fdicon from '../../atom/icon';
interface IProp {
	visible: boolean;
	id: string;
	toHide: () => void
}

export default (prop: IProp) => {
	return (
		<Modal
			animationType={"fade"}
			transparent={true}
			visible={prop.visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			<TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
				prop.toHide()
			}}>
				<View style={{ backgroundColor: '#fff', width: '40%', marginLeft: '30%' }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, borderBottomColor: '#999' }}>
						<Text style={{ fontSize: 16 }}>设定下发值</Text>
						<TouchableHighlight
							style={{ borderWidth: 1, padding: 13 }}
							onPress={() => prop.toHide()}
							underlayColor='transparent'>
							<Fdicon name='guanbi' size={20} color='#242c3a'></Fdicon>
						</TouchableHighlight>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>设备代码:</Text>
						<Text style={styles.mintext}>gx001</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>设备名称:</Text>
						<Text style={styles.mintext}>gx001</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>业务级参数代码:</Text>
						<Text style={styles.mintext}>gx001</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>业务级参数名称:</Text>
						<Text style={styles.mintext}>gx001</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>当前值:</Text>
						<Text style={styles.mintext}>gx001</Text>
					</View>
					<View style={styles.out}>
						<Text style={styles.text}>修改值:</Text>
						<TextInput style={styles.input}></TextInput>
					</View>
					{/* <View style={{ height: 35, width: 100, backgroundColor: '#c8e1ff', position: 'relative', left: 180, top: 10, marginBottom: 10 }}>
						<Text style={{ lineHeight: 35, textAlign: 'center' }}>下发</Text>
					</View> */}
					<Button block info style={{ width: 150 }}>
						<Text>下发</Text>
					</Button>
				</View>
			</TouchableOpacity>
		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'red', flex: 1 },
	container: { backgroundColor: '#fff', width: 400 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { width: 110, textAlign: 'right', lineHeight: 35 },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' },
	out: { flexDirection: 'row', alignItems: 'center', height: 35 },
	mintext: { width: 150, paddingLeft: 5 },
	input: { borderColor: '#999', borderWidth: 1, width: 150, lineHeight: 35, padding: 0, marginLeft: 5 }
});