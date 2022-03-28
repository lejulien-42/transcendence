
let y = 0;

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    rect(20, 20, 4, 4);
}

function keyPressed() {
    if (keyCode === UP_ARROW)
        y--;
    else if (keyCode === DOWN_ARROW)
        y++;
}