var inc = 0;

var headDiameter = 60;
var bodyHeight = 160;
var armLength0 = 40;
var armLength1 = 40;

var rightArmAngle = 90;
var rightArm1Angle = 0;
var leftArmAngle = 270;
var leftArm1Angle = 0;

var rightArmAngleMin = 0;
var rightArmAngleMax = 135;
var rightArmReverse = false;

var rightArm1AngleMin = 0;
var rightArm1AngleMax = 360;
var rightArm1Reverse = false;

var leftArmAngleMin = 225;
var leftArmAngleMax = 360;
var leftArmReverse = false;

var leftArm1AngleMin = 0;
var leftArm1AngleMax = 360;
var leftArm1Reverse = false;

function setup() {
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    background(0);
    
    if (leftArmAngle >= leftArmAngleMax)
        leftArmReverse = !leftArmReverse;
    if (leftArmAngle <= leftArmAngleMin)
        leftArmReverse = !leftArmReverse;

    if (leftArmReverse)
        leftArmAngle++;
    else
        leftArmAngle--;

    if (rightArmAngle >= rightArmAngleMax)
        rightArmReverse = !rightArmReverse;
    if (rightArmAngle <= rightArmAngleMin)
        rightArmReverse = !rightArmReverse;

    if (rightArmReverse)
        rightArmAngle++;
    else
        rightArmAngle--;
    

    rightArm1Angle++;
    leftArm1Angle++;
    rightArm1Angle++;
    leftArm1Angle++;
    
    var leftArmX = armLength0 * Math.sin(leftArmAngle * (Math.PI / 180));
    var leftArmY = armLength0 * Math.cos(leftArmAngle * (Math.PI / 180));

    var leftArm1X = armLength1 * Math.sin( leftArm1Angle * (Math.PI / 180));
    var leftArm1Y = armLength1 * Math.cos( leftArm1Angle * (Math.PI / 180));

    var rightArmX = armLength0 * Math.sin(rightArmAngle * (Math.PI / 180));
    var rightArmY = armLength0 * Math.cos(rightArmAngle * (Math.PI / 180));

    var rightArm1X = armLength1 * Math.sin( rightArm1Angle * (Math.PI / 180));
    var rightArm1Y = armLength1 * Math.cos( rightArm1Angle * (Math.PI / 180));

    //Head
    ellipse(width / 2, height / 2, headDiameter, headDiameter);

    stroke(255);
    fill(255);
    strokeWeight(10);

    //Body
    line(width / 2, height / 2, width / 2, height / 2 + bodyHeight);
    
    line(width / 2, height / 2 + headDiameter / 2, width / 2 + leftArmX, height / 2 + headDiameter / 2 + leftArmY);
    line(width / 2, height / 2 + headDiameter / 2, width / 2 + rightArmX, height / 2 + headDiameter / 2 + rightArmY);
    
    line(width / 2 + leftArmX, height / 2 + headDiameter / 2 + leftArmY, width / 2 + leftArmX + leftArm1X, height / 2 + headDiameter / 2 + leftArmY + leftArm1Y);
    line(width / 2 + rightArmX, height / 2 + headDiameter / 2 + rightArmY, width / 2 + rightArmX + rightArm1X, height / 2 + headDiameter / 2 + rightArmY + rightArm1Y);
    
    //Left Leg
    stroke(255);
    fill(255);
    strokeWeight(10);
    line(width / 2, height / 2 + bodyHeight, width / 2 - 40, height / 2 + 80 + bodyHeight);

    //Right Leg
    stroke(255);
    fill(255);
    strokeWeight(10);
    line(width / 2, height / 2 + bodyHeight, width / 2 + 40, height / 2 + 80 + bodyHeight);
    
    inc = inc + 0.01;
}