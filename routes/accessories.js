const mongoose = require('mongoose');

const Accessory = mongoose.model('accessory');

module.exports = (app) => {
	app.get('/api/products/accessories/', (req, res) => {
		Accessory.find().then((accessories) => {
			res.send(accessories);
		}).catch((e) => {
			console.log('Unable to fetch accessories products: ', e);
		});
	});
}