import uuid from 'uuid'

export default function counter(state: string, action: { type: string }) {
	if (typeof state === 'undefined') {
		return null;
	}

	switch (action.type) {
		case 'message':
			return uuid()
	}
}
