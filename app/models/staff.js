// app/models/bear.js
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var staffSchema   = new Schema({
//    title: String,
//    details: String
      name: String,
      age: Number,
      address: String
});

module.exports = mongoose.model('staff', staffSchema);

