require(['jquery', 'Canvas', 'Player'], function($, Canvas, Player) {

    var App = {
        init: function(setup) {
            var self = this;

            this.setup = setup;
            this.data = setup.data;
            this.elements = setup.elements;

            this.$element = $(this.elements.app);

            this.canvas = Object.create(Canvas);
            this.player = Object.create(Player);

            var dataCache = {};

            $.when(
                $.get(this.data.sounds, function(sounds) {
                    dataCache.sounds = sounds;
                }),
                $.get(this.data.backgroundSounds, function(backgroundSounds) {
                    dataCache.backgroundSounds = backgroundSounds;
                }),
                $.get(this.data.boxes, function(boxes) {
                    dataCache.boxes = boxes;

                })
            ).then(function() {

                //Init canvas
                self.canvas.init({
                        $element: self.$element.find(self.elements.canvas),
                        boxes: dataCache.boxes,
                        sounds: dataCache.sounds
                    })
                    .build();

                //Init player
                self.player.init({
                        $element: self.$element.find(self.elements.player),
                        sounds: dataCache.sounds,
                        backgroundSounds: dataCache.backgroundSounds
                    })
                    .build();
            });

            $(window).one('scroll', function(e) {
                self.$element.find('.initial').slideUp(2000);
                self.$element.find('.fade').css('opacity', 1);

            });


        }
    };

    App.init({
        data: {
            sounds: '/data/sounds.json',
            backgroundSounds: 'data/rhythm.json',
            boxes: 'data/boxes.json'
        },
        'elements': {
            app: '.app',
            canvas: '.canvas',
            player: '.player'
        }
    });

});