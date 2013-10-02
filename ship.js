(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel){
    this.COLOR = "white";
    this.RADIUS = 3;
    this.mass = 3;
    Asteroids.MovingObject.call(this, pos, vel, this.COLOR, this.RADIUS, this.mass);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.velY += impulse * Math.sin(this.direction);
    this.velX += impulse * Math.cos(this.direction);
  };

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(
      [this.posX + 10 * Math.cos(this.direction), this.posY + 10 * Math.sin(this.direction)],
      [10, this.direction]
    );
    return bullet;
  }

  Ship.prototype.slowDown = function() {
      this.velY *= 0.95;
      this.velX *= 0.95;
  }

  Ship.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(this.direction);
    ctx.translate(-1 * this.posX, -1 * this.posY);
    ctx.fillStyle = this.color;

    ctx.beginPath();

    /// triangle needs to be bigger for correct collision
    ctx.moveTo(this.posX + (this.radius * 2) + 4, this.posY);
    ctx.lineTo(this.posX - (this.radius * 2), this.posY + (this.radius * 2));
    ctx.lineTo(this.posX - (this.radius * 2), this.posY - (this.radius * 2));
    ctx.closePath;
    ctx.fill();
    ctx.restore();
  };


})(this);