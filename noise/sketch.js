var particles = [];
var hearthRatio = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);

    particles.push(new Particle());
    particles.push(new Particle(true));

    background(51);
}

function draw() {
    background(0);

    let noiseField = new NoiseField(width, height, 10, 0.01);
    noiseField.populate();

    translate(width / 2, height / 2);
    noiseField.getLoopNoise();
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

function getHearthPath(right) {
    var array = [];
    if (right) {
        for (var a = PI; a > 0; a -= 0.01) {
            var x = 16 * pow(sin(a), 3);
            var y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
            array.push(createVector(x * hearthRatio, y * hearthRatio));
        }
    } else {
        for (var a = PI; a < TWO_PI; a += 0.01) {
            var x = 16 * pow(sin(a), 3);
            var y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
            array.push(createVector(x * hearthRatio, y * hearthRatio));
        }
    }
    return array;
}
function getCirclePath() {
    var array = [];
    for (var a = 0; a <TWO_PI; a += 0.01) {
        var x = sin(a);
        var y = cos(a);
        array.push(createVector(x, y));
    }
    return array;
}

function Particle(right) {
    this.right = right;
    this.path = getHearthPath(right);

    this.index = 0;
    this.maxLength = 100;
    this.speed = 1;

    this.strokeWeight = 1;
    this.red = 100;
    this.green = 100;
    this.blue = 100;
    this.alpha = 100;

    this.update = function () {
        this.draw();
        this.move();
        noLoop();
    };

    this.draw = function () {
        noFill();
        strokeWeight(this.strokeWeight);

        beginShape();
        for (var i = this.index; i < this.path.length && i < this.maxLength + this.index; i++) {
            stroke(this.red, this.green, this.blue);
            vertex(this.path[i].x, this.path[i].y);
        }
        endShape();
    };

    this.move = function () {
        this.index++;
        if (this.index > this.path.length - 1) {
            this.index = 0;
        }
    };
}

function NoiseField(row, column, scale, step) {
    this.values = [];
    this.row = row;
    this.column = column;
    this.scale = scale;
    this.step = step;


    this.populate = function () {
        this.values = [];
        for (var x = 0; x < row; x += this.scale) {
            let value = [];
            for (var y = 0; y < column; y += this.scale) {
                var c = noise(this.step * x, this.step * y);
                value.push(c);
                fill(c * 255);
                rect(x, y, 10, 10);
            }
            this.values.push(value);
        }
    };

    this.getLoopNoise = function() {
        var path = getCirclePath();
        noFill();
        strokeWeight(4);

        beginShape();
        for (var i = 0; i < path.length; i++) {
            vertex(path[i].x * 100, path[i].y * 100);
        }
        endShape();
    };
}