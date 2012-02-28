rhythm = (function () {
    var nextId = 0;
    return function (spec, my) {
        var that, id;
        my = my || {};
        
        that = {};

        id = nextId;
        nextId++;
        
        var pattern = spec.pattern || "";
        var bars = spec.bars || 1;

        that.id = function () {
            return id;
        }
        
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

        if (spec.event) {
            spec.event.subscribe("tick", function (data) {
                if (that.hasBeat(data.beat + (data.bar % bars)*spec.metronome.barLength())) {
                    spec.event.notify("beat", {
                        'rhythm': that,
                    });
                } else {
                    spec.event.notify("offbeat", {
                        'rhythm': that,
                    });
                }
            });
        }

        return that;
    }
}());