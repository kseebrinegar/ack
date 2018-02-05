import axios from 'axios';

const productInfo = (id, productType) => {
	return function(dispatch) {
		axios.post(`/api/products/${productType}`, {id}).then((res) => {
			dispatch({
				type: 'PRODUCT_INFO',
				productInfo: res.data
			});
		}, (e) => {
			console.log(e);
			console.log(`error: could not retrieve product id: ${id}`);
		});	
	}
}

export default productInfo;