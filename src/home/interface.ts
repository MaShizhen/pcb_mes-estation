import { IJavaRes } from '../atom/interface'

/**
 * 列表数据
 */
export interface IEquipmentList {

	/**
	 *  设备编号
	 */
	mes_device_code: string;
	/**
	 *  设备名称
	 */
	mes_device_name: string;
	/**
	 *  设备mes_id
	 */
	mes_id: string;
}


export interface IEquipmentListRes extends IJavaRes {
	data: {
		/**
		 *  设备编号
		 */
		mes_process_code: string;
		/**
		 *  设备名称
		 */
		mes_process_name: string;
		/**
		 *  工序mes_id
		 */
		mes_id: string;
		/**
		 *  员工名称
		 */
		mes_staff_name: string;
		/**
		 *  员工编号
		 */
		mes_staff_code: string;
		sub: IEquipmentList[]
	}
}