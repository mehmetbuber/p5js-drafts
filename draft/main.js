//constants
var foodCount = 30;
var initialFoodCount = 0;
var cellRadius = 60;
var cellSpeed = 0;
var nucleusRadius = 20;
var membraneThickness = 3;
var friction = 0.1;
var chunkMass = 200;
var chunkSpeed = 500;
var massUnit = 10000;
var foodVolume = 500000;
var friction = 0.005;
var minFriction = 0.005;

var cell;
var backgroundColor;
var frame = 0;
var foods = [];
var direction = 1;
var x = 100;
var y = 100;

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
    cursor(HAND);
	

    for (var i = 0; i < foods.length; i++) {
        foods[i].draw();
    }

    cell.checkEat();
    cell.draw();
	
    if (frame % 60 === 0) {
        if (foods.length < foodCount) {
            foods.push(new Food(10));
        }
    }
	
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
		this.drawThrustLines();
        this.x += this.velX;
        this.y += this.velY;
        fill(this.color);
        strokeWeight(this.membrane.thickness); // Default
        stroke(this.membrane.color);
        ellipse(this.x, this.y, this.radius);
        this.nucleus.draw(this.x, this.y);
		this.friction();
    };

	this.drawThrustLines = function(){

		stroke(225,50,50);
		line(cell.x, cell.y, cell.x + cell.velX * 100, cell.y + cell.velY * 100);
		stroke(225,50,50);
		if (keyIsDown(LEFT_ARROW)) {
			cell.moveTo(-1, 0, cell.x, cell.y);
			line(cell.x, cell.y, cell.x + 100, cell.y);
		}

		if (keyIsDown(RIGHT_ARROW)) {
			cell.moveTo(1, 0, cell.x, cell.y);
			line(cell.x, cell.y, cell.x - 100, cell.y);
		}

		if (keyIsDown(UP_ARROW)) {
			cell.moveTo(0, -1, cell.x, cell.y);
			line(cell.x, cell.y, cell.x, cell.y + 100);
		}

		if (keyIsDown(DOWN_ARROW)) {
			cell.moveTo(0, 1, cell.x, cell.y);
			line(cell.x, cell.y, cell.x, cell.y - 100);
		}
		noStroke();
	}
	
    this.move = function(velX, velY) {
        this.volume -= 2000;
        this.radius = this.getRadiusByVolume();
        this.volume = this.getVolume();
    };
	
    this.friction = function(){
		var totalVel = this.getSpeed();
		if(Math.abs(this.velX) > 0)
		{
			var xRatio =  this.velX * friction;
			
			if(this.velX > 0)
			{
				if(xRatio > this.velX)
					xRatio = this.velX;
			}
			else
			{
				if(xRatio < this.velX)
					xRatio = this.velX;
			}			
			
			if(Math.abs(xRatio) < minFriction)
			{
				if(xRatio > 0)
					xRatio = minFriction;
				else
					xRatio = -minFriction;
			}
			this.velX -= xRatio;
		}
		if(Math.abs(this.velY) > 0)
		{
			var yRatio = this.velY * friction;
			
			if(this.velY > 0)
			{
				if(yRatio > this.velY)
					yRatio = this.velY;
			}
			else
			{
				if(yRatio < this.velY)
					yRatio = this.velY;
			}	

			if(Math.abs(yRatio) < minFriction)
			{
				if(yRatio > 0)
					yRatio = minFriction;
				else
					yRatio = -minFriction;
			}
		
			this.velY -= yRatio;
		}
	}
	
    this.moveTo = function (toX, toY) {
        var deltaMag = GetMagnitude(toX, toY);
        var adjustedX = toX / deltaMag;
        var adjustedY = toY / deltaMag;
        this.velX += adjustedX * this.getThrust(this.getThrustForUnitMass(this.volume), chunkSpeed);
        this.velY += adjustedY * this.getThrust(this.getThrustForUnitMass(this.volume), chunkSpeed);
        cell.move();
    };

    this.checkEat = function() {
        for (var i = 0; i < foods.length; i++) {
            var distance = GetDistanceBy(this.x, this.y, foods[i].x, foods[i].y);
            if (distance < this.radius / 2) {
                foods.splice(i, 1);
				this.volume += foodVolume;
				this.radius = this.getRadiusByVolume();
				this.volume = this.getVolume();
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
	
	this.getSpeed = function(){
		return GetMagnitude(this.velX, this.velY);
	}
	
	this.getThrustForUnitMass = function(mass){
		return mass / massUnit;
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