require.config({
    baseUrl: '/js',
    paths: {
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
        'jquery-ui': '../vendor/jquery-ui/jquery-ui',
        'modernizr': '../vendor/modernizr/modernizr',
        /**
         * Modules
         */
        'shared': 'modules/shared',
        'sound': 'modules/sound',
        'Canvas': 'modules/Canvas',
        'Player': 'modules/Player',
        /**
         * Apps
         */
        'builder': 'app/builder',
        'preview': 'app/preview'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'jquery-ui': {
            'deps': ['jquery']
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});

require(['jquery', 'shared'], function() {

});