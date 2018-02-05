import { createStore, combineReducers } from 'redux';

const currentshoesCatagory = ((catagory) => {
	return {
		type: 'SET_CATAGORY',
		catagory
	}
});

const setShoesFilter = ((filter) => {
	return {
		type: 'SET_FILTER_TYPE',
		filter
	}
});

const shoeReducerDefaultState = [
	{
		id: 1,
		type: 'skateboarding',
		img: '/img/products/shoes/skateboarding/skateboarding1.jpg',
		price: 79.99,
		name: 'mens\'s Court Graffik SE Shoes',
		color: '8 Colors',
		stars: 5,
		rank: 21
	},
	{
		id: 2,
		type: 'skateboarding',
		img: '/img/products/shoes/skateboarding/skateboarding1.jpg',
		price: 90.95,
		name: 'mens\'s Wes Kremer 2 S Skate',
		color: '7 Colors',
		stars: 5,
		rank: 10
	},
	{
		id: 3,
		type: 'skateboarding',
		img: '/img/products/shoes/skateboarding/skateboarding1.jpg',
		price: 59.99,
		name: 'mens\'s Court Kremer 1',
		color: '7 Colors',
		stars: 4,
		rank: 11
	},
	{
		id: 10,
		type: 'sneakers',
		img: '/img/products/shoes/sneakers/sneakers1.jpg',
		price: 65.00,
		name: 'mens\'s Astor Shoes',
		color: '10 Colors',
		stars: 4,
		rank: 5
	},
	{
		id: 20,
		type: 'sandals',
		img: '/img/products/shoes/sandals/sandals1.jpg',
		price: 35.00,
		name: 'mens\'s Recoil Sandals',
		color: '1 Color',
		stars: 5,
		rank: 1
	},
	{
		id: 30,
		type: 'boots',
		img: '/img/products/shoes/boots/boots1.jpg',
		price: 110.00,
		name: 'mens\'s Peary Winter Boots',
		color: '1 Colors',
		stars: 3,
		rank: 40
	},
	{
		id: 40,
		type: 'snowboardboots',
		img: '/img/products/shoes/snowboardboots/snowboard1.jpg',
		price: 449.95,
		name: 'mens\'s Torstein Horgmo BOA',
		color: '1 Colors',
		stars: 5,
		rank: 4
	}
];

const shoesReducer = ((state = shoeReducerDefaultState, action) => {
	switch (action.type) {
		default:
			return state;
	}
});


const shoesFilteringReducerDefaultState = {
	currentCatagory: 'view all',
	currentFilter: ''
};

const shoesFilteringReducer = ((state = shoesFilteringReducerDefaultState, action) => {
	switch (action.type) {
		case  'SET_CATAGORY':
			return {
				currentCatagory: action.catagory
			}
		case 'SET_FILTER_TYPE':
			return {
				...state,
				currentFilter: action.filter
			}
		default:
			return state;
	}
});

const chooseShoesCatagory = (shoes, { currentCatagory, currentFilter } ) => {
	return shoes.filter((item) => {
		if (item.type === currentCatagory || currentCatagory === 'view all') {
			return item
		}
	}).sort((a, b) => {
		if (currentFilter == 'prices low to high') {
			return  a.price - b.price;
		} else if (currentFilter == 'prices high to low') {
			return b.price - a.price;
		} else if (currentFilter === 'product name az') {
			if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		} else if (currentFilter === 'product name za') {
			if (a.name < b.name) {
				return 1;
			} else {
				return 0;
			}
		} else if (currentFilter === 'highest rated') {
			return a.rank - b.rank;
		} else if (currentFilter === 'best sellers') {
			return b.stars - a.stars;
		} else {
			return
		}
	
	});
};


	/*PricesLowToHigh: undefined,
	PricesHighToLow: undefined,
	ProductNameAZ: undefined,
	ProductNameZA: undefined,
	HighestRated: undefined,
	BestSellers: undefined*/

const store = createStore(
	combineReducers({
		shoes: shoesReducer,
		shoesFilteringReducer: shoesFilteringReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const searchedCatagory =  chooseShoesCatagory(state.shoes, state.shoesFilteringReducer);
	console.log(searchedCatagory);
});

//store.dispatch(currentshoesCatagory('skateboarding'));
store.dispatch(setShoesFilter('best sellers'));


/*const demoState = {
	shoes: [{
			id: 1,
			type: 'skateboarding',
			img: '/img/products/shoes/skateboarding/skateboarding1.jpg',
			price: 79.99,
			name: 'mens\'s Court Graffik SE Shoes',
			color: '8 Colors',
			stars: 5,
			rank: 21
		},
		{
			id: 10,
			type: 'sneakers',
			img: '/img/products/shoes/sneakers/sneakers1.jpg',
			price: 65.00,
			name: 'mens\'s Astor Shoes',
			color: '10 Colors',
			stars: 4,
			rank: 5
		},
		{
			id: 20,
			type: 'sandals',
			img: '/img/products/shoes/sandals/sandals1.jpg',
			price: 35.00,
			name: 'mens\'s Recoil Sandals',
			color: '1 Color',
			stars: 5,
			rank: 1
		},
		{
			id: 30,
			type: 'boots',
			img: '/img/products/shoes/boots/boots1.jpg',
			price: 110.00,
			name: 'mens\'s Peary Winter Boots',
			color: '1 Colors',
			stars: 4,
			rank: 40
		},
		{
			id: 40,
			type: 'snowboardboots',
			img: '/img/products/shoes/snowboardboots/snowboard1.jpg',
			price: 449.95,
			name: 'mens\'s Torstein Horgmo BOA',
			color: '1 Colors',
			stars: 5,
			rank: 4
		}
	],
	clothing: [{

		}
	],
	accessories: [{

		}
	],
	shoesFilter: {
		viewAll: true,
		skateBoarding: false,
		sneakers: false,
		sandals: false,
		boots: false,
		snowboardboots: false
	},
	productsFiltering: {
		PricesLowToHigh: undefined,
		PricesHighToLow: undefined,
		ProductNameAZ: undefined,
		ProductNameZA: undefined,
		HighestRated: undefined,
		BestSellers: undefined
	}
	
};*/






































