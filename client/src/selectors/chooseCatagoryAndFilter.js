
const chooseCatagoryAndFilter = (products, { currentCatagory, currentFilter }, isCart = false) => {
	if (isCart) {
		const randomNum = Math.floor(Math.random() * products.length);
		return products.slice(randomNum, (randomNum + 4));
	}

	return products.filter((item, index) => {
		if (item.typeProduct === currentCatagory || currentCatagory === 'view all') {
			return item
		}

	}).sort((a, b) => {
		if (currentFilter == 'prices low to high') {
			return  a.price - b.price;
		} else if (currentFilter == 'prices high to low') {
			return b.price - a.price;
		} else if (currentFilter === 'product name a - z') {
			if (a.name > b.name) {
				return 1;
			} else {
				return -1;
			}
		} else if (currentFilter === 'product name z - a') {
			if (a.name < b.name) {
				return 1;
			} else {
				return -1;
			}
		} else if (currentFilter === 'highest rated') {
			return a.rank - b.rank;
		} else if (currentFilter === 'best sellers') {
			if (a.stars.length < b.stars.length) {
				return 1;
			} else {
				return -1;
			}
		} else {
			return;
		}
	});
};

export default chooseCatagoryAndFilter;


