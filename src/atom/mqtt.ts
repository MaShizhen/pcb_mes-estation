import { connect, MqttClient } from '@taoqf/react-native-mqtt';

let client = null as MqttClient;

/**
 * mqtt初始化
 * @param fd 系统参数
 * @param uri 推送服务地址
 * @param err 错误事件
 */
export async function config(uri: string): Promise<MqttClient> {
	if (client) {
		return client
	} else {
		return new Promise((resolve, reject) => {
			const c = connect(uri);
			c.on('connect', () => {
				client = c
				resolve(c);
			});
			c.on('error', (res) => {
				reject(false);
			});
		});
	}
}

/**
 * 推送消息
 * @param fd 系统参数
 * @param topic 主题
 * @param msg 消息
 */
export async function push(uri: string, topic: string, msg: string) {
	const c = await config(uri)
	return c.publish(topic, msg);
}

/**
 * 监听推送消息
 * @param fd 系统变量
 * @param topic 主题
 * @param event_no 事件编号
 */
export async function listen(uri: string, topic: string) {
	return new Promise(async (resolve, reject) => {
		const c = await config(uri);
		c.on('message', (res_topic, payload) => {
			if (res_topic === topic) {
				const buffer = payload.toString();
				try {
					resolve(JSON.parse(buffer));
				} catch {
					resolve(buffer);
				}
			}
		});
		c.subscribe(topic, (err) => {
			// console.log('eeeeeeeeeeeeeeee', err)
			if (err) {
				reject(err)
			}
		});
	})
}


/**
 * 监听推送消息
 * @param fd 系统变量
 * @param topic 主题
 * @param event_no 事件编号
 */
export async function listen_callback(uri: string, topic: string, callback: (msg: string) => void) {
	const c = await config(uri);
	c.on('message', (res_topic, payload) => {
		if (res_topic === topic) {
			const buffer = payload.toString();
			try {
				const msg = JSON.parse(buffer)
				return callback(msg)
			} catch {
				return callback(buffer)
			}
		}
	});
	c.subscribe(topic, (err) => {

	});
}

/**
 * 取消订阅
 * @param uri 推送服务地址
 * @param topic 主题
 */
export async function unsubscribe(uri: string, topic: string) {
	const c = await config(uri);
	return c.unsubscribe(topic);
}
