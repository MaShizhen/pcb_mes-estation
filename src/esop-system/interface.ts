import { IJavaRes } from '../atom/interface'

export interface Iuseresoplis {

	/**
	 * ESOP代码
	 */
	esop_code: string;
	/**
	 * ESOP名称
	 */
	esop_name: string;
	/**
	 * 文件名称
	 */
	file_name: string;
	/**
	 * 文件版本
	 */
	file_version: string;
	/**
	 * 生效时间
	 */
	effective_time: number;
	/**
	 * 回收时间
	 */
	recovery_time: number;
	/**
	 * 回收人
	 */
	recovery_staff: string;
	/**
	 * 业务状态
	 */
	business_status: number;
	/**
	 * 有效状态
	 */
	mes_valid_status: number;
	/**
	 * 审核状态
	 */
	mes_audit_status: number;
	/**
	 * 创建时间
	 */
	mes_create_date: number;
	/**
	 * 唯一mes_id
	 */
	mes_id: string;

}

export interface IuseresoplistRes extends IJavaRes {
	data: Iuseresoplis
}


