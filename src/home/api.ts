import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { IEquipmentListRes, IUserInfo } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id
 */
export function equipmentlist(mes_staff_code: string, mes_staff_name: string) {
	return service<IEquipmentListRes>('dataservice.mescomm.equipmentlist', {
		spaceid,
		productid,
		systemid,
		pageNum: 1,
		pageSize: 10,
		criteria: {
			mes_staff_code,
			mes_staff_name
		}
	})
}

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
