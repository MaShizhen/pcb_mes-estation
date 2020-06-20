import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { ICollectionInfoRes } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id
 */
export function collectioninfo(mes_devicesub_deviceid: string, pageNum: number) {
	return service<ICollectionInfoRes>('dataservice.mescomm.collectioninfo', {
		spaceid,
		productid,
		systemid,
		pageNum,
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
	return service('dataservice.eboxdataread', {
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

/**
 * 设定下发值
 * @param requestid 随机数
 * @param commdeviceid 通讯层设备ID
 * @param commparamid 通讯层参数ID
 */
export function eboxdatawrite(requestid: string, commdeviceid: string, commparamid: string, writevalue: string) {
	return service('dataservice.eboxdatawrite', {
		productid,
		systemid,
		requestid,
		timestamp: new Date().getTime(),
		devicelist: [{
			commdeviceid,
			paramlist: [{
				commparamid,
				writevalue
			}]
		}]
	})
}
