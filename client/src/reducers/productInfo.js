
export default (state = {}, action) => {
	switch (action.type) {
		case 'PRODUCT_INFO':
			return action.productInfo
		default: 
			return state	
	}
};