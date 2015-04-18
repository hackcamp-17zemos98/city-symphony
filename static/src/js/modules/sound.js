define(['modernizr'], function(Modernizr) {
    console.log(Modernizr.audio.ogg);
    return function(src) {
        return Modernizr.audio.mp3 === 'probably' ? src + '.mp3' : src + '.ogg';
    };
});