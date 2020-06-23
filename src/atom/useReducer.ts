interface ISession {
	session: string;
}

const initialState = { session: null } as ISession;

function reducer(state: ISession, action: { type: string, msg: unknown }) {
	switch (action.type) {
		case 'test':
			return { session: action.msg };
		default:
			throw new Error();
	}
}
