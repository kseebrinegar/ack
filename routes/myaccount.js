const mongoose = require('mongoose');
const {authenticate} = require('../middlewares/auth');

const User = mongoose.model('user');

module.exports = (app) => {
	app.post('/api/account/myaccount', authenticate, (req, res) => {
		res.send(req.user);
	});
};