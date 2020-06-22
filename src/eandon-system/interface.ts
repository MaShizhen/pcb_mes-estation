import { IJavaRes } from '../atom/interface'

/**
 * 安灯管理左侧列表
 */
export interface IUserboard {
	/**
	 * 设备mes id
	 */
	mes_id: string;
	/**
	 * 设备编号
	 */
	mes_alarm_no: string;
	/**
	 * 设备名称
	 */
	mes_alarm_name: string;
}

export interface IUserboardRes extends IJavaRes {
	data: IUserboard[]
}

/**
 * 安灯管理右侧列表
 */
export interface IUserboardRight {
	/**
	 * 报警代码
	 */
	mes_alarm_no: string;
	/**
	 * 报警名称
	 */
	mes_alarm_name: string;
	/**
	 * 报警代码库表主键
	 */
	mes_alarm_mesid: string;
	/**
	 * 业务状态
	 */
	business_status: number;
	/**
	 * 报警时长
	 */
	alarm_duration: string;
	/**
	 * 生效时间
	 */
	effective_time: number;
	/**
	 * 生效人
	 */
	effective_staff: string;
	/**
	 * 解除时间
	 */
	release_time: string;
	/**
	 * 解除人
	 */
	release_staff: string;
	/**
	 * 报警代码库mes_id
	 */
	mes_id: string;
	/**
	 * 图片地址
	 */
	mes_alarm_picture: string;
}

export interface IUserboardRightRes extends IJavaRes {
	data: {
		list: IUserboardRight[],
		totalCount: number
	}
}


export interface IBoardadd {
	/**
	 * 报警代码库表主键
	 */
	mes_alarm_mesid: string;
	/**
	 * 工序管理表主键
	 */
	mes_process_mesid: string;
	/**
	 * 设备管理表主键
	 */
	mes_device_mesid: string;
	/**
	 * 生效人
	 */
	effective_staff: string;
	/**
	 * 创建人id
	 */
	mes_create_staffid: string;
	/**
	 * 创建人
	 */
	mes_create_staff: string;
}

export interface IboardaddRes extends IJavaRes {
	data: {
		/**
		 * 参数_id
		 */
		_id: string;
		/**
		 * 参数mes_id
		 */
		mes_id: string;
	}
}


export interface IAwadika extends IJavaRes {
	data: [{
		/**
		 *
		 */
		staff_no: string;
		/**
		 *
		 */
		staff_name: string;
	}]
}
