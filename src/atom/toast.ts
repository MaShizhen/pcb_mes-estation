import { WToast } from 'react-native-smart-tip';

/**
 * toast文字提示弹框
 * @param message 显示的文字信息
 * @param duration 显示的时间。时间过后自动消失
 * @param position 显示的位置
 * @param text_color 显示的文字颜色
 * @param background_color 提示框的背景颜色
 * @example
 * ```ts
 * import am031 from '../atom/toast';
 *
 * am031('sucess', 1000, 'center', '#ffffff', '#444444');
 * ```
 */
export default function toast(type: 'success' | 'warning' | 'info' | 'error', message: string) {

	// const _opsition = (() => {
	// 	if (position === 'top') {
	// 		return WToast.position.TOP;
	// 	} else if (position === 'center') {
	// 		return WToast.position.CENTER;
	// 	} else {
	// 		return WToast.position.BOTTOM;
	// 	}
	// })();
	const style = (() => {
		if (type === 'success') {
			return '#67C23A'
		} else if (type === 'warning') {
			return '#E6A23C'
		} else if (type === 'info') {
			return '#909399'
		} else {
			return '#F56C6C'
		}
	})()
	const options = {
		backgroundColor: '#444444',
		data: message,
		duration: 1000,
		position: WToast.position.BOTTOM,
		textColor: style
	};
	WToast.show(options);
}
