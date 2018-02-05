const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_t8scfwmw:16pbj28pfjqevict0d910qto05@ds125058.mlab.com:25058/heroku_t8scfwmw');

//|| 'mongodb://localhost:`27017/clothesStore'
//const {seed} = require('./seed/products');
//seed();

require('./models/shoes');
require('./models/clothing');
require('./models/accessories');
require('./models/user');
require('./models/emailReceipt');


const app = express();
app.use(bodyParser.json());

require('./routes/shoes')(app);
require('./routes/clothes')(app);
require('./routes/accessories')(app);
require('./routes/productInfoShoe')(app);
require('./routes/productInfoClothes')(app);
require('./routes/productInfoAccessories')(app);
require('./routes/users')(app);
require('./routes/login')(app);
require('./routes/forgotPassword')(app);
require('./routes/addAddress')(app);
require('./routes/myaccount')(app);
require('./routes/logout')(app);
require('./routes/stripe')(app);
require('./routes/getOrders')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server is up and running!');
});



















