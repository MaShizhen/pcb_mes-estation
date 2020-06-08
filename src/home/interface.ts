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

export interface IUserInfo {
	user: {
		usercode: string;
		user_name: string;
		productid: string;
		avatar_path: string;
		avatar_name: string;
		role_no: string,
		pub_user_connect: {
			role_no: string;
			role_name: string;
			pk_val: string;
			search_field_val: string;
			create_time: string;
			role_type_id: string;
			role_type_name: string;
			tablename: string;
			field: string;
			fieldtitle: string;
			search_field: string;
			search_title: string;
		}[]
	}
}
