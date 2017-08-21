var diameter = 3;
var diameterStep = 0.1;
var centerX;
var centerY;
var numSlices = 36;
var numPositions = 25;
var song;
var button;
var amp;
var inc = 0.005;
var start = 0;
var mic;
var rvs = false;

var positions = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    angleMode(DEGREES);

    centerX = width / 2;
    centerY = height / 2;

    fill(255);
    stroke(0, 0, 0, 0);
}

function draw() {
    var slider = parseInt(document.getElementById("volSlider").value);
    var noiseSlider = parseInt(document.getElementById("noiseSlider").value);
    inc = noiseSlider / 5000;
    var vol = mic.getLevel();


    var m = vol * slider;

    var xoff = start;

    var angle = 360 / numSlices;
console.log(m);
	
	
if(m > 20)
    rvs = !rvs;

console.log(rvs);
if(rvs){
    xoff += inc;
    start += inc;
}
else
{
    xoff -= inc;
    start -= inc;
}
    var nAngle = map(-xoff, 0, 1, 0, angle);
    //Noise
	//var nAngle = map(noise(xoff), 0, 1, 0, angle);
    var nAngle = map(-xoff, 0, 1, 0, angle);

    var xNoise = Math.sin(nAngle) * (200 + m);
    var yNoise = Math.cos(nAngle) * (200 + m);
        
    endShape();

    
    var zoff = 0;
    // Add the latest position to the array
    positions.unshift({
        x: centerX + xNoise,
        y: centerY + yNoise 
    });

    // Only store the latest `numPositions` positions
    positions.splice(numPositions, 100);

    translate(width / 2, height / 2);
    background(0);

    // For each slice

    for (var i = 0; i < numSlices; i++) {


        drawPoints(positions, i % 6, noise(xoff));

        rotate(360 / numSlices);
    }
    
}

function drawPoints(xs, isAlt, noise) {
	var color = map(noise, 0, 1, 100, 150);
	
    if (isAlt == 0) {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x - 150;
            var y = positions.y- 150;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
    else if(isAlt == 1)
    {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x - 100;
            var y = positions.y- 100;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
    else if (isAlt == 2) {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x - 50;
            var y = positions.y- 50;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
    else if (isAlt == 3) {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x + 0;
            var y = positions.y;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
    else if (isAlt == 4) {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x + 50;
            var y = positions.y+ 50;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
    else if (isAlt == 5) {
        for (var i = xs.length - 1; i >= 0; i--) {
            var positions = xs[i];
            var x = positions.x + 100;
            var y = positions.y+ 100;
            var dia = diameter + diameterStep * (numPositions - i);
            fill(color, color, color, color * (1 - i / numPositions));
            ellipse(x - centerX, y - centerY, dia, dia);
        }
    }
}

function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        song.setVolume(1);
        button.html("pause");
    } else {
        song.stop();
        button.html("play");
    }
}