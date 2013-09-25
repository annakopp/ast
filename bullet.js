(function(root){

  var Bullet = root.Asteroids = (root.Asteroids || {})

  var Bullet = Asteroids.Bullet = function(pos, vel) {
    this.COLOR = "red";
    this.RADIUS = 2;
    Asteroids.MovingObject.call(this, pos, vel, this.COLOR, this.RADIUS)
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitSprites = function(game) {
    var that = this;
    game.asteroids.forEach(function(asteroid) {
      if ( that.isCollideWith(asteroid) ) {
        game.removeAsteroid(asteroid);
        game.removeBullet(that);
      }
    });
    if ( this.isCollideWith(game.ship) ){
      alert("Game over");
      game.stop();
    }
  }

  Bullet.prototype.move = function(canvas, game) {
   // Asteroids.MovingObject.move.call(this, canvas);
    this.posX = (this.posX + this.velX + canvas.width) % canvas.width;
    this.posY = (this.posY + this.velY + canvas.height) % canvas.height;

    this.hitSprites(game);
  }

})(this);