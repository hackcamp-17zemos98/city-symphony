var mongoose = require('mongoose');

exports.getitem = function getItem(oid, callback) {
    var Item = mongoose.model('Item');
    Item.findOne({'_id': oid}, function(err, item) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, item);
    });
};

exports.saveitem = function getItem(data, callback) {
    var Item = mongoose.model('Item');
    var item = new Item({ content: data });
    item.save(function (err, item) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, item);
    });
};

exports.countitems = function getItem(callback) {
    var Item = mongoose.model('Item');
    Item.count({}, function(err, n) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log(n);
        callback(null, n);
    });
};