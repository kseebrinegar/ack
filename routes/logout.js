const mongoose = require('mongoose');
const {authenticate} = require('../middlewares/auth');

const User = mongoose.model('user');

module.exports = (app) => {
	app.delete('/api/account/logout:authToken', authenticate, (req, res) => {
		req.user.removeToken(req.authToken).then(() => {
			res.status(200).send();
		}, (e) => {
			res.status(400).send();
		});
	});
};