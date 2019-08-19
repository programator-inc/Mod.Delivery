var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderStatusSchema = new Schema({
	'orderCancelled': Boolean,
	'orderDelivered': Boolean,
});

module.exports = mongoose.model('OrderStatus', OrderStatusSchema);
