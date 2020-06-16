import { productid, spaceid, systemid } from '../atom/config'
import { service } from '../atom/server'
import { IuseresoplistRes } from './interface'

/**
 * esop查询
 * @param mes_process_mesid 工序mes_id
 */
export function useresoplist(mes_staff_code: string, mes_staff_name: string) {
	return service<IuseresoplistRes>('dataservice.mescomm.useresoplist', {
		spaceid,
		productid,
		systemid,
		criteria: {
			mes_staff_code,
			mes_staff_name
		}
	})
}
