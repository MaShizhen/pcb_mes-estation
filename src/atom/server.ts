import { productid } from './config'
import uniqueid from './get-uniqueid'
import request from './request'
import { get } from './storage'

/**
 * service 通用服务
 * @param {*} message_type 服务名称
 * @param {[key:string]:unknown} condition 条件
 */
export function service<T>(message_type: string, condition: unknown) {
	return request<T>(`/service?${message_type}`, JSON.stringify({
		message_type,
		condition,
		sessionid: get('sessionid')
	}))
}

/**
 * 登录
 * @param usercode 用户usecode
 * @param userpw 用户密码
 */
export function login(usercode: string, userpw: string) {
	const fid = uniqueid()
	return request<{ sessionID: string, remember_me_ticket: string, usercode: string }>(`/login`, JSON.stringify({
		usercode,
		userpw,
		fid
	}))
}

/**
 * ticket登录
 * @param usercode 用户usecode
 * @param userpw 用户密码
 */
export async function ticket_login() {
	const ticket = await get<string>('ticket');
	const fid = uniqueid()
	return request<{ code: 1 | 0 }>(`/ticket-login`, JSON.stringify({
		fid,
		ticket,
		productid
	}))
}

/**
 * logout退出登录
 */
export async function logout() {
	return request<{ code: 1 | 0 }>(`/logout`, '')
}
