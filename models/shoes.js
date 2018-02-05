const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShoesSchema = new Schema({
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
				sizes: [String],
				defaultSize: String,
				productType: String
			}
		]		
	}
});

mongoose.model('shoe', ShoesSchema);
