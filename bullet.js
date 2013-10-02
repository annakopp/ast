(function(root){

  var Bullet = root.Asteroids = (root.Asteroids || {})

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    this.COLOR = "red";
    this.RADIUS = 2;
    this.mass = .1;
    this.life = 100;
    Asteroids.MovingObject.call(this, pos, vel, this.COLOR, this.RADIUS, this.mass)
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitSprites = function(game) {
    var that = this;
    game.asteroids.forEach(function(asteroid) {
      if ( that.isCollideWith(asteroid) ) {
        game.removeAsteroid(asteroid, that);
        game.removeBullet(that);
      }
    });
    if ( this.isCollideWith(game.ship) ){
      alert("Game over");
      game.stop();
    }
  }

  Bullet.prototype.die = function(game) {
    if (this.life < 1) game.removeBullet(this);
  }

  Bullet.prototype.move = function(canvas, game) {
   // Asteroids.MovingObject.move.call(this, canvas);
    this.posX = (this.posX + this.velX + canvas.width) % canvas.width;
    this.posY = (this.posY + this.velY + canvas.height) % canvas.height;
    this.life -= 1;
    this.hitSprites(game);
  }

})(this);