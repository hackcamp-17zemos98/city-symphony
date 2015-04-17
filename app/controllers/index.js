var settings = require('../../config/settings');
var helpers = require('../lib/helpers');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            jsApp: 'builder',
            meta: {
                title: 'City Symphony'
            }
        });
    },
    getSymphony: function(req, res, next) {
        var itemd = require('../model/items');
        itemd.getitem(req.params.id, function(err, item) {
                if (err) {
                    return next(err);
                }
                res.render('item', {
                    jsApp: 'builder',
                    meta: {
                        title: 'City Symphony'
                    },
                    item: item
                });
        });
    },
    postSymphony: function(req, res, next) {
        var itemd = require('../model/items');
        var content = 'F***ing demo content goes here!!!';
        itemd.saveitem(content, function(err, item) {
                if (err) {
                    return next(err);
                }
                console.log('The item ID is: ' + item._id);
        });
    },
    help: function(req, res, next) {
        res.render('help', {
            jsApp: 'help',
            meta: {
                title: 'Help'
            }
        });
    }

};