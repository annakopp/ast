(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    this.COLOR = "white";
    this.RADIUS = 20;
    Asteroids.MovingObject.call(this, pos, vel, this.COLOR, this.RADIUS);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [ Math.round(Math.random() * dimX), Math.round(Math.random() * dimY) ];
    var vel = [ (Math.random() * 3) + 1, (Math.random() * 2 * Math.PI) ];
    return new Asteroid(pos, vel);
  };

} )(this);