import React from 'react';
import { Image, Text, View } from 'react-native';

export default () => {
	return (
		<View style={{ flexDirection: 'row', flex: 1, marginTop: 10, backgroundColor: '#fff' }}>
			<View style={{ flex: 0.2 }}>
				<View style={{
					height: 45, backgroundColor: '#fff'
				}}>
					<Text style={{ lineHeight: 45, textAlign: 'center' }}>报警代码列表</Text>
				</View>
				<View>
					<View style={{ height: 45, borderWidth: 1, borderRadius: 10, borderColor: '#999', margin: 10, marginBottom: 0, backgroundColor: '#fff' }}>
						<Text style={{ lineHeight: 45, textAlign: 'center' }}>安灯报警代码</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 0.1 }}></View>
			<View style={{ flex: 0.7 }}>
				<View style={{ height: 45, backgroundColor: '#fff' }}><Text style={{ lineHeight: 45, textAlign: 'center' }}>报警代码详情</Text></View>
				<View>
					<View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 1, borderColor: '#999', justifyContent: 'space-around', borderRadius: 10, height: 110, width: '25%', backgroundColor: '#fff' }}>
						<View style={{ height: 70, width: 110 }}>
							<Image source={require('../../imgs/science5.png')} style={{ width: '100%', height: 70 }} />
						</View>
						<Text style={{ height: 30, lineHeight: 30, textAlign: 'center' }}>水泵是否正常</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
