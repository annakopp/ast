#Asteroids

Built with HTML5 Canvas. JavaScript code models drag, velocity and conservation of momentum using trigonometric functions.


### Controls
 - Left/Right arrow keys rotate the ship
 - Up arrow key moves the ship in the given direction
 - Spacebar fires bullets

### Moving Objects
 - Velocity of a moving object is given as an array of speed and direction
 - The velocity vector is decomposed into it's x and y velocities and
 - The ship's velocity is gradually decreased
 - A bullet will slightly alter the asteroid's path (depending on the mass of the given asteroid)

### Bullet and Asteroid Removal
- An asteroid is removed from the game when it becomes too small to split
- A bullet is removed from the game after 100 "turns"

###To do

 - Add non random splitting of Asteroids (depending on both asteroid and bullet direction)
 - Add scores and game over screen
 - Generate new asteroids moving at faster speeds as the game progresses
