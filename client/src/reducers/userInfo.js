const userInfo = localStorage.getItem('userInfo');

export default (state = JSON.parse(userInfo) || {}, action) => {
	switch(action.type) {
		case 'ADD_ADDRESS':
			state.shippingAddress = action.address;
			localStorage.setItem('userInfo', JSON.stringify(state));
			return {
				...state
			}
		case 'STORE_NAME_AND_EMAIL':
			state.storeNameAndEmail = action.storeNameAndEmail;
			localStorage.setItem('userInfo', JSON.stringify(state));
			return {
				...state
			}
		case 'SHIPPING_CHOICE':
			state.shippingChoice = action.shippingChoice;
			localStorage.setItem('userInfo', JSON.stringify(state));
			return {
				...state
			}
		case 'CLEAR_USER':
			return {
				
			}
		case 'STRIPE':
			state.shippingChoice = action.shippingChoice;
			const { storeNameAndEmail, shippingAddress } = localStorage.getItem('userInfo');
			localStorage.removeItem('userInfo');
			return {
				...state,
				shippingChoice: undefined
			}
		default:
			return state;
	}
};