export default function equipment_mes_id(state: '', action: {
	type: string,
	id: string
}) {
	if (typeof state === 'undefined') {
		return ''
	} else if (action.type === 'SET_EQUIPMENT_MES_ID') {
		return action.id
	} else {
		return state
	}
}
