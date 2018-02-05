const mongoose = require('mongoose');
const order = require('./order');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema =  new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		validate:  {
			validator: (value) => {
				return validator.isAlpha(value)
			},
			message: '{value} is not a valid first name.'
		}
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		validate:  {
			validator: (value) => {
				return validator.isAlpha(value)
			},
			message: '{value} is not a valid first name.'
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: '{value} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	shippingAddress: [{
		firstName: {
			type: String,
			trim: true,
			minlength: 1,
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 1,
		},
		address: {
			type: String,
			trim: true,
			minlength: 1,
		},
		city: {
			type: String,
			trim: true,
			minlength: 1,
		},
		state: {
			type: String,
			trim: true,
			minlength: 1,
		},
		zip: {
			type: String,
			trim: true,
			minlength: 1,
		},
		phone: {
			type: String,
			trim: true,
			minlength: 1,
		}
	}],
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	orders: [order]
});

UserSchema.statics.findByCredentials = function(email, password) {
	const User = this;

	return User.findOne({email}).then((user) => {
		if (!user) {
			return Promise.reject('This email does not exist.');
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject('Uncorrect password...please try again');
				}
			});
		});
	})
};

UserSchema.pre('save', function(next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

UserSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	const { email, firstName, lastName, shippingAddress } = userObject
	return { email, firstName, lastName, shippingAddress};
}

UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function(authToken) {
	const user = this;

	return user.update({
		$pull: {
			tokens: {
				token: authToken
			}
		}
	});
};

UserSchema.statics.findByToken = function(authToken) {
	const User = this;
	let decoded = undefined;

	try {
		decoded = jwt.verify(authToken, 'abc123');
	} catch(e) {
		return new Promise((resolve, reject) => {
			reject('Unauthorized user.');
		});
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': authToken,
		'tokens.access': 'auth'
	});
};

mongoose.model('user', UserSchema);
















