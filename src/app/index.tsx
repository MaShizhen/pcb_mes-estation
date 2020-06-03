import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
// 引入页面
import home from '../home'
import login from '../login'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

export default function App() {
	const navigation_container = useRef<NavigationContainerRef>(null);

	useEffect(() => {
		const is_online = false
		if (!is_online) {
			navigation_container.current.navigate('login')
		}
	});

	return (
		<NavigationContainer ref={navigation_container}>
			<Stack.Navigator initialRouteName='home' screenOptions={{
				headerStyle: {
					height: 0
				},
				headerTitle: ''
			}}>
				<Stack.Screen name='home' component={home} />
				<Stack.Screen name='login' component={login} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
