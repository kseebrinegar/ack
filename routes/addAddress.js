const mongoose = require('mongoose');

const User = mongoose.model('user');
const {authenticate} = require('../middlewares/auth');

module.exports = (app) => {
	app.post('/api/account/address', authenticate, (req, res) => {
		const address = req.body.address;
		if (req.user.shippingAddress.length > 0) {
			const shippingAddress = req.user.shippingAddress[0];
			shippingAddress.firstName =  address.firstName;
			shippingAddress.lastName =  address.lastName;
			shippingAddress.address = address.address;
			shippingAddress.city = address.city;
			shippingAddress.state = address.state;
			shippingAddress.zip = address.zip;
			shippingAddress.phone = address.phone;
		} else {
			req.user.shippingAddress.push({
				firstName: address.firstName,
				lastName: address.lastName,
				address: address.address,
				city: address.city,
				state: address.state,
				zip: address.zip,
				phone: address.phone
			});
		}
		
		req.user.save().then(() => {
			res.send(req.user);
		}).catch((e) => {
			console.log(e);
			res.status(401).send('Unable to update address...Please try again.');
		})
	});
};