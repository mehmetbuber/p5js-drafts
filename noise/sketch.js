var heartRight = [];
var heartLeft = [];
var particles = [];

var heartSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);

    heartSlider = createSlider(0.01, 1, 0.01, 0.01);
    heartSlider.position(20, 20);
    setHearth();
    
    particles.push(new Particle());
    particles.push(new Particle(true));
    background(51);
}

function setHearth() {
    heartRight = [];
    heartLeft = [];

    for (var a = PI; a > 0; a -= heartSlider.value()) {
        var x = 16 * pow(sin(a), 3);
        var y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        heartRight.push(createVector(x, y));
    }

    for (var a = PI; a < TWO_PI; a += heartSlider.value()) {
        var x = 16 * pow(sin(a), 3);
        var y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
        heartLeft.push(createVector(x, y));
    }
}

function draw() {
    setHearth();
    render();
}

function render() {
    translate(width / 2, height / 2);
    background(0);
    stroke(255, 0, 200);
    strokeWeight(4);
    noFill();

    //beginShape();
    //for (let v of heartRight) {
    //    vertex(10 * v.x, 10 * v.y);
    //}
    //endShape();

    //beginShape();
    //for (let v of heartLeft) {
    //    vertex(10 * v.x, 10 * v.y);
    //}
    //endShape();

    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].move();
    }
}

function Particle(right) {
    this.right = right;
    this.index = 0;
    this.r = 2;
    this.speed = 1;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 100;
    this.path = [];
    this.totalLength = 100;

    this.draw = function () {
        if (this.right) {
            var next = {
                x: heartRight[this.index].x * 10,
                y: heartRight[this.index].y * 10
            };
            this.path.push(next);
        } else {
            var next = {
                x: heartLeft[this.index].x * 10,
                y: heartLeft[this.index].y * 10
            };
            this.path.push(next);
        }
        strokeWeight(this.r );

        this.r += 0.01;
        beginShape();
        for (var i = 0; i < this.path.length; i++) {
            var ratio = i / this.totalLength;
            stroke(this.red, this.green, this.blue, this.alpha * ratio);
            vertex(this.path[i].x, this.path[i].y);
        }
        endShape();

        if (this.path.length > this.totalLength)
            this.path.shift();
    };

    this.move = function() {
        this.index++;
        if (this.index > heartRight.length - 1) {
            this.index = 0;
            this.path = [];
        }
    };
}