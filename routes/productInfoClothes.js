const mongoose = require('mongoose');

const clothing = mongoose.model('clothing');

module.exports = (app) => {
	app.post('/api/products/clothes', (req, res) => {
		clothing.findOne({})
		.then((clothing) => {
			
			for (let element of clothing.productsInfo.products) {
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

