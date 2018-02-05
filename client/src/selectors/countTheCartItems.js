import React from 'react';

const countTheCartItems = (cartItems) => {
	let count = 0;
	if (cartItems.length > 0) {
		for (let outerElement in cartItems) {
			count =  count + Number(cartItems[outerElement].qty);
		}
	}
	return count;
};

export default countTheCartItems;