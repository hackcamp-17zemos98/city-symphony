define(['jquery', 'jquery-ui'], function($) {
    var Canvas = {
        init: function(setup) {
            this.setup = setup;

            this.$element = setup.$element;
            this.$boxes = this.$element.find('.boxes');

            this.$buttonBoxes = this.$element.find('.buttons');

            this.boxes = setup.boxes;
            this.sounds = setup.sounds;

            return this;
        },
        build: function() {
            var self = this;

            $.each(this.boxes, function(id, box) {
                var $box = $('<div>')
                    .addClass('box active ' + id)
                    .on('click', function(e) {

                        self.$boxes.find('.box').removeClass('active');
                        $(this).addClass('active');
                        self.$buttonBoxes.find('.intro').addClass('hidden');
                        self.$buttonBoxes.find('.help').removeClass('hidden');


                        self.$buttonBoxes.find('.button-box').addClass('hidden');
                        $popover.removeClass('hidden');
                    });

                var $img = $('<img>').attr('src', box.img);
                var $button = $('<div>')
                    .addClass('button')
                    .html(id);

                $img.appendTo($box);
                $button.appendTo($box);

                $box.appendTo(self.$boxes);

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


            });
        }
    };

    return Canvas;
});