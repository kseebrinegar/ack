const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = (app) => {
	app.post('/api/account/login', (req, res) => {
		User.findByCredentials(req.body.email, req.body.password).then((user) => {
			return user.generateAuthToken().then((token) => {
				res.header('x-auth', token).send(user);
			});
		}).catch((e) => {
			console.log(e)
			res.send(e);
		})
	});
}