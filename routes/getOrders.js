const mongoose = require('mongoose');
const {authenticate} = require('../middlewares/auth');

const User = mongoose.model('user');

module.exports = (app) => {
	app.post('/api/account/orders', authenticate,(req, res) => {
		res.send(req.user.orders);
	}, (e) => {
		console.log(e);
		res.status(400).send(e);
	});
};