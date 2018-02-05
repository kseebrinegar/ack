
const login = (isUserLoggedIn = '') => {
	return {
		type: 'LOGIN',
		isUserLoggedIn
	}
};

export default login;