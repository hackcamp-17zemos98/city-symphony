var mongoose = require('mongoose');
exports.itemcontent = function getItem(oid, callback) {
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