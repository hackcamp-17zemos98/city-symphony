require(['jquery'], function($) {
    var App = {
        init: function(setup) {
            var self = this;
            this.setup = setup;

            this.$element = $(setup.element);

            this.$audio = this.$element.find('.audio-slots');
            this.$ambient = this.$element.find('.audio-ambient');

            $.ajax('/get/' + this.$element.data('src'))
                .done(function(d) {
                    self.data = JSON.parse(d.symphony);
                    self.play();
                });
        },
        play: function() {
            var self = this;
            var currentAudio = 0;
            var soundsLength = self.data.sounds.length;

            var playBlock = function(i) {
                i = i || 0;

                console.log(i);

                if(i < soundsLength) {
                    var current = self.data.sounds[i];

                    self.$audio.attr('src', current.file);

                    console.log(self.$audio);

                    var audio = self.$audio.get(0);
                    audio.currentTime = 0;
                    audio.play();

                    self.$audio.one('ended', function() {
                        currentAudio++;
                        playBlock(currentAudio);
                    });

                }
            };

            playBlock();
        }
    };

    App.init({
        element: '.app'
    });
});