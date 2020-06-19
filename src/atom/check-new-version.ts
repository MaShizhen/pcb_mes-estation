import { Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';

/**
 * 检查应用版本
 * @param service_url 静态文件地址
 * @example
 * ```ts
 * import check_new_version from '@dfeidao/fd-am000018';
 * const res = await check_new_version('http://xxx.json');
 * ```
 */
export default async function check_new_version(service_url: string) {
	const m = service_url.match(/(.*\/)(.*)\.json/);
	if (!m) {
		throw new Error('错误的文件路径');
	}
	const res = await fetch(`${service_url}?v=${new Date().getTime()}`, {
		method: 'GET'
	});
	const result = await res.json() as {
		androidVersion: string;
		iosVersion: string;
		ios_app_id?: string;
	};
	const localVersion = getVersion();
	if (Platform.OS === 'ios') {
		let latestVersion = result.iosVersion;
		if (result.ios_app_id) {
			const data = await fetch(`https://itunes.apple.com/lookup?id=${result.ios_app_id}`);
			const apple_res = await data.json();
			latestVersion = apple_res.results[0].version;
		}
		return {
			code: latestVersion !== localVersion,
			result
		}
	} else {
		const latestVersion = result.androidVersion;
		return {
			code: latestVersion !== localVersion,
			result
		}
	}
}
