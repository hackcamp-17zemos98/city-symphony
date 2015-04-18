define(['modernizr'], function(Modernizr) {
    return function(src) {
        return Modernizr.audio.mp3 === 'probably' ? src + '.mp3' : src + '.ogg';
    };
});