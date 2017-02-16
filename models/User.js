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

var hypothesisSchema = new schema({
	hypothesis: {type : String}
});

hypothesisSchema.statics = {

     /**
      findOnecompany. return the one company object.
      @param id: get id to find one company by id.
      @param callback: callback of this form.
    */
    get: function(query, callback) {
        this.findOne(query, callback);
    },
    /**
      findcompany. return the company objects.
      @param callback: callback of this form.
    */
    getAll: function(query, callback) {
        this.find(query, callback);
    },
    
    /**
      updatecompany. return the create company object result.
      @param updateData: updateData is use to update company w.r.t id.
      @param callback: callback of this form.
    */
    updateById: function(id, updateData, callback) {
        this.update(id, {$set: updateData}, callback);
    },
    remove: function(removeData, callback) {
         this.remove(removeData, callback);
    },
    create: function(data, callback) {
        var hypothesis = new this(data);
        hypothesis.save(callback);
    }
}

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Hypothesis', hypothesisSchema);
module.exports = mongoose.model('Box', boxSchema);
module.exports = mongoose.model('Login', userSchema);