import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { ScreenNavigationProp } from '../frame/interface';


interface IProp {
	navigation: ScreenNavigationProp;
}

export default class extends Component<IProp, {}> {
	constructor(props: IProp) {
		super(props);
	}
	public render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Details Screen</Text>
				<Button onPress={() => {
					this.props.navigation.navigate('12');
				}} title="go to home"></Button>
			</View>
		);
	}
}
