
let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new StephenDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class StephenDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.col = color(176, 161, 130);
    angleMode(DEGREES);
    this.rightArmAngle = 0;
    this.leftArmAngle = 0;
    this.armSpeed = random(1, 4);
    this.leftLegAngle = 0;
    this.rightLegAngle = 0;
    this.legSpeed = random(3, 8);
    this.danceStep = 0;

  }
  update() {
    this.rightArmAngle = sin(frameCount * this.armSpeed + PI) * 30;
    this.leftArmAngle = cos(frameCount * this.armSpeed + PI) * 30;
    this.leftLegAngle = cos(frameCount * this.legSpeed + PI) * 20;
    this.rightLegAngle = sin(frameCount * this.legSpeed + PI) * 20;
    this.x = this.x + map(sin(frameCount * 10), -1, 1, -2, 2);

    if (mouseIsPressed) {
      this.danceStep = (this.danceStep + 1) % 60;

      // Two-steps forward
      if (this.danceStep < 30) {
        this.x = this.x + 1.5;
      } else {
        // Step back
        this.x = this.x - 1.5;
        this.leftarmAngle = cos(this.danceStep * 5) * 30;
        this.rightarmAngle = sin(this.danceStep * 5) * 30;
        this.leftLegAngle = cos(this.danceStep * 5) * 10;
        this.rightLegAngle = sin(this.danceStep * 5) * 10;


      }
    }

  }
  display() {
    push();
    translate(this.x, this.y);
    this.drawFace();
    this.drawBody();
    this.drawArm();
    this.drawLeg();
    pop();
  }
  // Face
  drawFace() {
    fill(this.col);
    ellipse(0, 0, 100);
    fill("white");
    //Eyes
    circle(-25, 0, 15);
    circle(25, 0, 15);

    //Pupil
    fill("black");
    circle(-25, 0, 6);
    circle(25, 0, 6);

    //nose
    triangle(0, 10, -6, 15, 6, 15);

    //mouth
    noStroke();
    fill("white");
    arc(0, 25, 30, 30, 0, -180);
  }
  //Body
  drawBody() {
    push();
    fill(this.col);
    noStroke();
    rect(- 50, 40, 100, 100);

    //Ghana flag
    fill("red");
    rect(-20, 70, 40, 10);
    fill("gold");
    rect(-20, 80, 40, 10);
    fill("green");
    rect(-20, 90, 40, 10);
    fill(0);
    triangle(-5, 85, 0, 80, 5, 85);
    triangle(-7, 85, 0, 83, 0, 88);
    triangle(7, 85, 0, 83, 0, 88);
    triangle(-5, 85, 0, 90, 5, 85);
    pop();
  }
  //Arm

  drawArm() {
    //Right-arm
    fill(this.col);
    push();
    translate(50, 50);
    rotate(this.rightArmAngle);
    noStroke();
    rect(-25, 5, 100, 20);
    circle(75, 20, 40);

    pop();

    //Left-arm
    push();
    translate(-50, 50);
    rotate(this.leftArmAngle);
    noStroke();
    rect(-75, 5, 100, 20);
    circle(-75, 15, 40);
    pop();
  }
  //Leg
  drawLeg() {

    //Left- leg
    push();
    translate(-25, 140);
    rotate(this.leftLegAngle)
    rect(-10, -10, 20, 70)
    pop();

    push();
    translate(25, 140);
    rotate(this.rightLegAngle);
    rect(-5, -10, 20, 70);
    pop();
  }
}

