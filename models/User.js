var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var schema = mongoose.Schema;

var boxSchema = new schema({
	name: {type : String, unique : true}
});

var userSchema = new schema({
	local            : {
        email        : String,
        password     : String,
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('Box', boxSchema);
module.exports = mongoose.model('Login', userSchema);