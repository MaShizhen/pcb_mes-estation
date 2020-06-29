import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import Animating from './animation';

/**
 * 页面加载动画
 * @param progressInnerImage 进度条的环部分
 * @param progressOuterImage 进度条的中间部分
 */
export default function Animated(marginLeft?: string) {
	const instance = new RootSiblings((
		React.createElement(Animating, {
			progressInnerImage: require('../../imgs/logo_img.png'),
			progressOuterImage: require('../../imgs/circle.png'),
			viewstyle: {
				marginLeft: marginLeft ? marginLeft : '10%'
			}
		})));
	return {
		destroy() {
			return new Promise((resolve) => {
				instance.destroy(resolve);
			});
		}
	};
}
