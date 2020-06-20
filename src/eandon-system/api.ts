import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { IBoardadd, IboardaddRes, IUserboardRes, IUserboardRightRes } from './interface'

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
export function userboardright(mes_process_mesid: string, mes_device_mesid: string, pageNum: number) {
	return service<IUserboardRightRes>('dataservice.mescomm.userboardright', {
		spaceid,
		productid,
		systemid,
		pageNum,
		pageSize: 10,
		criteria: {
			mes_process_mesid,
			mes_device_mesid
		}
	})
}

/**
 * 安灯管理左侧新增
 * @param param IBoardadd
 */
export function boardadd(param: IBoardadd) {
	return service<IboardaddRes>('dataservice.mescomm.boardadd', {
		spaceid,
		productid,
		systemid,
		data: {
			...param
		}
	})
}

/**
 * 解除安灯报警
 * @param staff_id 员工编号
 * @param release_staff 员工名称
 * @param mes_id
 * @param effective_time
 */
export function andonboardlight(staff_id: string, release_staff: string, mes_id: string, effective_time: number) {
	return service<IboardaddRes>('dataservice.mescomm.andonboardlight', {
		spaceid,
		productid,
		systemid,
		staff_id,
		release_staff,
		data: {
			mes_id,
			effective_time
		}
	})
}
