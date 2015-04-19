define(['jquery', 'sound'], function($, sound) {
    var Player = {
        init: function(setup) {
            var self = this;

            this.$element = setup.$element;
            //TODO move this to app config
            this.$ambients = this.$element.find('.ambients');
            this.$slots = this.$element.find('.slots');

            this.playing = false;

            this.$preview = this.$element.find('.preview');
            this.$save = this.$element.find('.save');

            this.$end = this.$element.find('.end');

            this.$player = this.$element.find('.audio-preview');
            this.$infoToggle = this.$element.find('.slot-info-toggle button');

            this.sounds = setup.sounds;
            this.backgroundSounds = setup.backgroundSounds;

            this.slots = 5;

            this.$infoToggle.on('click', function() {
                $(this).toggleClass('active');
                self.$element.find('.slot-info').slideToggle();
            });

            this.$preview.on('click', function(e) {
                self.preview();
            });

            this.$save.on('click', function(e) {
                self.save();
            });

            this.$end.find('.close').on('click', function() {
                self.$end.addClass('hidden');
            });

            return this;
        },
        build: function() {
            var self = this;
            //Ambient
            //TODO callback to edit result JSON
            $.each(this.backgroundSounds, function(i, ambient) {
                $('<button>')
                    .addClass('ambient-switch button')
                    .data('file', ambient.file)
                    .text(ambient.name)
                    .on('click', function(e) {
                        var $this = $(this);

                        self.$ambients.find('button').removeClass('active');
                        $this.addClass('active');

                        var $audio = $this.parent().find('audio');
                        self.currentAmbient = ambient.file;

                        $audio.attr('src', sound(ambient.file));

                        // $audio.get(0).currentTime = 0;
                        $audio.get(0).volume = 0.1;
                        $audio.get(0).play();

                    })
                    .appendTo(self.$ambients);
            });

            //Start first
            this.$ambients.find('button').first().trigger('click');

            //Slots
            //

            var clearSlot = function(e) {
                if(!self.playing) {
                    var $this = $(this);

                    var $slotBox = $this.parents('.slot-box');
                    var $slot = $slotBox.find('.slot');
                    var $slotInfo = $slotBox.find('.slot-info');

                    $slot.data('sound', null);
                    $slot.removeClass().addClass('slot');

                    $slotInfo.empty();

                    self.checkFinished();
                }

                e.stopPropagation();
            };

            var manageDrop = function($slot) {
                $slot.droppable({
                    hoverClass: 'drop-active',
                    drop: function(event, ui) {
                        if(!self.playing) {
                            var $this = $(this);
                            var $slotInfo = $this.parents('.slot-box').find('.slot-info').empty();

                            var $drop = $(ui.draggable);

                            var soundInfo = $drop.data('sound');

                            $this.data('sound', soundInfo);
                            $this.addClass($drop.data('mood'));
                            $this.addClass('full');

                            var $link = $('<a>').attr('href', soundInfo.url).attr('target', '_blank');

                            var $frame = $('<img>').attr('src', soundInfo.frame).appendTo($link);
                            var $title = $('<p>').html(soundInfo.video).appendTo($link);

                            $link.appendTo($slotInfo);

                            self.checkFinished();
                        }
                    }
                });
            };

            for (var i = 0; i < this.slots; i++) {
                var $slotBox = $('<div>')
                    .addClass('slot-box');

                var $slot = $('<div>')
                    .addClass('slot')
                    .data('sound', null);

                manageDrop($slot);

                var $close = $('<button>')
                    .addClass('clear-slot')
                    .text('X')
                    .on('click', clearSlot);

                var $slotInfo = $('<div>')
                    .addClass('slot-info');

                $close.appendTo($slot);

                $slot.appendTo($slotBox);
                $slotInfo.appendTo($slotBox);

                $slotBox.appendTo(self.$slots);
            }
        },
        getActive: function() {
            return this.$slots.find('.slot').filter(function(i, slot) {
                return $(slot).data('sound') !== null;
            });
        },
        serialize: function() {
            return this.getActive().map(function(i, slot) {
                return $(slot).data('sound');
            }).get();
        },
        checkFinished: function() {
            if(this.serialize().length === this.slots) {
                this.$save.prop('disabled', false);
            } else {
                this.$save.prop('disabled', true);
            }
        },
        preview: function() {
            var self = this;

            if(!self.playing) {
                var $active = this.getActive();
                var current = 0;

                var playBlock = function(i) {
                    i = i || 0;

                    if(i < $active.length) {
                        var $current = $($active[i]);
                        var currentData = $current.data('sound');

                        $active.removeClass('drop-active');
                        $current.addClass('drop-active');

                        self.$player.attr('src', sound(currentData.file));

                        var player = self.$player.get(0);

                        // player.currentTime = 0;
                        player.play();

                        self.$player.one('ended', function() {
                            current++;
                            playBlock(current);
                        });
                    } else {
                        self.playing = false;
                        $active.removeClass('drop-active');

                        self.$preview.prop('disabled', false);
                    }

                };
                self.playing = true;
                self.$preview.prop('disabled', true);
                playBlock();
            }

        },
        save: function() {
            var self = this;
            var payload = {
                ambient: self.currentAmbient,
                sounds: self.serialize()
            };

            $.ajax({
                method: 'POST',
                data: payload
            })
            .done(function(data) {
                var url =  window.location + 's/' + data.id;

                var twitter_share = 'https://twitter.com/home?status=Check out my City Symphony ';
                var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';


                self.$end.find('.url').val(url);
                self.$end.find('.twitter').attr('href', twitter_share + url);
                self.$end.find('.facebook').attr('href', facebook_share + url);
                self.$end.find('.link').attr('href', url);

                self.$end.removeClass('hidden');
            })
            .fail(function(xhr, status, error){
                throw new Error(error);
            });
        }
    };

    return Player;
});