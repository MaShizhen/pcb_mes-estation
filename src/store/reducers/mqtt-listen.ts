import uuid from 'uuid'

export default function mqtt_listen(state: '', action: {
	type: string
}) {
	if (typeof state === 'undefined') {
		return ''
	} else if (action.type === 'MQTT_LISTEN') {
		return uuid()
	} else {
		return state
	}
}
