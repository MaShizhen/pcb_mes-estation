import React from 'react';
import { Alert, Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Fdicon from './icon';

interface IProp {
	/**
	 * 显示
	 */
	visible: boolean;
	/**
	 * 标题
	 */
	title?: string;
	/**
	 * 附加参数
	 */
	args?: object;
	/**
	 * 弹唱取消
	 */
	toCencel: (args: object) => void;
	/**
	 * 弹窗确认
	 */
	toConfirm: (args: object) => void;
	/**
	 * 组件子节点
	 */
	children: Element;
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
				prop.toCencel(prop.args)
			}}>
				<TouchableOpacity
					activeOpacity={1}
					style={{ backgroundColor: '#fff', width: '30%', marginLeft: '35%', borderRadius: 5 }}>
					{(() => {
						if (prop.title) {
							return <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, borderBottomColor: '#999' }}>
								<Text style={{ fontSize: 18, color: '#333' }}>{prop.title}</Text>
								<TouchableHighlight
									style={{ padding: 13 }}
									onPress={() => prop.toCencel(prop.args)}
									underlayColor='transparent'>
									<Fdicon name='guanbi' size={20} color='#333'></Fdicon>
								</TouchableHighlight>
							</View>
						}
					})()}
					{prop.children}
					<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f2f2f2' }}>
						<TouchableOpacity style={{ borderBottomLeftRadius: 5, height: 60, flex: 1 }} onPress={() => prop.toCencel(prop.args)}>
							<Text style={{ fontSize: 16, textAlign: 'center', lineHeight: 60, color: '#333' }}>取消</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#0099ff', height: 60, flex: 1 }} onPress={() => prop.toConfirm(prop.args)}>
							<Text style={{ fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 60 }}>确定</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal >
	);
}
