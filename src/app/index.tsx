import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// 引入页面
import details from '../details/index';
import home from '../home/index';

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={home} options={{ title: '132' }} />
				<Stack.Screen name="Details" component={details} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
