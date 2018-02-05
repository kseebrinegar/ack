const mongoose = require('mongoose');

const Shoe = mongoose.model('shoe');

module.exports = (app) => {
	app.post('/api/products/shoes', (req, res) => {
		Shoe.findOne({})
		.then((shoe) => {
			
			for (let element of shoe.productsInfo.products) {
				if (element.productId === req.body.id) {
					res.send(element);
					break;				
				}
			}
		}).catch((e) => {
			console.log(e);
			console.log('Couldnt retrieve ${req.body.id} from database');
		});
	});
};

