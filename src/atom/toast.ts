import Toast from 'react-native-simple-toast';

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
	return Toast.show(message, 1000);
}
