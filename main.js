window.onload = function () {
    var canvas = document.getElementById("game");
    var stage = new Stage(canvas);
    
    var eventMan = eventManager();
    var timer = metronome({
        'event': eventMan,
        'detail': 2,
    });
    
    var rhythms = [];
    rhythms.push(rhythm({
        'event': eventMan,
        'metronome': timer,
        'pattern': ". . . . ",
    }));
    
    var player1 = controller({
        'event': eventMan,
        'lenience': 200,
        'name': "Player 1",
    });
    
    var player2 = controller({
        'event': eventMan,
        'lenience': 200,
        'name': "Player 2",
    });

    //eventMan.subscribe('tick', function (data) {
    //    console.log("tick");
    //});
    
    eventMan.subscribe('beat', function (data) {
        //console.log("beat");
        player2.beat();
    });
    
    eventMan.subscribe('synchronised', function (data) {
        console.log(data.controller+" synchronised");
    });
    
    var img = new Image();
    img.onload = function () {
        var sprite = new SpriteSheet({
            'images': [img],
            'frames': {
                'width': 64,
                'height': 64,
            },
            'animations': {
                'still': [0,0,"still"],
                'beat': [1,11,"still"],
            },
        });
        var beat = new BitmapAnimation(sprite);
        beat.x = 0;
        beat.y = 0;
        beat.gotoAndPlay('still');
        stage.addChild(beat);
        eventMan.subscribe('beat', function (data) {
            if (data.rhythm.id() == 0) {
                beat.gotoAndPlay('beat');
            }
        });
    }
    img.src = "Beat.png";
    
    timer.start();
    
    Ticker.addListener(stage);
    
    document.onkeydown = function () {
        player1.beat();
    }
    
    /*var start;
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
    }*/
};
