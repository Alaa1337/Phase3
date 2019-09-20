var Level = function (game) {
};

Level.prototype = {

    preload: function () {


    },


    create: function () {


        //  this.game.scale.refresh();

        this.pointerPos = game.input.activePointer.positionDown.x;

        this.tilesprite = game.add.tileSprite(0, 0, game.width, game.height, 'space');
        this.backgroundspeed = 20
        this.tilesprite.autoScroll(0, this.backgroundspeed);


        this.emitter = game.add.emitter();


        //start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // player
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

        this.player.smoothed = true
        game.physics.arcade.enable(this.player);
        // game.physics.arcade.gravity.y = 400;
        this.player.body.gravity.y = 400;
        this.player.speed = 440;
        this.player.jump = -230;
        this.player.body.setZeroDamping = true;
        this.player.body.fixedRotation = true;
        this.player.body.collideWorldBounds = true;
        this.godMode = false;

        this.bullets = game.add.group()

        // Movementx
        this.down = false;
        this.swipeLastX = this.swipeLastY = this.swipeDiffX = this.swipeDiffY = 0;


        //walls
        this.walls = game.add.group();
        this.invWalls = game.add.group();


        this.timerspeed = 200
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);


        // console.log(this.button)


//buttons
        this.buttonGroup = game.add.group()



        this.checkMoveright = false;
        this.checkMoveleft = false;


        this.shootButton = game.add.button(game.world.centerX, 25, "shoot_button", this.shooting, this)
        this.shootButton.scale.setTo(0.6)
        this.shootButton.alpha = 1;

        this.boostButton = game.add.button(game.world.width - 250, 25, "boost_button", this.Boost, this)
        this.boostButton.scale.setTo(0.6)
        this.boostButton.alpha = 1;


        // this.buttonGroup.addMultiple([this.jumpButton, this.shootButton, this.boostButton]);

        //score
        this.currentScore = 0;
        this.scoreText = game.add.text(25, 25, this.currentScore, {fontSize: '64px', fill: '#7b7b7b'});


        //keyboard
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.tap = game.input.pointer1;

        game.stage.backgroundColor = "#590000"


        this.player.scale.set(1)
        // this.player.scale.set(1.5)
        //    this.walls.scale.set(1.5);
        //   this.emitter.scale.set(1.5)
        //  this.bullets.scale.set(1.5)
        // this.player.scale.set(0.9)





        //

        this.tilesprite.scale.set(scaleRatio / (scaleRatio / 2))

        this.rescale()

        this.spark = game.add.sprite(this.player.x, this.player.y + 150, 'boost');

        this.spark.animations.add('boosting');

        this.spark.animations.play('boosting', 50, true);
        this.spark.alpha = 0;
        this.spark.angle = 90
this.spark.smoothed
        this.spark.kill()


        this.spark.anchor.set(0.5, 0.5)
        this.spark.scale.set(2.0)
        this.player.anchor.set(0.5, 0.5)


        /*
        game.input.onTap.add(this.onTap, this);
        game.input.onTap.*/

    },
    /*
        onTap: function(pointer, doubleTap) {
            console.log(pointer)
        },*/

    rescale: function () {
        if (devicePixelRatio > 3) {


            //this.shootButton.scale.setTo(0.4)
            //this.boostButton.scale.setTo(0.4)




        }

        else if (devicePixelRatio === 3) {


            this.shootButton.scale.setTo(0.4)
            this.boostButton.scale.setTo(0.4)




            //this.shootButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 10;
            //this.boostButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 10;

        }

        else if (devicePixelRatio >= 2) {

            this.shootButton.scale.setTo(0.4)
            this.boostButton.scale.setTo(0.4)

            //  this.shootButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 5;
            // this.boostButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 5;
        }
        if (devicePixelRatio === 1) {


            this.shootButton.scale.setTo(0.6)
            this.boostButton.scale.setTo(0.6)

            //  this.shootButton.x = game.world.width - 200;
            // this.boostButton.x = game.world.width - 200


        }
        game.scale.refresh()
        this.buttonGroup.fixedToCamera = true

    },

    stop: function () {
        this.player.body.velocity.x = 0;
    },

    shootingCooldown: function () {
        this.shootButton.inputEnabled = true;
        game.add.tween(this.shootButton).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
    },
    boostingCooldown: function () {

        this.boostButton.inputEnabled = true;

        game.add.tween(this.boostButton).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true);
    },

    shooting: function () {
        var bullet = game.add.sprite(this.player.x, this.player.y - 100, 'bullet')

        bullet.scale.set(this.player.scale.x, this.player.scale.y)
        this.bullets.add(bullet)
        game.physics.arcade.enable(bullet);

        bullet.body.velocity.y = -500;
        bullet.anchor.set(0.5)

        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true
        this.shootButton.inputEnabled = false;
        this.shootTimer = game.time.events.add(5000, this.shootingCooldown, this)
        game.add.tween(this.shootButton).to({alpha: 0.5}, 200, Phaser.Easing.Linear.None, true);
    }
    ,


    addOnePipe: function (x, y) {
        // Create a pipe at the position x and y


        var wall = game.add.sprite(x, y, 'wall');

        var i = 0;

        // Add the pipe to our previously created group
        this.walls.add(wall);



        // Enable physics on the pipe
        game.physics.arcade.enable(wall);

        wall.physicsEnabled = true;



        // Add velocity to the pipe to make it move left
        wall.body.velocity.y = +this.timerspeed;


        // Automatically kill the pipe when it's no longer visible
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;


     //   inv.outOfBoundsKill = true;
        //  wall.scale.set(0.9)

    },
    addInvWall: function ( y) {
        // Create a pipe at the position x and y



        var inv = game.add.sprite(0, y, 'invWall');


        // Add the pipe to our previously created group

        this.invWalls.add(inv);


        // Enable physics on the pipe

        game.physics.arcade.enable(inv);

        inv.physicsEnabled = true;


        // Add velocity to the pipe to make it move left

        inv.body.velocity.y = +this.timerspeed;

        // Automatically kill the pipe when it's no longer visible


        inv.checkWorldBounds = true;
     //   inv.outOfBoundsKill = true;
        //  wall.scale.set(0.9)

    },

    jump: function () {
        this.player.body.velocity.y = this.player.jump;
    },
    left: function () {
        if (this.checkMoveleft) {
            this.player.body.velocity.x = -this.player.speed;
        }
    },
    right: function () {
        if (this.checkMoveright) {
            this.player.body.velocity.x = this.player.speed;
        }
    },


    addRowOfPipes: function () {


        var pipeAmount = Math.round(clientWidth() / 50)

//var pipeAmount2 = pipeAmount - 1


        // This will be the hole position
        var hole = Math.floor(Math.random() * pipeAmount);
        // console.log(pipeAmount, hole)


        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'


        for (var i = 0; i < pipeAmount; i++) {
            if (i != hole && i != hole + 1)
                this.addOnePipe(i * 50, -50);
        }
this.addInvWall(-100)

        /*
                if (window.devicePixelRatio >= 2) {
                    for (var i = 0; i < 16; i++)
                        if (i != hole && i != hole + 1)
                            this.addOnePipe(i * 50, -50);
                    this.addPoint();
                }
        */
    }
    ,


    colissionDetect: function () {
        if (this.godMode === false) {

            if (game.physics.arcade.overlap(this.player, this.walls.children,)) {
                Score = this.currentScore
                this.game.state.start("Score");
            }
            if (this.player.body.onFloor()) {
                Score = this.currentScore
                this.game.state.start("Score");
            }
        }
        game.physics.arcade.overlap(this.bullets, this.walls, this.bulletHit)



       if ( game.physics.arcade.overlap(this.player, this.invWalls,this.checkOverlap)){
           this.addPoint()
       }





        if (this.godMode === true) {
            game.physics.arcade.overlap(this.player, this.walls, this.bulletHit)
        }




       // game.physics.arcade.overlap(this.player,this.invWalls,this.givePoint,this.givePoint)


    },




    checkOverlap : function (thing1, thing2) {

thing2.kill()

},

    bulletHit: function (thing1, thing2) {


        this.emitter = game.add.emitter(thing2.centerX, thing2.centerY);
        this.emitter.makeParticles('particles');
        this.emitter.gravity = 40;


        this.emitter.start(true, 2500, null, 10)

        thing2.kill();
        game.camera.shake(0.005, 500)

    },


    Boost: function () {
        this.spark.revive()
        this.spark.alpha = 0;
        game.camera.flash(0xffffff, 700);

        this.boostButton.inputEnabled = false;
        this.walls.killAll()
        this.invWalls.killAll()
        this.godMode = true;
        this.player.body.gravity.y = 0;
        this.player.body.velocity.y = 0;
        this.player.jump = -160;
        this.tilesprite.autoScroll(0, 500);
        this.timerspeed = 1000
        this.timer.delay = 300;

        this.emitter.gravity = 500;
        this.boostTimer = game.time.events.add(5000, this.disableBoost, this)
        game.add.tween(this.boostButton).to({alpha: 0.5}, 200, Phaser.Easing.Linear.None, true);
        game.add.tween(this.spark).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
        // game.add.tween(this.player).to({y:game.world.centerY}, 300, Phaser.Easing.Linear.None,true);
        game.add.tween(this.player.body).to({y: game.world.centerY}, 4500, Phaser.Easing.Linear.None, true);


    },
    disableBoost: function () {
        this.spark.kill()
        game.camera.flash(0xffffff, 700);
        this.tilesprite.autoScroll(0, 20);
        this.player.body.gravity.y = 400;
        this.timerspeed = 200
        this.timer.delay = 1500;
        this.player.jump = -230;
        this.godMode = false
        this.walls.killAll()


        this.boostTimer2 = game.time.events.add(40000, this.boostingCooldown, this)
        this.player.body.acceleration.y = 0
    },


    addPoint: function () {
var that = this
            that.currentScore++;
    }
    ,

    moveleftOn: function () {
        this.checkMoveleft = true
    },
    moveleftOff: function () {
        this.checkMoveleft = false;
    },

    moverightOn: function () {
        this.checkMoveright = true
    },
    moverightOff: function () {
        this.checkMoveright = false;
    },


    confirmDoubleClick: function (itemBeingClicked, func) {
        if (!this.secondClick) {
            this.secondClick = true;
            this.time.events.add(175, function () {
                this.secondClick = false;

            }, this);
            return;
        }

       // console.log("doubletap")
        return true;
    },

    playerMovement: function () {
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.player.speed;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.player.speed;
        }

        if (this.cursors.up.justDown) {
            this.jump()


        }


        this.left()
        this.right()





        if (this.godMode === true) {

            // this.spark.animations.add('sparking')
            //this.spark.animations.play('sparking', 20, true)

            this.spark.position.set(this.player.x, this.player.centerY + 50)
            this.player.angle -= 300


            //console.log(this.spark.angle)

        }
        else {

            this.player.angle = 0;
        }


        if (this.spaceKey.justDown) {
            this.shooting()
            if (this.godMode === false) {
                this.Boost();

            }
            else {

                this.disableBoost()

            }

        }
    },




    update: function () {




        console.log(this.player.key)

        this.scoreText.text = this.currentScore;

        this.player.body.velocity.x = 0;

        this.player.physicsEnabled = true;

       // console.log( this.walls.getAll('body.y'))
        this.player.body.setZeroVelocity = true;

//this.test = this.walls.getAll('body')







      //
        //  console.log( this.walls.body)
        this.playerMovement();
        this.xmovement();
        this.left();
        this.right();


        this.colissionDetect();
        this.tilesprite.width = game.width
        this.tilesprite.height = game.height


    },

    xmovement: function () {

        if (game.input.activePointer.isDown) {
            if (this.down === false) {

            }
            this.down = true;
            this.swipeLastX = game.input.activePointer.position.x;
            this.swipeLastY = game.input.activePointer.position.y;
            this.swipeDiffX = Math.floor(this.swipeLastX - game.input.activePointer.positionDown.x);
            this.swipeDiffY = Math.floor(this.swipeLastY - game.input.activePointer.positionDown.y);
            /*
                        if (swipeLastX === game.input.activePointer.position.x && swipeLastY === game.input.activePointer.position.y) {
                            swipeAnimate++;
                        }*/


            //console.log(this.swipeDiffX)
            if (this.swipeDiffX < -15 && this.swipeDiffY > -30 && this.swipeDiffY < 30) {
                this.checkMoveleft = true
            }
            if (this.swipeDiffX > 15 && this.swipeDiffY > -30 && this.swipeDiffY < 30) {
                this.checkMoveright = true
            }
            if (this.swipeDiffY < -35) {
                this.jump()
            }
            if (this.swipeDiffY > 60 && this.shootButton.inputEnabled === true) {
                this.shooting()
            }
        }

       // console.log(game.input.activePointer.previousTapTime)

        if (game.input.activePointer.isUp) {
            if (this.down === true) {


                if (this.swipeDiffX < 10 && this.swipeDiffX > -10 && this.swipeDiffY < 10 && this.swipeDiffY > -10) {
                    if (this.confirmDoubleClick(game.input.activePointer.isDown)) {
                        if (this.godMode === false && this.boostButton.inputEnabled === true) {
                            this.Boost()
                        }
                    } else if (this.secondClick === false) {
                        this.shooting()
                    }

                }


                this.swipeDiffXOriginal = this.swipeDiffX;
                this.swipeDiffYOriginal = this.swipeDiffY;
                this.down = false;

                this.checkMoveleft = this.checkMoveright = false
            }

        }
    },


    render: function () {
        game.debug.text(game.time.fps, 15, 15, "green")

    }
}
;