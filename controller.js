var controller = (function () {
    var nextId = 0;
    return function (spec, my) {
        var that, rhythms, beat;
        my = my || {};
        
        that = {};
        
        rhythms = [];
        
        var lenience = spec.lenience || 100;
        var syncLevel = spec.syncLevel || 0.9;
        var name = spec.name;
        if(!name) {
            name = "Controller "+nextId;
            nextId++;
        }
        
        that.beat = function () {
            var now = (new Date()).getTime();
            for (i in rhythms) {
                var r = rhythms[i];
                if (now - r.start < spec.lenience && !r.hit[beat]) {
                    //console.log(name+" hit");
                    r.hit[beat] = true;
                    r.synch++;
                } else {
                    //console.log(name+" miss");
                    r.synch--;
                }
            }
        }
        
        var newBar = function () {
            for (i in rhythms) {
                var r = rhythms[i];
                var level = r.synch / r.rhythm.beats();
                //console.log(level);
                if (level > syncLevel) {
                    spec.event.notify('synchronised',{
                        'rhythm': r,
                        'level': level,
                        'controller': name,
                    });
                }
                r.hit = [];
                r.synch = 0;
            }
        }
        
        if (spec.event) {
            spec.event.subscribe("beat", function (data) {
                if(!rhythms[data.rhythm.id()]) {
                    rhythms[data.rhythm.id()] = {
                        'start': (new Date()).getTime(),
                        'hit': [],
                        'synch': 0,
                        'rhythm': data.rhythm,
                    }
                } else {
                    rhythms[data.rhythm.id()].start = (new Date()).getTime();
                }
            });
            spec.event.subscribe("tick", function (data) {
                beat = data.beat;
                if (beat === 0) {
                    newBar();
                }
            });
        }
        
        return that;
    };
}());