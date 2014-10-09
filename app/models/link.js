var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../config');
var crypto = require('crypto');


var LinkSchema = new mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', LinkSchema);

LinkSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = (Link);
