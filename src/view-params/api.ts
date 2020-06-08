import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { ICollectionInfoRes } from './interface'

/**
 * 安灯管理左侧列表
 * @param mes_process_mesid 工序mes_id
 */
export function collectioninfo(mes_devicesub_deviceid: string) {
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
 * @param mes_process_mesid 工序mes_id
 */
// export function eboxdataread(mes_devicesub_deviceid: string) {
// 	return service<ICollectionInfoRes>('dataservice.eboxdataread', {
// 		// requestid,
// 		// productid,
// 		// systemid,
// 		// criteria: {
// 		// 	mes_devicesub_deviceid
// 		// }


// 		"productid": "pcb_mes",// 必传
// 		"systemid": "10121",// 必传
// 		"requestid": "bb9b6a0a-0b1f-4d35-b895-93add919f9df”,//newGUID
// 		"timestamp": 389988233,// UNIX时间戳(含毫秒INT64类型)
// 		"commdeviceid": "001",// 通讯层设备ID
// 		“paramlist”: [
// 			{
// 				commparamid":"001 - a"//通讯层参数ID
// 									 commparamid" : "001 - b"          //通讯层参数ID
// 	})
// }