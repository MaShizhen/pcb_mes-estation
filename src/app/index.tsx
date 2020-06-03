import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { ticket_login } from '../atom/server'

// 引入页面
import home from '../home'
import login from '../login'

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

export default function App() {
	const navigation_container = useRef<NavigationContainerRef>(null);

	useEffect(() => {
		(async () => {
			const is_online = await ticket_login()
			if (!is_online) {
				navigation_container.current.navigate('login')
			}
		})()
	}, []);

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
