import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import allProductsReducer from '../reducers/allProductsReducer';
import shoesFilteringReducer from '../reducers/shoesFilterReducer';
import productInfo from '../reducers/productInfo';
import shoppingCart from '../reducers/cart';
import loggedIn from '../reducers/login';
import userInfo from '../reducers/userInfo';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setStore = () => {
	const store = createStore(
		combineReducers({
			listOfproducts: allProductsReducer,
			shoesFilteringReducer: shoesFilteringReducer,
			productInfo: productInfo,
			cart: shoppingCart,
			loggedIn: loggedIn,
			userInfo: userInfo
		}),
		composeEnhancers(applyMiddleware(thunk), autoRehydrate())		
	);
	persistStore(store, {whitelist: ['listOfproducts']});
	return store;
};

export default setStore;
