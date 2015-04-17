var environment = require('./config/environment');

var express = require('express');

/**
 * Server module
 */

module.exports.startServer = function() {
    var app = express();

    app.set('port', process.env.port || 3000);

    environment(app);

    /**
     * Server
     */

    var server = app.listen(3000, function() {
        console.log('App running at %s', app.get('port'));
    });
};


if (require.main === module) {
    module.exports.startServer();
}