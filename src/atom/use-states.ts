import { useState } from 'react'

export default function useStates<T extends object>(data: T) {
	const [local, setLocal] = useState(data);
	return new Proxy(data, {
		get(_target: T, key: string | number | symbol) {
			return local[key];
		},
		set(target: T, key: string | number | symbol, value: unknown) {
			target[key] = value
			setLocal(target)
			return true
		}
	}) as unknown as T
}


// export default function use_states<T>(data: T) {
// 	for (const key in data) {
// 		// 判断是否实例自身拥有的属性
// 		if (data.hasOwnProperty(key)) {
// 			const [value, setValue] = useState(data[key]);
// 			Object.defineProperty(data, key, {
// 				get() {
// 					return value
// 				},
// 				set(v) {
// 					setValue(v)
// 				}
// 			})
// 		}
// 	}
// 	return data
// }
