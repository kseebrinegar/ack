const cart = localStorage.getItem('cart');

export default (state = JSON.parse(cart) || [], action) => {
	switch(action.type) {
		case 'NEW_ITEM_TO_CART':
			if (state.length > 0) {
				let arr = [];
				for (var i = 0; i < state.length; i++) {
					if (state[i].productId === action.addProductToCart.productId && state[i].defaultSize === action.addProductToCart.defaultSize) {
						state[i].qty = Number(state[i].qty) + 1;
						localStorage.setItem('cart', JSON.stringify(state));
						return state
					} 
				}
				localStorage.setItem('cart', JSON.stringify([...state, action.addProductToCart]));
				return [
					...state,
					action.addProductToCart
				]
			} else {
				localStorage.setItem('cart', JSON.stringify([...state, action.addProductToCart]));
				return [
					...state,
					action.addProductToCart
				]
			}
		case 'REMOVE_CART_ITEM':
			let newState = state.filter((element) => {
				return element.productId !== action.removeCartItem.id || element.defaultSize !== action.removeCartItem.size;
			});
			localStorage.setItem('cart', JSON.stringify(newState));
			return newState;
		case 'CHANGE_AMOUNT_OF_ITEM':
			let newState1 = state.filter((element) => {
				if (element.productId === action.changeAmountOfItem.id && element.defaultSize === action.changeAmountOfItem.size) {
					element.qty = action.changeAmountOfItem.valueChange
					return element
				} else {
					return element;
				}
			});
			localStorage.setItem('cart', JSON.stringify(newState1));
			return newState1;
		case 'STRIPE':
			localStorage.removeItem('cart');
			return [

			];
		default: 
			return state;
	}
}