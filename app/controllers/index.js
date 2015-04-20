var settings = require('../../config/settings');
var helpers = require('../lib/helpers');
var itemd = require('../model/items');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            app: 'builder',
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
            res.json({
                'symphony': item.content
            });
        });
    },
    shareSymphony: function(req, res, next) {
        var videos = require('../../data/backgrounds.json');
        res.render('preview', {
            app: 'preview',
            meta: {
                title: 'Your City Symphony'
            },
            id: req.params.id,
            videos: videos
        });
    },
    postSymphony: function(req, res, next) {
        var content = JSON.stringify(req.body);
        itemd.saveitem(content, function(err, item) {
            if (err) {
                return next(err);
            }
            res.json({
                'id': item._id
            });
        });
    },
    numSymphonies: function(req, res, next) {
        itemd.countitems(function(err, n) {
            if (err) {
                return next(err);
            }
            res.json({
                'numsymphonies': n
            });
        });
    }
};