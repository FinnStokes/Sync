window.onload = function () {
    var canvas = jQuery('#game').get(0);
    var stage = new Stage(canvas);
    
    var eventMan = event();
    var timer = metronome({
        'event': em,
    });
    
    var rhythms = [];
    rhythms.push(rhythm({
        '': ,
    });
    
    var player1 = controller({
        'event': em,
    });
    

    var start;
    var sync = synchroniser({
        'leniency': 0.2,
        'rhythms': [
            '.   .   ',
            '. . . . '
        ],
    });
    sync.enable(1);
    
    document.tick = function () {
        start = new Date();
        console.log(sync.endBar());
        var t = setTimeout("document.tick()", 4000);
        var t2 = setTimeout("document.flash(1)", 100);
    }

    document.flash = function (n) {
        console.log(n);
        if (n < 4) {
            var t = setTimeout("document.flash("+(n+1)+")", 1000);
        }
    }

    document.tick();
    
    document.onkeydown = function () {
        var now = new Date();
        sync.beat((now.getTime() - start.getTime())/1000);
    }
};
