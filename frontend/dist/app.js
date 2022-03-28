(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

f.modules = modules;
  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({

// src/sketch.ts @1
1: function(__fusereq, exports, module){
let WIDTH = 0;
let HEIGHT = 0;
let sepSize = 0;
var Player = function (p) {
  this.w = 15;
  this.h = 80;
  this.pos = p.createVector(this.w * 2, HEIGHT / 2 - this.h / 2);
  this.acc = p.createVector(0, 0);
  this.spd = 10;
  this.maxSpd = 10;
  this.show = function () {
    p.noStroke();
    p.fill(255);
    p.rect(this.pos.x, this.pos.y, this.w, this.h);
  };
  this.update = function () {
    this.acc.y = p.constrain(this.acc.y, -this.maxSpd, this.maxSpd);
    this.pos.add(this.acc);
    this.pos.y = p.constrain(this.pos.y, 0, HEIGHT - this.h);
  };
  this.up = function () {
    this.acc.y -= this.spd;
  };
  this.down = function () {
    this.acc.y += this.spd;
  };
  this.stop = function () {
    this.acc.y = 0;
  };
};
var Ball = function (p) {
  this.x = WIDTH / 2;
  this.y = HEIGHT / 2;
  this.size = WIDTH * 0.02;
  this.velocity = 9;
  this.dx = this.velocity;
  this.dy = this.velocity;
  this.show = function () {
    p.fill(200, 10, 200);
    p.rect(this.x, this.y, this.size, this.size);
  };
  this.update = function () {
    if (this.x <= 0 || this.x + this.size > WIDTH) this.dx = this.dx * -1;
    if (this.y <= 0 || this.y + this.size > HEIGHT) this.dy = this.dy * -1;
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
  };
};
var sketch = function (p) {
  let player;
  let ball;
  p.setup = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    sepSize = HEIGHT * 0.5 - 1;
    p.createCanvas(WIDTH, HEIGHT);
    player = new Player(p);
    ball = new Ball(p);
  };
  p.windowResized = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight - 20;
    p.resizeCanvas(WIDTH, HEIGHT);
  };
  p.draw = function () {
    p.background(0);
    p.noStroke();
    p.fill(255);
    player.update();
    ball.update();
    player.show();
    ball.show();
  };
  p.keyPressed = function () {
    if (p.key == "w" || p.key == "W" || p.keyCode == p.UP_ARROW) {
      player.up();
    } else if (p.key == "s" || p.key == "S" || p.keyCode == p.DOWN_ARROW) {
      player.down();
    }
  };
  p.keyReleased = function () {
    if (p.key == "w" || p.keyCode == p.UP_ARROW) {
      player.stop();
    } else if (p.key == "s" || p.keyCode == p.DOWN_ARROW) {
      player.stop();
    }
  };
};
new p5(sketch);

}
})
//# sourceMappingURL=app.js.map