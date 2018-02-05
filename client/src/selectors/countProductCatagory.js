const countProductCatagory = (productsToCount, catagory) => {
	let count = 0;
	productsToCount.productsInfo.products.map((item) => {
		if (catagory === item.typeProduct || catagory === 'view all') {
			count++;
		}
	});
	return count;
};

export default countProductCatagory;