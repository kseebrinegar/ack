const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessoriesSchema = new Schema({
	productsInfo: {
		bannerImg: String,
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
	}
});

mongoose.model('accessory', AccessoriesSchema);