const shoesFilteringReducerDefaultState = {
	currentCatagory: 'view all',
	currentFilter: 'prices low to high'
};

export default (state = shoesFilteringReducerDefaultState, action) => {
	switch (action.type) {
		case  'SET_CURRENT_PRODUCTS_CATAGORY':
			return {
				...state,
				currentCatagory: action.catagory
			}
		case 'SET_FILTER_TYPE':
			return {
				...state,
				currentFilter: action.filter
			}
		default:
			return {
				...state
			}
	}
};