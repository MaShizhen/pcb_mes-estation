import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { ICollectionlistRes } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id, mes_device_mesid  设备mes_id|是
 */
export function collectionlist(mes_process_mesid: string, mes_device_mesid: string) {
	return service<ICollectionlistRes>('dataservice.mescomm.collectionlist', {
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