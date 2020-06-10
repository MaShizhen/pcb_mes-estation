import { Button } from 'native-base';
import React from 'react';
import { Alert, Modal, Picker, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
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
				<View style={{ margin: 50, backgroundColor: '#fff', borderRadius: 5 }}>
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: '#999' }}>
						<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 35 }}>提交安灯报警</Text>
						<Fdicon name='guanbi' size={16} color='#333'></Fdicon>
					</View>
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
						<Text style={{ fontSize: 16, color: '#333333', textAlign: 'center', lineHeight: 80 }}>可用设备代码：</Text>
						<Picker
							style={{ height: 35, width: 100 }} >
							<Picker.Item label="java" value="java" />
							<Picker.Item label="JavaScript" value="js" />
						</Picker>
					</View>
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
						<TouchableOpacity style={{ borderBottomLeftRadius: 5, height: 40, flex: 1 }}>
							<Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 40, color: '#333' }}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#0099ff', height: 40, flex: 1 }}>
							<Text style={{ fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 40 }}>提交</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</Modal >

	);
}

const styles = StyleSheet.create({
	max: { backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'red', flex: 1 },
	container: { backgroundColor: '#fff', width: 400 },
	head: { height: 60, backgroundColor: '#f1f8ff', textAlign: 'center' },
	text: { width: 150, textAlign: 'right', lineHeight: 45, fontSize: 16, color: '#333' },
	row: { height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#c8e1ff' },
	out: { flexDirection: 'row', alignItems: 'center', height: 45 },
	mintext: { width: 150, paddingLeft: 5, fontSize: 16, color: '#333' },
	input: { borderColor: '#999', borderWidth: 1, width: 150, lineHeight: 45, padding: 0, marginLeft: 5 }
});