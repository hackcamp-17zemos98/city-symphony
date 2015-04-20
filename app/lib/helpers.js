var settings = require('../../config/settings');

var util = require('util');

module.exports = {
    devInspect: function(o) {
        return util.inspect(o, {
            showHidden: true,
            colors: true
        });
    }
};