var Endscreen = function (game) {
};

Endscreen.prototype = {

    preload: function () {


    },


    create: function () {


/*
        if (Score >= Highscore){
            Highscore= Score;
       }
*/


console.log(highScore)
        if(highScore!== null){
            if (Score > highScore) {
                window.localStorage.setItem("highscore", Score);
            }
        }
        else{
            window.localStorage.setItem("highscore", Score);
        }

        console.log("TEST"+highScore)

this.score = game.add.text(game.world.centerX,game.world.centerY,Score,{ fontSize: '64px', fill: '#f00' })
this.Highscore = game.add.text(0,game.world.centerY-100,"Highscore "+localStorage.getItem("highscore"),{ fontSize: '36px', fill: '#f00' })
this.restartButton = game.add.button(game.world.centerX,game.world.centerY+100,"restart",this.restartGame)

this.Highscore.centerX = this.game.world.centerX
this.score.centerX = this.game.world.centerX
this.restartButton.centerX = this.game.world.centerX





    },

    restartGame:function(){
        this.game.state.start("Level")
    },


    update: function () {


    },

    render: function () {


    }
}
;