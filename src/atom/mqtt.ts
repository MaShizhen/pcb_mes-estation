import { connect, MqttClient } from '@taoqf/react-native-mqtt';

const M = new Map();

/**
 * mqtt初始化
 * @param fd 系统参数
 * @param uri 推送服务地址
 * @param err 错误事件
 */
async function config(uri: string) {
	if (M.get(uri)) {
		return M.get(uri)
	} else {
		return new Promise((resolve, reject) => {
			const client = connect(uri);
			client.on('connect', () => {
				M.set(uri, client)
				resolve(client);
			});
			client.on('error', (res) => {
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
	const client = await config(uri)
	return client.publish(topic, msg);
}

/**
 * 监听推送消息
 * @param fd 系统变量
 * @param topic 主题
 * @param event_no 事件编号
 */
export async function listen(uri: string, topic: string) {
	return new Promise(async (resolve, reject) => {
		const client = await config(uri) as MqttClient;
		client.on('message', (res_topic, payload) => {
			if (res_topic === topic) {
				const buffer = payload.toString();
				try {
					resolve(JSON.parse(buffer));
				} catch {
					resolve(buffer);
				}
			}
		});
		client.subscribe(topic, (err) => {
			if (err) {
				reject(err)
			}
		});
	})
}
