// Our global Game Variables
var Menu, Level;

var clientHeight = function () { if (devicePixelRatio === 1){return 800} else return Math.max(window.innerHeight, document.documentElement.clientHeight);};
var clientWidth = function () {if (devicePixelRatio === 1){return 800} else return Math.max(window.innerWidth, document.documentElement.clientWidth);};
highScore = localStorage.getItem("highscore");


var scaleRatio = window.devicePixelRatio - 0.5;

var Score = 0;
var Highscore = 0;

// Init Game
var game = new Phaser.Game(Math.round(clientWidth() / 50 ) * 50,
    clientHeight() +50 ,
    Phaser.CANVAS,
    'game'
);





console.log(clientWidth() , devicePixelRatio)
//console.log(window.innerHeight)
//console.log(window.outerHeight)
//var box= document.getElementById('div_﻿game');﻿


//var scaleFactor = box.clientHeight/game.height;﻿﻿


// First State
var Main = function (game) {

    this.game = game;
};

Main.prototype = {

    init: function () {






    },


    preload: function () {
        game.load.image('player', 'assets/images/logo_rot_300.png')
        game.load.spritesheet('spark', 'assets/images/spark.png',64,64,3,0,0,3)
        game.load.image('wall', 'assets/images/wall1.png')
        game.load.image('space', 'assets/images/space_new5.png')
        game.load.image('particles', 'assets/images/particles.png')
        game.load.image('bullet', 'assets/images/bullet.png')
        game.load.image('restart', 'assets/images/restart.png')
        game.load.image('jump', 'assets/images/jump.png')
        game.load.image('left', 'assets/images/left.png')
        game.load.image('right', 'assets/images/right.png')
        game.load.image('shoot_button', 'assets/images/shoot_button.png')
        game.load.image('boost_button', 'assets/images/boost_button.png')
        game.load.spritesheet('joystick', 'assets/images/gamepad_spritesheet.png',100,100)
        game.load.script('Level', 'states/Level.js');
        game.load.script('Score', 'states/End_screen.js');
        game.load.script('Gamepad', 'plugins/phaser-plugin-virtual-gamepad.js');

     //   var gamepad = gamepad.plugins.add(Phaser.Plugin.VirtualJoystick)


    },

    // adjust :function() {	var divgame = document.getElementById("game");	divgame.style.width = window.innerWidth + "px";	divgame.style.height = window.innerHeight + "px";}window.addEventListener('resize', function() {       adjust();   })

    create: function () {

        game.time.advancedTiming = true;

       // game.scale.startFullScreen()
        // img = game.add.sprite(game.world.centerX, game.world.centerY, 'img');
        game.state.add("Level", Level);
        game.state.add("Score", Endscreen);
        game.state.start('Level');

      //  if (aspect_ratio > 1) scale_ratio = canvas_height / canvas_height_max;
       // else scale_ratio = canvas_width / canvas_width_max;

       // this.ball = game.add.sprite((game.world.centerX), game.world.centerY, 'ball');
        //this.ball.scale.set(scale_ratio);

      //  this.scale.pageAlignHorizontally = true;

        this.scale.pageAlignVertically = true;

        //screen size will be set automatically

     //   this.scale.setScreenSize(true);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      //  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
       // this.scale.preserveAspectRatio = true;
       // this.scale.minWidth = 320;
        //this.scale.minHeight = 480;
       //this.scale.maxWidth = 800;
       //this.scale.maxHeight = 600;


game.scale.refresh()
    },


};

game.state.add('Main', Main);
game.state.start('Main');
