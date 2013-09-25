(function (root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.DIM_X = this.canvas.width;
    this.DIM_Y = this.canvas.height;
    this.FPS = 30;
    this.asteroids = this.addAsteroids(5);
    this.bullets = [];
    this.ship = new Asteroids.Ship([this.DIM_X / 2, this.DIM_Y / 2], [0, 0])
    this.intervalId = 0;
  };

  Game.prototype.bindKeyHandlers = function() {
    that = this;
    key("right", function() { that.ship.direction = (that.ship.direction + 0.1) % (2 * Math.PI) } );
    key("left", function() { that.ship.direction = (that.ship.direction - 0.1) % (2 * Math.PI) } );
    key("up", function() { that.ship.power(0.4) } );
    key("space", function() { that.fireBullet() } );
  }

  Game.prototype.addAsteroids = function(numAsteroids){
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++){
      asteroids.push(Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y));
    }
    return asteroids;
  };

  Game.prototype.fireBullet = function(){
    this.bullets.push( this.ship.fireBullet() );
  }

  Game.prototype.draw = function() {
    that = this;
    this.ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
    this.ctx.drawImage(background,0,0);
    this.ship.draw(this.ctx);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach(function(bullet) {
      bullet.draw(that.ctx);
    });
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollideWith(that.ship)) {
        alert("Game over");
        that.stop();
      }
    });
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  Game.prototype.removeBullet = function(bullet) {
    this.bullets.splice(this.asteroids.indexOf(bullet), 1);
  }

  Game.prototype.move = function() {
    var that = this;
    this.ship.slowDown();
    this.ship.move(this.canvas);
    this.asteroids.forEach(function(asteroid) {
      asteroid.move(that.canvas);
    });
    this.bullets.forEach(function(bullet) {
      bullet.move(that.canvas, that);
    });
  };

  Game.prototype.step = function() {
    this.move();
    this.checkCollisions();
    this.draw();
  };

  Game.prototype.stop = function() {
    clearInterval(this.intervalId);
  }

  Game.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.intervalId = window.setInterval(function() {
      that.step();
    }, that.FPS);
  };

})(this);