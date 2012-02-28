metronome = function (spec, my) {
    var that;
    my = my || {};

    var bpm = spec.bpm || 80;
    var detail = spec.detail || 1;
    var time = 60000/(bpm*detail);
    
    var n = 0;
    var bar = 0;

    that = {};
    
    that.barLength = function () {
        return 4*detail;
    }
    
    var started = false;
    that.start = function () {
        if (!started) {
            setInterval(tick, time);
            started = true;
        }
    }
    
    var tick = function () {
        spec.event.notify("tick",{
            'beat': n,
            'bar': bar,
        });
        n++;
        if (n >= that.barLength()) {
            n = 0;
            bar++;
        }
    }

    return that;
}