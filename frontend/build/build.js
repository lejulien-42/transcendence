
let y = 0;

function setup() {
    createCanvas(windowWidth, windowHeight / 2);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight / 2);
}
function draw() {
    rect(mouseX, mouseY, 4, 4);
}

function keyPressed() {
    if (keyCode === UP_ARROW)
        y--;
    else if (keyCode === DOWN_ARROW)
        y++;
    background(random(255), random(255), random(255));
}