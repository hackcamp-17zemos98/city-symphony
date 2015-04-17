define(['jquery'], function($) {
    var Player = {
        init: function(setup) {
            this.$element = setup.$element;
            //TODO move this to app config
            this.$ambients = this.$element.find('.ambients');
            this.$slots = this.$element.find('.slots');


            this.$preview = this.$element.find('.preview');
            this.$save = this.$element.find('.save');

            this.sounds = setup.sounds;
            this.backgroundSounds = setup.backgroundSounds;

            this.slots = 10;
            this.defaultSlotDuration = 5;

            this.$preview.on('click', this.preview);
            this.$save.on('click', this.save);

            return this;
        },
        build: function() {
            var self = this;
            //Ambient
            //TODO callback to edit result JSON
            $.each(this.backgroundSounds, function(i, ambient) {
                $('<button>')
                    .addClass('ambient-switch')
                    .data('file', ambient.file)
                    .text(ambient.name)
                    .on('click', function(e) {
                        var $this = $(this);

                        var $audio = $this.parent().find('audio');

                        $audio.attr('src', ambient.file);
                        $audio.get(0).currentTime = 0;
                        $audio.get(0).play();

                    })
                    .appendTo(self.$ambients);
            });

            //Start first
            // this.$ambients.find('button').first().trigger('click');

            //Slots
            //

            var clearSlot = function(e) {
                var $this = $(this);
                $this.parent().data('sound', null);
                $this.parent().removeClass().addClass('slot');
                self.checkFinished();

                e.stopPropagation();
            };

            var manageDrop = function($slot) {
                $slot.droppable({
                    hoverClass: 'drop-active',
                    drop: function(event, ui) {
                        var $this = $(this);
                        var $drop = $(ui.draggable);

                        $this.data('sound', $drop.data('sound'));
                        $this.addClass($drop.data('mood'));

                        self.checkFinished();
                    }
                });
            };

            for (var i = 0; i < this.slots; i++) {
                var $slotBox = $('<div>');

                var $slot = $('<div>')
                    .addClass('slot');

                manageDrop($slot);

                var $close = $('<button>')
                    .addClass('clear-slot')
                    .text('X')
                    .on('click', clearSlot);

                var $slotInfo = $('<div>')
                    .addClass('slot-info')
                    .html('slot info');

                $close.appendTo($slot);

                $slot.appendTo($slotBox);
                $slotInfo.appendTo($slotBox);

                $slotBox.appendTo(self.$slots);
            }
        },
        serialize: function() {
            var result = [];
            this.result = null;

            var $activeSlots = this.$slots.find('.slot').filter(function(i, slot) {
                var $slot = $(slot);

                if($slot.data('sound')) {
                    result.push($slot.data('sound'));
                }
            });

            this.result = result;
        },
        checkFinished: function() {
            this.serialize();

            if(this.result.length === 10) {
                this.$save.prop('disabled', false);
            } else {
                this.$save.prop('disabled', true);
            }
        },
        preview: function() {

        }
    };

    return Player;
});