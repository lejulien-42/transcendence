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
let bally = 1;
let ballx = 1;
let Velocity = 6;
let balldx = Velocity;
let balldy = Velocity;
let WIDTH = 0;
let HEIGHT = 0;
let ballSiz = 0;
var sketch = function (p) {
  p.setup = function () {
    WIDTH = p.windowWidth - 20;
    HEIGHT = p.windowHeight / 2;
    ballSiz = WIDTH * 0.02;
    p.createCanvas(WIDTH, HEIGHT);
    p.frameRate(30);
  };
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(0);
    if (ballx <= 0 || ballx + ballSiz > WIDTH) balldx = balldx * -1;
    if (bally <= 0 || bally + ballSiz > HEIGHT) balldy = balldy * -1;
    ballx = ballx + balldx;
    bally = bally + balldy;
    p.fill(200, 10, 200);
    p.rect(ballx, bally, ballSiz, ballSiz);
  };
};
new p5(sketch);

}
})
//# sourceMappingURL=app.js.map