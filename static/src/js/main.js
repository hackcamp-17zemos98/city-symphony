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
        /**
         * Apps
         */
        'index': 'app/index'
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