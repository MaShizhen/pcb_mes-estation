export const spaceid = 'pcb_mes';
export const productid = 'pcb_mes';
export const systemid = '10121';
export const sql_db_type = 'MongoDB';


export const server = 'http://192.168.1.239:8890';
export const init_server = server + '/pcb_mes-app';
export const file_server = 'http://dev.koimy.com:1080/fsweb'; // 文件服务器地址
export const get_file = `${file_server}/getfile?productid=${productid}&id=`; // 文件服务器地址

// 本地&打包 通用
export const ticket_login = 'ticket-login';
export const login = `customs-login`;
export const mqtt = 'mqtt://dev.koimy.com:1080/ws';

// export const update_url = 'https://dev.koimy.com:1081/public/pcb_erp/AppUpdate/update.json';// 静态文件地址
export const update_url = '';// 静态文件地址
