var mongoose = require('mongoose');

var settings = require('../../config/settings');

var itemSchema = new mongoose.Schema({
    content: String
});

mongoose.model('Item', itemSchema);
mongoose.connect('mongodb://' + settings.dbuser + ':' + settings.dbpass + '@' + settings.dburl);