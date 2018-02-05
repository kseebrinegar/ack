const mongoose = require('mongoose');

const Shoe = mongoose.model('shoe');

module.exports = (app) => {
	app.get('/api/products/shoes', (req, res) => {
		Shoe.find().then((shoes) => {
			res.send(shoes);
		}).catch((e) => {
			console.log('Unable to fetch shoe products: ', e);
		});
	});
};