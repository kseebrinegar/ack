
const addToCartAction = (addProductToCart) => {
	return {
		type: 'NEW_ITEM_TO_CART',
		addProductToCart
	};
};

export default addToCartAction;