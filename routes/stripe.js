const mongoose = require('mongoose');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const Mailer = require('../services/mailer');
const orderTemplate = require('../services/emailTemplates/orderTemplate');
const {authenticate} = require('../middlewares/auth');

const User = mongoose.model('user');

const randomOrderNumber = () => {
	let text = "";
  	let possible = "A2BC6DE5FG3HIJKL8MNO5PQR127STUV7WXYZ9ab4cdef576ghijklmnopqrstuvwxyz0123456789";
  	for (let i = 0; i < 12; i++) {
   	 	text += possible.charAt(Math.floor(Math.random() * possible.length));
  	}
 	return text;
};

module.exports = (app) => {
	app.post('/api/stripe', authenticate, (req, res) => {
		const { authToken, totalCost, shippingChoice, cart, stripeToken, createdAt, arrivalDate } = req.body;
		stripe.charges.create({
			amount: totalCost * 100,
			currency: 'usd',
			description: '$' + totalCost + ' for items in cart.',
			source: stripeToken.id
		}, (err, charge) => {
			User.findByToken(authToken).then((user) => {
				user.orders.push({total: totalCost, orderNumber: randomOrderNumber() , createdAt: createdAt,
				arrivalDate: arrivalDate, products: cart});
				user.save().then((user) => {
					res.send(true);
					return user;
				}).then((user) => {
					const order = {
						title: 'Thank you for your purchase!',
						subject: 'Ack.com',
						body: 'body',
						recipient: user.email,
						fullName: user.firstName + ' ' + user.lastName,
						order: user.orders[user.orders.length -1]
					}
					const mailer = new Mailer(order, orderTemplate(order));
					mailer.send();
				}, (e) => {
					console.log(e);
					res.status(400).send(e);
				})
			});
		});
	});	
}
