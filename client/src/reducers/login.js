const authToken = localStorage.getItem('loggedIn');

export default (state = authToken || "", action) => {
	switch(action.type) {
		case 'LOGIN':
			return  action.isUserLoggedIn
		case 'LOGOUT':
			return action.logOut
		default:
			return state
	}
};