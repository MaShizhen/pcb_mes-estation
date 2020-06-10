import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { ICollectionInfoRes } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id
 */
export function collectioninfo(mes_devicesub_deviceid: string) {
	console.log('----------------------', mes_devicesub_deviceid)
	return service<ICollectionInfoRes>('dataservice.mescomm.collectioninfo', {
		spaceid,
		productid,
		systemid,
		pageNum: 1,
		pageSize: 10,
		criteria: {
			mes_devicesub_deviceid
		}
	})
}

/**
 * 当前值查询 读取按钮
 * @param requestid 随机数
 * @param commdeviceid 通讯层设备ID
 * @param commparamid 通讯层参数ID
 */
export function eboxdataread(requestid: string, commdeviceid: string, commparamid: string) {
	return service<ICollectionInfoRes>('dataservice.eboxdataread', {
		productid,
		systemid,
		requestid,
		timestamp: new Date().getTime(),
		devicelist: [{
			commdeviceid,
			paramlist: [{
				commparamid
			}]
		}]
	})
}