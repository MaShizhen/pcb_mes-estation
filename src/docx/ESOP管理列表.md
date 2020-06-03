# 设备模型详情

#### 版本更新说明
| 版本序号 | 日期 |	作者 | 备注 |
|:---|:---|:---|:---|
| 01     | 2020-06-01 | 孙浩 |  |
| 02   | |  | |
| 03   |  |  |  |

* messagetype
```text
dataservice.mescomm.useresoplist
``` 
 
*  messageContent 参数示例
```json
{
    "spaceid": "pcb_mes",
    "productid": "pcb_mes",
    "systemid": 10121,
    "criteria": {
              "mes_staff_code":"10009",
              "mes_staff_name":"高世锋"
           }
    }

```
   
* messageContent参数说明

| 参数 | 是否必填 |	类型 | 说明 | 是否可空 |
|:---|:---|:---|:---|:---|
| productid   | 是 | String    | 当前项目对应的productid |否|
| spaceid   | 是 | String    | 当前项目对应的spaceid |否|
| systemid   | 是 | String    | 当前项目对应的systemid |否|
| criteria   | 是 | JSONObject    | 条件 |否|
| mes_process_mesid   | 否 | String    | 设备模型id |否|


* 服务结果示例
```json
{
    "optcode":0,
    "optmsg":"成功",
    "data":{
        "esop_code":"ES0001",
        "esop_name":"ESOP1",
        "file_name":"aa.doc",
        "file_version":"1",
        "effective_time":1593485172000,
        "recovery_time":1591238772000,
        "recovery_staff":"Jerry",
        "business_status":1,
        "mes_valid_status":0,
        "mes_audit_status":2,
        "mes_create_date":1589338790697,
        "mes_id":"27c2e4cc-ab51-40a8-91b9-dccad1b024e1"
    }
}
```
 * 服务结果参数说明  
 
| 参数  | 类型 | 说明 |
|:---|:---|:---|
| code | int  | 服务返回码，0：代表失败，1：代表成功 | 
| msg | String  | 服务返回消息 | 
| data | JSONArray  | 服务返回数据 | 
| param_mes_id | String  | 参数mes_id | 
| group_mes_id | String  | 设备组mes_id | 

