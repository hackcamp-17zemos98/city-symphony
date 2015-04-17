var settings = require('../../config/settings');
var helpers = require('../lib/helpers');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            jsApp: 'index',
            meta: {
                title: 'Homepage'
            },
            greeting: 'Hello from homepage'
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