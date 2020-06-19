import { Platform } from 'react-native';

/**
 * 获取最新版本更新日志
 * @param service_url 配置文件（一般为app.json）地址
 * @example
 * ```ts
 * import am032 from '@dfeidao/fd-am000032';
 * const changelog = await am032('http://xxx.json');
 * ```
 */
export default async function get_changelog(service_url: string, version: string) {
	const m = service_url.match(/(.*\/)(.*)\.json/);
	if (!m) {
		throw new Error('错误的文件路径');
	}
	const [, baseurl, name] = m;
	return await get_change_log(baseurl, name, version);
}

async function get_change_log(baseurl: string, name: string, version: string) {
	const platform = Platform.OS;
	try {
		const data = await fetch(`${baseurl}${name}-${platform}-v${version}.changelog?v=${new Date().getTime()}`, {
			method: 'GET'
		});
		if (data.ok === false) {
			throw new Error();
		}
		return await data.text();
	} catch (error) {
		try {
			const data = await fetch(`${baseurl}${name}-v${version}.changelog?v=${new Date().getTime()}`, {
				method: 'GET'
			});
			if (data.ok === false) {
				throw new Error('错误的文件路径');
			}
			return await data.text();
		} catch (error) {
			return 'bad address';
		}
	}
}
