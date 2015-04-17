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