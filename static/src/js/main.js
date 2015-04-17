require.config({
    baseUrl: 'js',
    paths: {
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
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
        "bootstrap": {
            "deps": ['jquery']
        }
    }
});

require(['jquery', 'shared'], function() {
    console.log('hello from main');
});