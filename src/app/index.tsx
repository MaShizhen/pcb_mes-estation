import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList, } from 'react-native'
import Icon from '../atom/icon'

// 引入页面
import esop_system from '../esop-system'
import eandon_system from '../eandon-system'
import data_collection from '../data-collection'
import quality_management from '../quality-management'
import dashboard_system from '../dashboard-system'
import reporting_system from '../reporting-system'

const Stack = createStackNavigator();

export default function App() {
	const [focused_index, setFocused_index] = useState(0);
	const ref = React.useRef(null);

	const menus = [
		{
			title: 'menus',
			data: [{
				name: 'ESOP',
				path: 'esop_system',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'propertysafety',
				icon_focused: 'property-safety',
				focused: true
			}, {
				name: '安灯系统',
				path: 'eandon_system',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'dengpao',
				icon_focused: 'dengpao1',
				focused: false
			}, {
				name: '数据采录',
				path: 'data_collection',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'wenbenbianji',
				icon_focused: 'wenbenbianjitianchong',
				focused: false
			}, {
				name: '品质管理',
				path: 'quality_management',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'pinzhi',
				icon_focused: 'yiliaozhiliangfenxi',
				focused: false
			}, {
				name: '看板系统',
				path: 'dashboard_system',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'jiankongmianban',
				icon_focused: 'jiankongmianban-mianxing',
				focused: false
			}, {
				name: '报表系统',
				path: 'reporting_system',
				backgroundColor: '#fff',
				color: '#fff',
				icon: 'tubiao',
				icon_focused: 'tubiao1',
				focused: false
			}]
		}
	]
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={{ width: 120, backgroundColor: '#448AFF', alignItems: 'center' }}>
				<SectionList
					keyExtractor={(item) => {
						return item.color
					}}
					renderSectionHeader={({ section: { title } }) => (
						<TouchableOpacity>
							<Text style={{ fontWeight: "bold" }}>{title}111</Text>
						</TouchableOpacity>
					)}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity style={{ width: 120, paddingTop: 20, paddingBottom: 20 }} onPress={
								() => {
									setFocused_index(index)
									ref.current?.navigate(item.path)
								}}>
								<View style={{ alignItems: 'center', justifyContent: 'center' }}>
									<Icon style={{ alignContent: 'center' }} name={(() => {
										if (index === focused_index) {
											return item.icon_focused
										} else {
											return item.icon
										}
									})()} size={35} color={item.color}></Icon>
									<Text style={{ marginTop: 5, fontSize: 12, color: item.color }}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					sections={menus}
				/>
			</View>
			<NavigationContainer ref={ref}>
				<Stack.Navigator initialRouteName='esop_system'>
					<Stack.Screen name='esop_system' component={esop_system} />
					<Stack.Screen name='eandon_system' component={eandon_system} />
					<Stack.Screen name='data_collection' component={data_collection} />
					<Stack.Screen name='quality_management' component={quality_management} />
					<Stack.Screen name='dashboard_system' component={dashboard_system} />
					<Stack.Screen name='reporting_system' component={reporting_system} />
				</Stack.Navigator>
			</NavigationContainer>
		</View >
	);
}
