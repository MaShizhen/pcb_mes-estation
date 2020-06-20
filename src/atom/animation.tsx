import React, { Component } from 'react';
import { Animated, Easing, ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';

export interface IAnimationProps {
	/**
	 * 进度条的环部分
	 */
	progressOuterImage?: string | number;
	/**
	 * 进度条的中间部分
	 */
	progressInnerImage?: string | number;
	viewstyle: StyleProp<ViewStyle>;
}

export default class Animation extends Component<IAnimationProps, IAnimationProps> {
	private innersource: ImageSourcePropType;
	private outersource: ImageSourcePropType;
	private spinValue: Animated.Value;
	private scaleValue: Animated.Value;
	private opacityValue: Animated.Value;
	private spinAnim: Animated.CompositeAnimation;
	private scaleAnim: Animated.CompositeAnimation;
	constructor(props: IAnimationProps) {
		super(props);
		this.spinValue = new Animated.Value(0);
		this.scaleValue = new Animated.Value(0);
		this.opacityValue = new Animated.Value(1);
		function get_image(type: string) {
			if (typeof props[type] === 'string') {
				return { uri: props[type] };
			} else if (typeof props[type] === 'number') {
				return props[type];
			} else {
				if (type === 'progressInnerImage') {
					return require('../../imgs/logo.png');
				} else {
					return require('../../imgs/circle.png');
				}
			}
		}
		this.innersource = get_image('progressInnerImage');
		this.outersource = get_image('progressOuterImage');
	}
	public componentDidMount() {
		this.spin();
		this.scale();
	}
	public render() {
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		});
		const viewstyle = (this.props.viewstyle || {}) as ViewStyle;
		return (<View
			style={{
				alignItems: 'center',
				bottom: '50%',
				height: 0,
				justifyContent: 'center',
				...viewstyle
			}}
		>
			<Animated.Image
				source={this.outersource}
				style={{
					height: 50,
					opacity: this.opacityValue,
					transform: [
						{
							rotate: spin
						},
						{
							scale: this.scaleValue
						}
					],
					width: 50
				}}
			/>
			<Animated.Image
				source={this.innersource}
				style={[
					{
						height: 40,
						opacity: this.opacityValue,
						position: 'absolute',
						width: 40
					},
					{
						transform: [
							{
								scale: this.scaleValue
							}
						]
					}
				]}
			/>
		</View>);
	}

	private scale() {
		this.opacityValue.setValue(1);
		this.scaleAnim = Animated.sequence([
			Animated.timing(this.scaleValue, { toValue: 1, useNativeDriver: true, duration: 200 }),
			Animated.delay(500),
			Animated.timing(this.opacityValue, { toValue: 0, useNativeDriver: true }),
			Animated.timing(this.scaleValue, { toValue: 0, useNativeDriver: true, duration: 200 })
		]);
		this.scaleAnim.start(() => {
			this.scale();
		});
	}

	private spin() {
		this.spinValue.setValue(0);
		this.spinAnim = Animated.timing(this.spinValue, {
			duration: 800,
			easing: Easing.linear,
			toValue: 1,
			useNativeDriver: true
		});
		this.spinAnim.start(() => {
			this.spin();
		});
	}
}

