require(['jquery', 'Canvas', 'Player'], function($, Canvas, Player) {

    var App = {
        init: function(setup) {
            this.setup = setup;
            this.data = setup.data;
            this.element = setup.element;

            this.canvas = Object.create(Canvas);
            this.player = Object.create(Player);
        }
    };

    App.init({
        data: {
            sounds: '/data/sounds.json'
        },
        'element': '#app'
    });

});