import dayjs from 'dayjs'

/**
 * 时间格式化
 * @param {*} time 时间戳
 * @param {*} flag 标识
 * @example YYYY => 2020
 * @example YYYY-MM-DD HH:mm:ss => 2020-01-17 17:12:25
 * @example YYYY-MM-DD h:mm:ss a => 2020-01-17 5:13:45 pm
 */
export function format(time: number, flag = 'YYYY-MM-DD') {
	if (!time) {
		return ''
	}
	return dayjs(Number(time)).format(flag)
}

/**
 * 日期转时间戳
 * @param {*} time
 */
export function parse(time: string) {
	return new Date(time).getTime()
}

// 获取月份区间时间戳
export function get_month_range(time: number) {
	const _date = new Date(Number(time))
	const year = _date.getFullYear()
	const month = _date.getMonth() + 1
	const month_start_str = year + '.' + month + '.01'// 当月第一天
	const month_start = new Date(month_start_str).getTime()
	const month_days = new Date(year, month, 0).getDate() // 当月的总天数
	return [month_start, month_start + month_days * 24 * 60 * 60 * 1000 - 1]
}

/**
 * 时间戳，要增加几个月份
 * @param {*} time 时间戳
 * @param {*} month 要增加几个月份
 */
export function months_later(time: number, month: number) {
	const time_set = new Date(time)
	const month_initial = time_set.setMonth(time_set.getMonth() + month)
	return month_initial
}
