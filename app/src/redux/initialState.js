const initialState = {
	app: {
		appIsReady: false
	},
	plaid: {
		linkObject: {
			account: {
				id: '',
				name: '',
				subtype: '',
				type: ''
			},
			account_id: '',
			accounts: [],
			institution: {
				institution_id: '',
				name: ''
			},
			link_session_id: '',
			public_token: ''
		}
	}
};

export default initialState;
