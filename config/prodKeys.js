module.exports = {
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	sendGridKey: process.env.SEND_GRID_KEY,
	mongoURI: process.env.MONGODB_URI,
	redirectDomain: process.env.REDIRECT_DOMAIN // name of root app plus /login 
};