import { Linking, Platform } from 'react-native';
import permissions from 'react-native-permissions';
import { upgrade } from 'rn-app-upgrade';

/**
 * 应用更新
 * @param service_url 静态文件地址
 * @example
 * ```ts
 * import upgrade_app from '@dfeidao/fd-am000020';
 * await upgrade_app('http://xxxx.json');
 * ```
 */
export default async function upgrade_app(service_url: string) {
	await permissions.request('android.permission.WRITE_EXTERNAL_STORAGE');

	const m = service_url.match(/(.*\/)(.*)\.json/);
	if (!m) {
		throw new Error('错误的文件路径');
	}
	const [, baseurl, name] = m;
	const res = await fetch(`${service_url}?v=${new Date().getTime()}`, {
		method: 'GET'
	});
	if (res.ok === false) {
		throw new Error('bad address');
	}
	const result = await res.json() as {
		androidVersion: string;
		iosVersion: string;
		ios_app_id?: string;
	};

	if (Platform.OS === 'ios') {
		if (result.ios_app_id) {
			Linking.openURL(`https://itunes.apple.com/us/app/id${result.ios_app_id}?ls=1&mt=8`);
		} else {
			const version = result.iosVersion;
			const plistUrl = `${baseurl}${name}-v${version}.plist`;
			Linking.openURL(`itms-services://?action=download-manifest&url=${encodeURIComponent(plistUrl)}`);
		}
	} else {
		const version = result.androidVersion;
		const file = encodeURIComponent(`${name}-v${version}`);
		const apkUrl = `${baseurl}${file}.apk`;
		upgrade(apkUrl);
	}
}
