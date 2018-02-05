const mongoose = require('mongoose');

const accessory = mongoose.model('accessory');

module.exports = (app) => {
	app.post('/api/products/accessories', (req, res) => {
		accessory.findOne({})
		.then((accessory) => {
			
			for (let element of accessory.productsInfo.products) {
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

