export default function process_mes_id(state: '', action: {
	type: string,
	id: string
}) {
	if (typeof state === 'undefined') {
		return ''
	} else if (action.type === 'SET_PROCESS_MES_ID') {
		return action.id
	} else {
		return state
	}
}
