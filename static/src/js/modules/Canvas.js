define(['jquery', 'jquery-ui'], function($) {
    var Canvas = {
        init: function(setup) {
            this.setup = setup;

            this.$element = setup.$element;
            this.$buttonBoxes = this.$element.find('.buttons');

            this.boxes = setup.boxes;
            this.sounds = setup.sounds;

            return this;
        },
        build: function() {
            var self = this;

            $.each(this.boxes, function(id, box) {
                var $box = $('<div>')
                    .addClass('box ' + id)
                    .on('click', function(e) {
                        self.$buttonBoxes.find('.button-box').addClass('hidden');
                        $popover.removeClass('hidden');
                    });

                var $popover = $('<div>')
                    .addClass('button-box hidden');

                $popover.appendTo(self.$buttonBoxes);

                $.each(box.sounds, function(mood, sound) {

                    var $button = $('<div>')
                        .addClass('sound-box ' + mood)
                        .data('sound', self.sounds[sound])
                        .data('mood', mood)
                        .text(id + ' ' + mood);

                    $button.appendTo($popover);
                    $button.draggable({
                        cursor: "move",
                        revert: "invalid",
                        helper: "clone"
                    });
                });


                $box.appendTo(self.$element);
            });
        }
    };

    return Canvas;
});