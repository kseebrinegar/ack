const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports.authenticate = (req, res, next) => {
	if (req.body.authToken) {
		const authToken = req.body.authToken;
		User.findByToken(authToken).then((user) => {
			if (!user) {
				return Promise.reject('Unauthrized user.');
			}

			req.user = user;
			req.authToken = authToken;
			next();
		}).catch((e) => {
			res.status(401).send(e);
		});
	} else {
		const authToken = req.params.authToken.substring(1);
		User.findByToken(authToken).then((user) => {
			if (!user) {
				return Promise.reject('Unauthrized user.');
			}

			req.user = user;
			req.authToken = authToken;
			next();
		}).catch((e) => {
			res.status(401).send(e);
		});
	}
}

