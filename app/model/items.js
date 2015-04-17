var mongoose = require('mongoose');

exports.getitem = function getItem(oid, callback) {
    var Item = mongoose.model('Item');
    Item.findOne({'_id': oid}, function(err, item) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        // console.log(settings.locale);
        callback(null, item);
    });
};

exports.saveitem = function getItem(data, callback) {
    var Item = mongoose.model('Item');
    var item = new Item({ content: data });
    item.save(function (err, i) {
        if (err) {
            return next(err);
        }
    });
};