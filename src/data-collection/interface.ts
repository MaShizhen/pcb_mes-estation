import { IJavaRes } from '../atom/interface'

/**
 * 列表数据
 */
export interface ICollectionlist {
	/**
	 *  设备编号
	 */
	mes_device_code: string;
	/**
	 *  设备名称
	 */
	mes_device_name: string;
	/**
	 *  设备图片
	 */
	mes_device_logo: string;
	/**
	 *  设备说明
	 */
	mes_device_desc: string;
	/**
	 *  有效状态
	 */ mes_valid_status: number;
	/**
	 *  审核状态
	 */
	mes_audit_status: string;
	/**
	 *  创建时间
	 */ mes_create_date: number;
	/**
	 *  设备mes_id
	 */
	mes_id: string;
}


export interface ICollectionlistRes extends IJavaRes {
	data: {
		list: ICollectionlist[],
		totalCount: number
	}
}