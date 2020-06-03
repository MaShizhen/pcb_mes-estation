import { useState } from 'react'

export default function useLocal<T>(data: T) {
	for (const key in data) {
		// 判断是否实例自身拥有的属性
		if (data.hasOwnProperty(key)) {
			const [value, setValue] = useState(data[key]);
			Object.defineProperty(data, key, {
				get() {
					return value
				},
				set(v) {
					setValue(v)
				}
			})
		}
	}
	return data
}
