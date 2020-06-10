import { productid, spaceid } from '../atom/config'
import { service } from '../atom/server'
import { IUserInfo } from './interface'

/**
 * 获取用户信息
 * @param usercode
 */
export function getuserroleinfo(usercode: string) {
	return service<IUserInfo>('permservice.getuserroleinfo', {
		spaceid,
		productid,
		usercode,
		systemid: '12'
	})
}
