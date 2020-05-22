import React from 'react';
import { Text, View, Image } from 'react-native';

export default () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ flex: 0.3, borderWidth: 1 }}>
				<View style={{ height: 45 }}><Text style={{ lineHeight: 45, textAlign: 'center' }}>报警代码列表</Text></View>
				<View>
					<View style={{ height: 35, borderWidth: 1, borderRadius: 10, borderColor: '#999', marginTop: 10 }}>
						<Text style={{ lineHeight: 35, textAlign: 'center' }}>安灯报警代码</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 0.7, borderWidth: 1 }}>
				<View style={{ height: 45 }}><Text style={{ lineHeight: 45, textAlign: 'center' }}>报警代码详情</Text></View>
				<View>
					<Image source={require('../../imgs/science5.png')} />
					<Text>水泵是否正常</Text>
				</View>
			</View>
		</View>
	);
}
