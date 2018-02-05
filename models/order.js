const mongoose = require('mongoose');
const moment = require('moment');

const { Schema }= mongoose;

const OrderSchema = new Schema({
	total: {
		type: Number,
		required: true
	},
	orderNumber: {
		type: String
	},
	createdAt: {
		type: String
	},
	arrivalDate: {
		type: String
	},
	products: [
		{
			productId: Number,
			typeProduct: String,
			img: String,
			price: String,
			name: String,
			color: String,
			stars: [String],
			rank: Number,
			sizes: [],
			defaultSize: String,
			productType: String
		}
	]
});

module.exports = OrderSchema;