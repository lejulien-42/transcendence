/// <reference path="../global.d.ts" />

let bally = 1;
let ballx = 1;
let Velocity = 6
let balldx = Velocity;
let balldy = Velocity;
let WIDTH = 0;
let HEIGHT = 0;
let ballSiz = 0;

var sketch = function (p: p5) {

  p.setup = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight / 2;
    ballSiz = WIDTH * 0.02;
    p.createCanvas(WIDTH , HEIGHT);
    p.frameRate(30);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = function () {
    p.background(0);
    
    if (ballx <= 0 || (ballx + ballSiz > WIDTH))
        balldx = balldx * -1;
    if (bally <= 0 || (bally + ballSiz > HEIGHT))
        balldy = balldy * -1;
    ballx = ballx + balldx;
    bally = bally + balldy;

    p.fill(200, 10, 200);
    p.rect(ballx, bally, ballSiz, ballSiz);
  }
}

new p5(sketch)
