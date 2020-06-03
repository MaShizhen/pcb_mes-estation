import AsyncStorage from '@react-native-community/async-storage';

/**
 * storage 设置key与值
 * @param key 要设置存储的key值
 * @param value	要保存的value值
 */
export function set(key: string, value: unknown) {
	const val = JSON.stringify(value);
	return AsyncStorage.setItem(key, val);
}

/**
 * storage获取指定key的值
 * @param key 所要获取值的key
 */
export async function get<T>(key: string) {
	const value = await AsyncStorage.getItem(key);
	if (!value) {
		return null;
	} else {
		return JSON.parse(value) as T;
	}
}

/**
 * 清除storage缓存操作
 */
export default function clear() {
	return AsyncStorage.clear();
}
