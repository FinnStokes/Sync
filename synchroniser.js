synchroniser = function (spec, my) {
    var that;
    my = my || {};
    
    that = {};
    
    var beats = [];
    my.rhythms = [];

    var barTime = spec.barTime || 4;
    var beats = spec.beats || 8;
    var syncLevel = spec.syncLevel || 0.9;
    var leniency = spec.leniency || 0.1;
    var beatTime = barTime / beats;
    
    var synchronisation = [];
    var hit = [];
    var enabled = [];
    
    for (i in spec.rhythms) {
        my.rhythms.push(rhythm({'pattern': spec.rhythms[i]}));
        synchronisation.push(0);
        hit.push([])
    }
    
    that.enable = function (beatNo) {
        enabled[beatNo] = true;
    }
    
    that.disable = function (beatNo) {
        enabled[beatNo] = false;
    }
    
    that.beat = function (time) {
        time = time % barTime;
        if (time < beats[beats.length-1]) {
            console.log("Overran bar");
            time += barTime;
            //return;
            //that.endBar();
        }
        
        beats.push(time);
        
        var beatNo = Math.floor(time / beatTime);
        var beatDelay = time % beatTime;
        
        for (i in my.rhythms) {
            if (my.rhythms[i].hasBeat(beatNo)) {
                if (hit[i][beatNo] || beatDelay > leniency) {
                    synchronisation[i]--;
                } else {
                    hit[i][beatNo] = true;
                    synchronisation[i]++;
                }
            } else {
                synchronisation[i]--;
            }
        }
    }

    that.endBar = function () {
        var synched = [];
        beats = [];
        for (i in synchronisation) {
            if (enabled[i] && synchronisation[i]/my.rhythms[i].beats() >= syncLevel) {
                synched.push(i);
            }
            console.log(synchronisation[i]/my.rhythms[i].beats());
            synchronisation[i] = 0;
            hit[i] = [];
        }
        return synched;
    }
    
    return that;
}