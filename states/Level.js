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
        this.timerspeed = 200
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);


        //joystick
        this.gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad)
        this.joystick = this.gamepad.addJoystick(-280 / devicePixelRatio, game.world.height - 100, 1.4, 'joystick');
        this.button = this.gamepad.addButton(-110, -110, 1.0, 'joystick');
        // console.log(this.button)


//buttons
        this.buttonGroup = game.add.group()


      //  this.jumpButton = game.add.button((game.world.width / devicePixelRatio) + game.world.centerX / 1.5 + 15, game.world.height - 160, 'jump', this.jump, this, 2, 1, 0);
        // this.rightButton = game.add.button(125, game.world.height - 1000, 'right', this.goRight, this, 2, 1, 0);
        // this.leftButton = game.add.button(0, game.world.height - 1000, 'left', null, this, 2, 1, 0);

        //this.jumpButton.scale.setTo(0.8)


      //  this.leftButton = game.add.button(10, game.world.height - 130, "left")
       // this.rightButton = game.add.button(this.leftButton.width / 1.5, game.world.height - 130, "right")
        this.checkMoveright = false;
        this.checkMoveleft = false;


        this.shootButton = game.add.button((game.world.width / devicePixelRatio) + game.world.centerX / 2, game.world.height - 175, "shoot_button", this.shooting, this)
        this.shootButton.scale.setTo(0.6)
        this.shootButton.alpha = 1;

        this.boostButton = game.add.button(game.world.width - 250, game.world.height - 80, "boost_button", this.Boost, this)
        this.boostButton.scale.setTo(0.6)
        this.boostButton.alpha = 1;


        // this.buttonGroup.addMultiple([this.jumpButton, this.shootButton, this.boostButton]);

        //score
        this.points = 0;
        this.scoreText = game.add.text(25, 25, this.points, {fontSize: '64px', fill: '#f00'});


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

        // console.log(this.joystick.properties)

        //  this.rightButton.onInputDown.add(this.moveOn(this.checkMoveright), this)
        //   this.rightButton.onInputUp.add(this.moveOff(this.checkMoveright), this)

        this.spark = game.add.sprite(this.player.x, this.player.y, 'spark')
        this.spark.animations.add('sparking')
        this.spark.animations.play('sparking', 50, true)
        this.spark.kill()

        this.tilesprite.scale.set(2.5)
        this.rescale()


        this.spark.anchor.set(0.5, 0.5)
        this.spark.scale.set(1.5)
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


            this.joystick.scale.setTo(1)
            this.shootButton.scale.setTo(0.4)
            this.boostButton.scale.setTo(0.4)
            //this.jumpButton.scale.setTo(0.6)
          //  this.leftButton.scale.setTo(0.5)
           // this.rightButton.scale.setTo(0.5)

            //this.jumpButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 1.5 + 40;
            this.shootButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 25;
            this.boostButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 25;
            this.rightButton.x = this.rightButton.x - 15

        }

        else if (devicePixelRatio === 3) {

            this.joystick.scale.setTo(1)
            this.shootButton.scale.setTo(0.4)
            this.boostButton.scale.setTo(0.4)
            //this.jumpButton.scale.setTo(0.6)
            //this.leftButton.scale.setTo(0.4)
            //this.rightButton.scale.setTo(0.4)

            //this.jumpButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 1.5 + 15;
            //this.shootButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 10;
            //this.boostButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 10;

        }

        else if (devicePixelRatio >= 2) {
            this.joystick.scale.setTo(1)
            this.shootButton.scale.setTo(0.4)
            this.boostButton.scale.setTo(0.4)
          //  this.jumpButton.scale.setTo(0.6)
          //  this.leftButton.scale.setTo(0.4)
           // this.rightButton.scale.setTo(0.4)

          //  this.jumpButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 1.5 + 10;
            this.shootButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 5;
            this.boostButton.x = (game.world.width / devicePixelRatio) + game.world.centerX / 2 + 5;
        }
        if (devicePixelRatio === 1) {


            this.joystick.scale.setTo(1)
            this.shootButton.scale.setTo(0.6)
            this.boostButton.scale.setTo(0.6)
          //  this.jumpButton.scale.setTo(0.8)
          //  this.leftButton.scale.setTo(0.6)
          //  this.rightButton.scale.setTo(0.6)

           // this.jumpButton.x = game.world.width - 150;
            this.shootButton.x = game.world.width - 200;
            this.boostButton.x = game.world.width - 200


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
        //  wall.scale.set(0.9)

    }
    ,

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


        for (var i = 0; i < pipeAmount; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(i * 50, -50);
        this.addPoint();


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
                Score = this.points
                this.game.state.start("Level");
            }
            if (this.player.body.onFloor()) {
                Score = this.points
                this.game.state.start("Level");
            }
        }
        game.physics.arcade.overlap(this.bullets, this.walls, this.bulletHit)

        if (this.godMode === true) {
            game.physics.arcade.overlap(this.player, this.walls, this.bulletHit)
        }


    }
    ,
    bulletHit: function (thing1, thing2) {


        this.emitter = game.add.emitter(thing2.centerX, thing2.centerY);
        this.emitter.makeParticles('particles');
        this.emitter.gravity = 40;


        this.emitter.start(true, 2500, null, 10)

        thing2.kill();
        game.camera.shake(0.005, 500)


    },

    Boost: function () {

        this.boostButton.inputEnabled = false;
        this.walls.killAll()
        this.godMode = true;
        this.player.body.gravity.y = 100;
        this.player.jump = -100;
        this.tilesprite.autoScroll(0, 500);
        this.timerspeed = 1000
        this.timer.delay = 300;
        this.emitter.gravity = 500;
        this.boostTimer = game.time.events.add(5000, this.disableBoost, this)
        game.add.tween(this.boostButton).to({alpha: 0.5}, 200, Phaser.Easing.Linear.None, true);


    },
    disableBoost: function () {

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


        this.points++;

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
            this.time.events.add(300, function () {
                this.secondClick = false;

            }, this);
            return ;
        }

        console.log("doubletap")
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


        //  this.leftButton.onInputDown.add(this.moveleftOn, this)
        //  this.leftButton.onInputUp.add(this.moveleftOff, this)

        //  this.rightButton.onInputDown.add(this.moverightOn, this)
        //  this.rightButton.onInputUp.add(this.moverightOff, this)


        if (this.godMode === true) {
            this.spark.revive()
            this.spark.animations.add('sparking')
            this.spark.animations.play('sparking', 50, true)

            this.spark.position.set(this.player.x, this.player.y)
            this.player.angle -= 300

            this.spark.angle += 300

            console.log(this.spark.angle)

        }
        else {
            this.spark.kill()
            this.player.angle = 0;
        }

        // this.leftButton.onInputOut = this.left()
        //this.rightButton.onInputDown = this.right()
        if (this.spaceKey.justDown) {
            this.shooting()
            if (this.godMode === false) {
                this.Boost();

            }
            else {

                this.disableBoost()

            }

        }
        /*
                if (game.input.pointer1.isDown ) {
                    if (game.input.pointer1.x < game.world.centerX / 2) {
                        this.player.body.velocity.x = -440;

                    }
                    else if (game.input.pointer1.x > game.world.centerX / 2 && game.input.pointer1.x < game.world.centerX) {
                        this.player.body.velocity.x = 440;
                    }

                }
                    if (game.input.pointer2.isDown) {
                        if (game.input.pointer2.x < game.world.centerX / 2) {
                            this.player.body.velocity.x = -440;

                        }
                        else if (game.input.pointer2.x > game.world.centerX / 2 && game.input.pointer2.x < game.world.centerX) {
                            this.player.body.velocity.x = 440;
                        }


                    }
                    */
        this.player.body.acceleration.x = 340 * this.joystick.properties.x;
        if (this.godMode === true) {
//
            //   this.player.body.velocity.y = 0;
        }

        if (this.button.isUp) {
            //  this.player.body.velocity.y = -230;
        }


    }
    ,


    update: function () {

        this.scoreText.text = this.points;

        this.player.body.velocity.x = 0;

        this.player.physicsEnabled = true;


        this.player.body.setZeroVelocity = true;


        //this.playerMovement();
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


            console.log(this.swipeDiffX)
            if (this.swipeDiffX < -100) {
                this.checkMoveleft = true
            }
            if (this.swipeDiffX > 100) {
                this.checkMoveright = true
            }
            if (this.swipeDiffY < -100) {
                this.jump()
            }
        }
        if (game.input.activePointer.isUp) {
            if (this.down === true) {

                if (this.swipeDiffX === 0 && this.swipeDiffY === 0) {


                    if (this.confirmDoubleClick(game.input.activePointer.isDown )) {
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