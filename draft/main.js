//constants
var foodCount = 30;
var initialFoodCount = 0;
var cellRadius = 60;
var cellSpeed = 0;
var nucleusRadius = 20;
var membraneThickness = 3;
var friction = 0.1;
var chunkMass = 2000;
var chunkSpeed = 10;

var cell;
var backgroundColor;
var frame = 0;
var foods = [];
var direction = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);

    backgroundColor = color(225, 225, 225);
    background(backgroundColor);
    frameRate(30);

    cell = new Cell(cellRadius);
    cell.volume = cell.getVolume();
    for (var i = 0; i < initialFoodCount; i++)
        foods.push(new Food());
}

function draw() {
    frame++;
    background(backgroundColor);
    cell.draw();
    if (frame % 60 === 0) {
        if (foods.length < foodCount) {
            foods.push(new Food(10));
        }
    }

    for (var i = 0; i < foods.length; i++) {
        foods[i].draw();
    }

    if (mouseX > 10)
        cell.moveTo(mouseX, mouseY, cell.x, cell.y);
    cell.checkEat();
    cursor(HAND);
}

function mousePressed() {
}

function Cell(radius) {
    this.x = 200;
    this.y = 200;
    this.velX = 0;
    this.velY = 0;
    this.radius = radius;
    this.color = color(255, 204, 0);

    this.nucleus = new Nucleus(nucleusRadius);
    this.membrane = new Membrane(membraneThickness);

    this.draw = function () {
        cell.move();
        fill(this.color);
        strokeWeight(this.membrane.thickness); // Default
        stroke(this.membrane.color);
        ellipse(this.x, this.y, this.radius);
        this.nucleus.draw(this.x, this.y);
    };

    this.move = function(moveX, moveY) {
        this.x += this.velX;
        this.y += this.velY;

        this.volume -= 2000;
        this.radius = this.getRadiusByVolume();
        this.volume = this.getVolume();
    };
    
    this.moveTo = function (toX, toY, cellX, cellY) {
        var deltaX = toX - cellX;
        var deltaY = toY - cellY;
        var deltaMag = GetMagnitude(deltaX, deltaY);
        var adjustedX = deltaX / deltaMag;
        var adjustedY = deltaY / deltaMag;
        this.velX += adjustedX * this.getThrust(chunkMass, chunkSpeed);
        this.velY += adjustedY * this.getThrust(chunkMass, chunkSpeed);
    };

    this.checkEat = function() {
        for (var i = 0; i < foods.length; i++) {
            var distance = GetDistanceBy(this.x, this.y, foods[i].x, foods[i].y);
            if (distance < this.radius / 2) {
                foods.splice(i, 1);
                this.radius += 5;
            }
        }
    };

    this.getVolume = function () {
        return (4 / 3) * Math.PI * this.radius * this.radius * this.radius;
    };

    this.getRadiusByVolume = function() {
        return Math.cbrt(this.volume * (3 / (4 * Math.PI)) );
    };

    this.getArea = function() {
        return 4 * Math.PI * this.radius * this.radius;
    };

    this.getVolumeToAreaRatio = function() {
        return this.getArea() / this.getVolume();
    };

    this.getThrust = function (mass, velocity) {
        return mass * velocity / (this.volume - mass);
    };
}

function Membrane(thickness) {
    this.thickness = thickness;
    this.color = color(80, 80, 80);
}

function Nucleus(radius) {
    this.radius = radius;
    this.color = color(25, 25, 25);
    this.x = 0;
    this.y = 0;

    this.draw = function(parentX, parentY) {
        fill(this.color);
        noStroke();
        ellipse(this.x + parentX, this.y + parentY, this.radius);
    };
}

function Food(radius) {
    this.radius = radius;
    this.color = color(25, 225, 25);
    this.x = Math.floor((Math.random() * windowWidth) + 1);
    this.y = Math.floor((Math.random() * windowHeight) + 1);

    this.draw = function() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.radius);
    };
}

function GetDistance(cell, food) {
    var deltaX = cell.x - food.x;
    var deltaY = cell.x - food.x;
    return GetMagnitude(deltaX, deltaY);
}

function GetDistanceBy(x1, y1, x2 , y2) {
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    return GetMagnitude(deltaX, deltaY);
}

function GetMagnitude(deltaX, deltaY) {
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}