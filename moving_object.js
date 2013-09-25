(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  // var func1 = LongLibraryName.func1 = function () {
  //     // do work
  //   }
  //
  var MovingObject = Asteroids.MovingObject = function(pos, vel, color, radius) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.direction = vel[1];
    this.velY = vel[0] * Math.sin(this.direction);
    this.velX = vel[0] * Math.cos(this.direction);
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function(canvas) {
    //review
    this.posX = (this.posX + this.velX + canvas.width) % canvas.width;
    this.posY = (this.posY + this.velY + canvas.height) % canvas.height;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollideWith = function(other){
    var dx = Math.pow((this.posX - other.posX), 2);
    var dy = Math.pow((this.posY - other.posY), 2);
    var distance = Math.sqrt(dx + dy);
    if ( distance > (this.radius + other.radius) ){
      return false;
    }
    return true;
  }

} )(this);