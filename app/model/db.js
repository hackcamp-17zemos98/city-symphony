var mongoose = require('mongoose');

var settings = require('../../config/settings');

var itemSchema = new mongoose.Schema({
  content: String
});
mongoose.model('Item', itemSchema);

mongoose.connect('mongodb://127.0.0.1:27017/test');
// mongoose.connect('mongodb://'+settings.dbuser+':'+settings.dbpass+'@ds061611.mongolab.com:61611/citysymphony');