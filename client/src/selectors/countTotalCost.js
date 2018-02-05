import React from 'react';

const countTotalCost = (cartItems) => {
	let count = 0;
	for (let element1 in cartItems) {
		count = count + (Number(cartItems[element1].qty) * Number(cartItems[element1].price));
	}
	return count.toFixed(2);
};

export default countTotalCost;