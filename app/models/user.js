var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  // hashword: String
});

UserSchema.methods.initialize = function(){
  this.on('creating', this.hashPassword);
};

UserSchema.methods.comparePassword = function(attemptedPassword, callback) {
  //original syntax borked
  bcrypt.compare(attemptedPassword, this.find({ hashword }), function(err, isMatch) {
    callback(isMatch);
  });
},

UserSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('hashword'), null, null).bind(this)
    .then(function(hash) {
      this.set('hashword', hash);
  });
}

module.exports = mongoose.model('User', UserSchema);

// // bookshelf/old stuff
// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
