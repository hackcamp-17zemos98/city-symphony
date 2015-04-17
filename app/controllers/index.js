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
        var itemdata = require('../model/items');
        itemdata.itemcontent(req.params.id, function(err, data) {
                if (err) {
                    return next(err);
                }
                res.render('item', {
                    jsApp: 'builder',
                    meta: {
                        title: 'City Symphony'
                    },
                    itemcontent: data
                });
        });
    },
    postSymphony: function(req, res, next) {
        console.log("It works");
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