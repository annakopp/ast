(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    this.COLOR = "white";
    this.radius = 40;
    this.mass = 40;
    Asteroids.MovingObject.call(this, pos, vel, this.COLOR, this.radius, this.mass);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [ Math.round(Math.random() * dimX), Math.round(Math.random() * dimY) ];
    var vel = [ (Math.random() * 3) + 1, (Math.random() * 2 * Math.PI) ];
    return new Asteroid(pos, vel);
  };

  Asteroid.splitAsteroid = function(asteroid, bullet) {
   console.log(bullet);
    var pos = [asteroid.posX, asteroid.posY];

    var vAX = asteroid.velX;
    var vAY = asteroid.velY;

    var vBX = bullet.velX;
    var vBY = bullet.velY;

    var mB = bullet.mass;
    var mA = asteroid.mass;

    // var velA = [velX/Math.cos(asteroid.direction), asteroid.direction];
    // var velB = [velXB/Math.cos(bullet.direction), bullet.direction];

    var new_velX = (mB*vBX)+(mA*vAX)/(mA+mB);
    var new_velY = (mB*vBY)+(mA*vAY)/(mA+mB);
    //var new_dir = Math.atan(new_velY, new_velX);

    var ast1 = new Asteroid(pos, 1);
    ast1.velX = new_velX;
    ast1.velY = new_velY;
    ast1.direction = Math.atan(ast1.velY, ast1.velX);
    ast1.radius = asteroid.radius / 2;
    ast1.mass = asteroid.mass / 2;

    var ast2 = new Asteroid(pos, 1);
    ast2.velX = -1 * new_velX;
    ast2.velY = new_velY;
    ast1.direction = Math.atan(ast2.velY, ast2.velX);
    ast2.radius = asteroid.radius / 2;
    ast2.mass = asteroid.mass / 2;

    return [ast1, ast2];
  };

} )(this);