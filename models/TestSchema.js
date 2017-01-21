var mongoose = require('mongoose');
var schema = mongoose.Schema;

var boxSchema = new schema({
	name: {type : String, unique : true}
});

module.exports = mongoose.model('Box', boxSchema);