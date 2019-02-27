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
    translate(width / 2, height / 2);

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