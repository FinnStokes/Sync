rhythm = function (spec, my) {
    var that;
    my = my || {};
    
    that = {};
    
    var pattern = spec.pattern || "";
    
    that.hasBeat = function (no) {
        return spec.pattern[no] == '.';
    }
    
    var beats = 0;
    for (i in pattern) {
        if (that.hasBeat(i)) {
            beats++;
        }
    }

    that.beats = function () {
        return beats;
    }

    return that;
}
