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
