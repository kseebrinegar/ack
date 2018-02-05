const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = (app) => {
	app.post('/api/account/newuser', (req, res) => {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const email = req.body.email;
		const password = req.body.password;

		const user = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password
		});

		user.save().then((user) => {
			return user.generateAuthToken();
		}).then((token) => {
			res.header('x-auth', token).send(user);
		}).catch((e) => {
			console.log(e);
			res.send('This email is already in use.');
		});
	});
}









