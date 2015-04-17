var mongoose = require('mongoose');  
var itemSchema = new mongoose.Schema({
  content: String
});
mongoose.model('Item', itemSchema);
mongoose.connect('mongodb://127.0.0.1:27017/test');