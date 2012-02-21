metronome = function (spec, my) {
    var that;
    my = my || {};
    
    var bpm = spec.bpm || 80;
    var detail = spec.detail || 1;
    var time = 60000/(bpm*detail);
    
    var n = 0;
    
    var tick = function () {
        setInterval(tick, time);
        spec.event.notify("tick",n);
        n++;
        if (n >= 4*detail) {
            n = 0;
        }
    }
}