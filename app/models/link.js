var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../config');
var crypto = require('crypto');


var LinkSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
})


LinkSchema.methods.initialize = function(){
  this.on('creating', function(model, attrs, options){
    var shasum = crypto.createHash('sha1');
    shasum.update(model.get('url'));
    model.set('code', shasum.digest('hex').slice(0, 5));
  });
}


module.exports = mongoose.model('Link', LinkSchema);
