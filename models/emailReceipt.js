const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserReceiptEmailSchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipient: String
});

mongoose.model('userReceiptEmail', UserReceiptEmailSchema);