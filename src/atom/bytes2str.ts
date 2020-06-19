// 字节数组转十六进制字符串
export default function bytes2str(arr: number[]) {
	return arr.reduce((p, c) => {
		const tmp = c.toString(16);
		return p + (tmp.length === 1 ? '0' + tmp : tmp)
	}, '')
}