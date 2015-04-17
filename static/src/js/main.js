require.config({
    baseUrl: 'js',
    paths: {
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
        'jquery-ui': '../vendor/jquery-ui/jquery-ui',
        /**
         * Modules
         */
        'shared': 'modules/shared',
        'Canvas': 'modules/Canvas',
        'Player': 'modules/Player',
        /**
         * Apps
         */
        'builder': 'app/builder'
    },
    shim: {
        'bootstrap': {
            'deps': ['jquery']
        },
        'jquery-ui': {
            'deps': ['jquery']
        }
    }
});

require(['jquery', 'shared'], function() {

});