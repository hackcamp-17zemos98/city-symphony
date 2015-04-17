var path = require('path');

var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var compression = require('compression');
var logger = require('morgan');

var settings = require('./settings');

var routes = require('../app/routes');

var viewHelpers = require('../app/lib/view-helpers');

module.exports = function(app) {

    var env = app.get('env');

    /**
     * Compression
     */

    app.use(compression());


    /**
     * Cookies & Session
     */

    app.use(cookieParser(settings.session.secret));
    app.use(session({
        secret: settings.session.secret,
        resave: true,
        saveUninitialized: true
    }));

    /**
     * views
     */

    app.set('views', path.join(settings.path, 'app/views'));

    app.engine('.hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        helpers: viewHelpers
    }));

    app.set('view engine', '.hbs');


    /**
     * Logger
     */

    if(env ===  'development') {
        app.use(logger('dev'));
    }


    /**
     * Body parser
     */

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));


    /**
     * Static
     */

    app.use(express.static(path.join(settings.path, 'static/dist')));


    /**
     * Favicon
     */

    app.use(favicon(path.join(settings.path, 'static', 'favicon.ico')));


    /**
     * Router
     */

    app.use('/', routes(settings, env));

};