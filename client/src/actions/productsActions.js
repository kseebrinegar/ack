import axios from 'axios';

const productsAction = (products) => {
	return function(dispatch) {
		axios.get(`/api/products/${products}`).then((res) => {
			dispatch({
				type: 'PRODUCTS',
				useWhatProducts: res.data
			});
		}, (e) => {
			console.log(e);
			console.log(`error: could not retrieve ${products}`);
		});
	}
}
export default productsAction;