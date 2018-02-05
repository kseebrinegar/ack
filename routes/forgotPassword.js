const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = (app) => {
	app.post('/api/account/forgotpassword', (req, res) => {
		const email = req.body.email;

		User.findOne({email}).then((user) => {
			console.log(user)
		}).catch(() => {
			console.log('fuck');
		});
	});
};