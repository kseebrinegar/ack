import axios from 'axios';

const payment = (checkOutInfo) => {
	return function(dispatch) {
		axios.post('/api/stripe', checkOutInfo).then((res) => {
			dispatch({
				type: 'STRIPE',
				stripe: res.data
			});
		}, (e) => {
			console.log(e);
			console.log(`error: could not send payment.`);
		});	
	}
}

export default payment;