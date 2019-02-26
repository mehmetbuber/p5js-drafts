var phase = 0;

var heart = [];
const totalFrames = 240;
let counter = 0;
var heartSlider;
let rSlider;

function setup() {
    createCanvas(1200, 800);
    colorMode(HSB, 255);

    rSlider = createSlider(0.01, 1, 1,0.01);
    rSlider.position(20, 20);

    background(51);
}

function draw() {
    console.log(rSlider.value());
    background(0);
    translate(width / 2, height / 2);
    stroke(255);
    noFill();
    beginShape();
    for (var a = 0; a < TWO_PI; a += 0.01) {
        var xoff = cos(a + phase) + 1;
        var yoff = sin(a + phase) + 1;
        var r = map(noise(xoff, yoff), 0, 1, 100, 200);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
    }
    phase += 0.01;
    endShape();

    translate(-width / 2, -height / 2);
    render();
    counter++;
}

function render() {
    heart = [];
    for (var i = 0; i < 1; i += rSlider.value()) {
        var a = map(i, 0, 1, 0, TWO_PI);
        var x = 16 * pow(sin(a), 3);
        var y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        heart.push(createVector(x, y));
    }

    translate(width / 2, height / 2);

    stroke(255, 0, 200);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let v of heart) {
        vertex(10 * v.x, 10 * v.y);
    }
    endShape();
}