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
    var that = this;

    if(key.isPressed("right")) that.ship.direction = (that.ship.direction + 0.1) % (2 * Math.PI);
    if(key.isPressed("left")) that.ship.direction = (that.ship.direction - 0.1) % (2 * Math.PI);
     if(key.isPressed("up")) that.ship.power(0.4);
     key('space', function(){ that.fireBullet(); });

  };

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
        that.stop();
      }
    });
  }

  Game.prototype.checkBulletDeath = function() {
    var that = this;
    this.bullets.forEach(function(bullet) {
      bullet.die(that)
    });
  }

  Game.prototype.removeAsteroid = function(asteroid, bullet) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);

    if (asteroid.radius > 10){
      console.log(asteroid);
      console.log(bullet);
      this.asteroids = this.asteroids.concat( Asteroids.Asteroid.splitAsteroid(asteroid, bullet) );
    };

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
    this.checkBulletDeath();
    this.draw();
  };

  Game.prototype.stop = function() {
    clearInterval(this.intervalId);
  }

  Game.prototype.start = function() {
    var that = this;
    this.intervalId = window.setInterval(function() {
      that.bindKeyHandlers();
      that.step();
    }, that.FPS);
  };

})(this);