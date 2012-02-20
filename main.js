window.onload = function () {
    console.log("loaded");
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
