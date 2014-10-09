var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});


var User = mongoose.model('User', UserSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      console.log("Error", err);
    }
    callback(isMatch);
  });
}

UserSchema.pre('save', function(next){
  var that = this;
  bcrypt.hash(that.password, null, null, function(err, hash) {
    if (err) {
      res.send(500, err)
    } else {
      that.password = hash;
      next();
    }
  });
})

module.exports = (User);
