import { server } from './config'

/**
 * post请求
 * @param url 网络请求地址
 * @param body 请求参数
 */
export default async function post<T>(url: string, body: string) {
	const ret = await fetch(server + url, {
		body,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'feidao-mobile'
		},
		method: 'POST'
	});
	const type = ret.headers.get('Content-Type');
	const status = ret.status;
	if (status > 0 && status < 300) {
		if (/json/i.test(type || '')) {
			return await ret.json() as T;
		} else {
			return await ret.text() as unknown as T;
		}
	} else {
		const data = await ret.text();
		if (/json/i.test(type || '')) {
			const err_msg = JSON.parse(data) as { msg: string, detail: string };
			if (err_msg.msg) {
				throw new Error(err_msg.msg);
			} else {
				throw new Error(data);
			}
		} else {
			throw new Error(data);
		}
	}
}
