var fs = require('fs');
var path = require('path');

var config = {
    dbuser: '',
    dbpass: '',
    locale: 'es',
    path: path.join(__dirname, '..'),
    session: {
        secret: 'SECRET_HERE'
    }
};

module.exports = fs.existsSync(path.join(__dirname, 'local.settings.js')) ? require(path.join(__dirname, 'local.settings.js')) : config;