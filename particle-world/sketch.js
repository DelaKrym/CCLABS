// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 700; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), height - 100);
  }

  monoSynth = new p5.MonoSynth();
}

function draw() {
  background(0, 0, 20);// Planning on adding map color to it(which I would do later)
  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  // if (particles.length > MAX_OF_PARTICLES) {
  //   particles.splice(0, 1); // remove the first (oldest) particle
  // }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    if (p.shows == false) {
      particles.splice(i, 1);
    }
  }
  fill(255);
  textSize(12);
  text("particles length: " + particles.length, 10, 20);
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.size = random(2, 8);
    this.hue = random(0, 360);
    this.AccX = random(-0.1, 0.1);
    this.AccY = random(-0.1, 0.1);
    this.SpdX = random(-2.5, 2.5);
    this.SpdY = random(-2.5, 2.5);


    this.shows = true;

  }
  // methods (functions): particle's behaviors
  update() {

    this.AccX = map(sin(frameCount) / 2, -1, 1, -0.1, 0.1);
    this.AccY = map(cos(frameCount) / 2, 0, 1, -0.1, 0.1);

    this.x += this.SpdX;
    this.y += this.SpdY;
    this.SpdX = this.AccX;
    this.SpdY += this.AccY;

    this.SpdX *= 0.99;
    this.SpdY -= 0.15;

    this.checkOutOfCanvas();
    // (add) 

  }

  checkOutOfCanvas() {
    // check horizontal
    if (this.x > width || this.x < 0) {
      this.shows = false;
    }

    // check vertical
    if (this.y > height || this.y < 0) {
      this.shows = false;
    }
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    colorMode(HSB);
    fill(this.hue, 50, 100);
    noStroke();
    circle(0, 0, this.size);
    pop();
  }
}

function mousePressed() {
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width), height - 100))
  }

  let note = random(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']);
  let time = random(0, 0.5);
  let velocity = map(particles.length, 0, MAX_OF_PARTICLES, 0.2, 1);
  let dur = map(particles.length, 0, MAX_OF_PARTICLES, 0.1, 0.5);

  monoSynth.play(note, velocity, time, dur);
  monoSynth.pan(map(mouseX, 0, width, -1, 1));
}

