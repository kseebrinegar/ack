const mongoose = require('mongoose');

const Clothing = mongoose.model('clothing');

module.exports = (app) => {
	app.get('/api/products/clothing', (req, res) => {
		Clothing.find().then((clothes) => {
			res.send(clothes);
		}).catch((e) => {
			console.log('Unable to fetch clothes products: ', e);
		});
	});
};