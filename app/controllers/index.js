var settings = require('../../config/settings');
var helpers = require('../lib/helpers');
        var itemd = require('../model/items');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            jsApp: 'builder',
            meta: {
                title: 'Build a City Symphony'
            }
        });
    },
    getSymphony: function(req, res, next) {
        itemd.getitem(req.params.id, function(err, item) {
                if (err) {
                    return next(err);
                }
                res.json({'symphony': item.content});
        });
    },
    shareSymphony: function(req, res, next) {
        res.render('preview', {
            jsApp: 'preview',
            meta: {
                title: 'Your City Symphony'
            },
            id: req.params.id
        });
    },
    postSymphony: function(req, res, next) {
        var content = JSON.stringify(req.body);
        itemd.saveitem(content, function(err, item) {
                if (err) {
                    return next(err);
                }
                res.json({'id': item._id});
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