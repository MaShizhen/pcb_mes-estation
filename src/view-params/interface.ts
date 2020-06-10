import { IJavaRes } from '../atom/interface'

/**
 * 列表数据
 */
export interface ICollectionInfo {
	/**
	 *  业务级参数代码
	 */
	mes_devicesub_bparamcode: string;
	/**
	 *  业务级参数名称
	 */
	mes_devicesub_bparamname: string;
	/**
	 *  业务级参数说明
	 */
	mes_devicesub_bparamdesc: string;
	/**
	 *  设备模型子表ID
	 */
	mes_devicesub_mdetailid: string;
	/**
	 *  创建时间
	 */
	mes_create_date: number;
	/**
	 *  设备管理mes_id
	 */
	mes_id: string;
	/**
	 *  主表的设备ID
	 */
	mes_devicesub_deviceid: string;
	/**
	 *  数据类型
	 */
	mes_paramgroups_type: number;
	/**
	 *  参数单位名称
	 */
	mes_paramgroups_unitname: string;
	/**
	 *  业务类型
	 */
	mes_paramgroups_activity: string;
	/**
	 * 通讯层参数ID
	 */
	mes_devicesub_cparamid: string;
}


export interface ICollectionInfoRes extends IJavaRes {
	data: {
		list: ICollectionInfo[],
		totalCount: number
	}
}

export interface IMqttRespose {
	msg: {
		datavalue: {
			readvalue?: string;
			writevalue?: string;
		}[]
	}
}
