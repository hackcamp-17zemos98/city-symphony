require(['jquery', 'sound'], function($, sound) {

    $.fn.random = function() {
        return this.eq(Math.floor(Math.random() * this.length));
    };

    var App = {
        init: function(setup) {
            var self = this;
            this.setup = setup;

            this.$element = $(setup.element);

            this.$audio = this.$element.find('.audio-slots');
            this.$ambient = this.$element.find('.audio-ambient');
            this.$videoInfo = this.$element.find('.video-info');

            this.$videos = this.$element.find('video');

            this.$videos.each(function(i, video) {
                video.volume = 0;
            });

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

                if (i < soundsLength) {
                    var current = self.data.sounds[i];

                    self.$audio.attr('src', sound(current.file));

                    var audio = self.$audio.get(0);
                    // audio.currentTime = 0;
                    audio.play();

                    var $info = $('<div>')
                        .addClass('info-box');

                    var $link = $('<a>').attr('href', current.url).attr('target', '_blank');

                    var $frame = $('<img>').attr('src', current.frame).appendTo($link);
                    var $title = $('<p>').html('This sound is taken from: <strong>' + current.video + '</strong>').appendTo($link);

                    //video
                    self.$videos.random().fadeIn(function() {

                        this.play();

                        if (self.currentVideo) {
                            self.currentVideo.pause();
                            $(self.currentVideo).fadeOut();
                        }

                        self.currentVideo = this;
                    });

                    $link.appendTo($info);

                    $info.appendTo(self.$videoInfo);

                    self.$audio.one('ended', function() {
                        currentAudio++;
                        playBlock(currentAudio);
                    });

                }
            };

            playBlock();

            self.$ambient.attr('src', sound(this.data.ambient) || sound('/audio/background/Strobetone'));

            var ambient = self.$ambient.get(0);
            // ambient.currentTime = 0;
            ambient.play();
        }
    };

    App.init({
        element: '.app'
    });
});