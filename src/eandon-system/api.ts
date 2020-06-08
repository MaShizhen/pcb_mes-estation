import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { IUserboardRes, IUserboardRightRes } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id
 */
export function userboard(mes_process_mesid: string) {
	return service<IUserboardRes>('dataservice.mescomm.userboard', {
		spaceid,
		productid,
		systemid,
		criteria: {
			mes_process_mesid
		}
	})
}

/**
 * 安灯管理右侧列表
 * @param mes_process_mesid 工序mes_id
 * @param mes_device_mesid 设备mes_id
 */
export function userboardright(mes_process_mesid: string, mes_device_mesid: string) {
	return service<IUserboardRightRes>('dataservice.mescomm.userboardright', {
		spaceid,
		productid,
		systemid,
		pageNum: 1,
		pageSize: 10,
		criteria: {
			mes_process_mesid,
			mes_device_mesid
		}
	})
}
