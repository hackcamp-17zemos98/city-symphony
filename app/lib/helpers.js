var settings = require('../../config/settings');

var util = require('util');

var moment = require('moment');
moment.locale(settings.locale);

module.exports = {
    moment: function() {
        return moment;
    },
    devInspect: function(o) {
        return util.inspect(o, {
            showHidden: true,
            colors: true
        });
    }
};