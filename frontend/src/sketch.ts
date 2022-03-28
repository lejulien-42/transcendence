/// <reference path="../global.d.ts" />

import { textSpanIntersectsWith } from "typescript";
import { threadId } from "worker_threads";

let WIDTH = 0;
let HEIGHT = 0;


var Player = function(p) {
  this.w = 15;
  this.h = 80;

  this.pos = p.createVector(this.w * 2, HEIGHT / 2 - this.h / 2);
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
  this.size = WIDTH * 0.02;
  this.velocity = 9;
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
}

var sketch = function (p: p5) {
  let player;
  let ball;

  p.setup = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    p.createCanvas(WIDTH , HEIGHT);
    player = new Player(p);
    ball = new Ball(p);
  }

  p.windowResized = function() {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    p.resizeCanvas(WIDTH, HEIGHT);
  }

  p.draw = function () {
    p.background(0);
    p.noStroke();
    p.fill(255);
    player.update();
    ball.update(player);
    player.show();
    ball.show();
  }

  p.keyPressed = function () {
    if (p.key == "w" || p.key == "W" || p.keyCode == p.UP_ARROW) {
      player.up();
    }
    else if (p.key == "s" || p.key == "S" || p.keyCode == p.DOWN_ARROW) {
      player.down();
    }
  }

  p.keyReleased = function () {
    if (p.key == "w" || p.keyCode == p.UP_ARROW) {
      player.stop();
    }
    else if (p.key == "s" || p.keyCode == p.DOWN_ARROW) {
      player.stop();
    }
  }
}

new p5(sketch)
