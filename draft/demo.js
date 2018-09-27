// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Perceptron Example
// See: http://en.wikipedia.org/wiki/Perceptron

// Code based on text "Artificial varelligence", George Luger

// A list of povars we will use to "train" the perceptron
var training = new Trainer();
// A Perceptron object
var ptron;

// We will train the perceptron with one "Povar" object at a time
var count = 0;

// Coordinate space
var xmin = -400;
var ymin = -100;
var xmax = 400;
var ymax = 100;

// The function to describe a line 
function f(x) {
    return 0.4 * x + 1;
}

function setup() {
    size(640, 360);

    // The perceptron has 3 inputs -- x, y, and bias
    // Second value is "Learning Constant"
    ptron = new Perceptron(3, 0.00001);  // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal

    // Create a random set of training povars and calculate the "known" answer
    for (var i = 0; i < training.length; i++) {
        var x = random(xmin, xmax);
        var y = random(ymin, ymax);
        var answer = 1;
        if (y < f(x)) answer = -1;
        training[i] = new Trainer(x, y, answer);
    }
    smooth();
}


function draw() {
    background(255);
    translate(width / 2, height / 2);

    // Draw the line
    strokeWeight(4);
    stroke(127);
    var x1 = xmin;
    var y1 = f(x1);
    var x2 = xmax;
    var y2 = f(x2);
    line(x1, y1, x2, y2);

    // Draw the line based on the current weights
    // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
    stroke(0);
    strokeWeight(1);
    var weights = ptron.getWeights();
    x1 = xmin;
    y1 = (-weights[2] - weights[0] * x1) / weights[1];
    x2 = xmax;
    y2 = (-weights[2] - weights[0] * x2) / weights[1];
    line(x1, y1, x2, y2);



    // Train the Perceptron with one "training" povar at a time
    ptron.train(training[count].inputs, training[count].answer);
    count = (count + 1) % training.length;

    // Draw all the povars based on what the Perceptron would "guess"
    // Does not use the "known" correct answer
    for (var i = 0; i < count; i++) {
        stroke(0);
        strokeWeight(1);
        fill(0);
        var guess = ptron.feedforward(training[i].inputs);
        if (guess > 0) noFill();

        ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8);
    }
}
