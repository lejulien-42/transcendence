/// <reference path="../global.d.ts" />

import { textSpanIntersectsWith } from "typescript";
import { threadId } from "worker_threads";

let WIDTH = 0;
let HEIGHT = 0;


var Player = function(p, pos) {
  this.w = HEIGHT * 0.05;
  this.h = HEIGHT * 0.18;
  let tmp = this.w * 2;

  (!pos) ? tmp: tmp = WIDTH - tmp;

  this.pos = p.createVector(tmp, HEIGHT / 2 - this.h / 2);
  this.acc = p.createVector(0, 0);
  this.spd = 10;
  this.maxSpd = 10;

  this.show = function() {
    p.noStroke();
    p.fill(255);
    p.rect(this.pos.x, this.pos.y, this.w, this.h);
  }

  this.update = function() {
    this.acc.y = p.constrain(this.acc.y, -this.maxSpd, this.maxSpd);
    this.pos.add(this.acc);
    this.pos.y = p.constrain(this.pos.y, 0, HEIGHT - this.h);
  }

  this.up = function() {this.acc.y -= this.spd;}
  this.down = function() {this.acc.y += this.spd;}
  this.stop = function() {this.acc.y = 0;}
}

var Ball = function(p) {
  this.x = WIDTH / 2;
  this.y = HEIGHT / 2;
  this.size = WIDTH * 0.04;
  this.velocity = 4;
  this.dx = this.velocity;
  this.dy = this.velocity;

  this.show = function() {
    p.fill(200, 10, 200);
    p.rect(this.x, this.y, this.size, this.size);
  }

  this.update = function(player) {
    if (this.x <= 0 || (this.x + this.size > WIDTH) || this.y > player.y && this.y < player.y + player.h)
        this.dx = this.dx * -1;
    if (this.y <= 0 || (this.y + this.size > HEIGHT))
        this.dy = this.dy * -1;
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  }

  this.bouncex = function() {
    this.dx = this.dx * -1;
    this.velocity += 0.03;
  }

  this.bouncey = function() {
    this.dy = this.dy * -1;
    this.velocity += 0.03;
  }
}

var sketch = function (p: p5) {
  let player;
  let player2;
  let ball;
  let background;

  // my functions

  function colide(iplayer, ball) {
    let px = iplayer.pos.x;
    let py = iplayer.pos.y;
    let bx = ball.x;
    let by = ball.y;

    if (bx + ball.size >= px && bx <= px + player.w && by +ball.size >= py && by <= py + iplayer.h) {
      if (bx - px > px - bx)
        ball.bouncex();
      else
        ball.bouncey();
    }
  }

  // p5 functions

  p.preload = function() {
    //background = p.loadImage('images/background.jpg')
  }

  p.setup = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    p.createCanvas(WIDTH , HEIGHT);
    player = new Player(p, 0);
    player2 = new Player(p, 1);
    ball = new Ball(p);
  }

  p.windowResized = function() {
    ball.size = WIDTH * 0.04;
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    player.w = 
    p.resizeCanvas(WIDTH, HEIGHT);
  }

  p.draw = function () {
    p.background(0);
    p.noStroke();
    p.fill(255);
    player.update();
    player2.update();
    ball.update(player);
    colide(player, ball);
    colide(player2, ball);
    player.show();
    player2.show();
    ball.show();
  }

  p.keyPressed = function () {
    if (p.key == "w" || p.key == "W") {
      player.up();
    }
    else if (p.keyCode == p.UP_ARROW)
      player2.up();
    else if (p.key == "s" || p.key == "S") {
      player.down();
    }
    else if (p.keyCode == p.DOWN_ARROW)
      player2.down();
  }

  p.keyReleased = function () {
    if (p.key == "w") {
      player.stop();
    }
    else if (p.keyCode == p.UP_ARROW)
      player2.stop();
    else if (p.key == "s") {
      player.stop();
    }
    else if (p.keyCode == p.DOWN_ARROW)
      player2.stop();
  }
}

new p5(sketch)
