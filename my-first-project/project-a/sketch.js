/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x, y;
let xImpulse, yImpulse, sizeImpulse;
let xspeed, yspeed;
let bgYspeed;
let size1 = 30,
  size2 = 30,
  size3 = 30,
  size4 = 30;

let foodX = 400;
let foodY = 250;

// Water droplet state
let dropY1 = 100, dropSpeed1 = 1 ;
let dropY2 = 200, dropSpeed2 = 0.5;
let dropY3 = 200, dropSpeed3 = 1;
let dropY4 = 300, dropSpeed4 = 0.5;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  x = width / 2;
  y = height / 2;
  xspeed = random(0.2, 0.5);
  yspeed = random(0.2, 0.5);
  bgYspeed = 2;
}

function draw() {
  background(220);

  // Draw static grid once
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      let cx = i + i * 15;
      let cy = j + j * 15;
      noStroke();
      fill(
        lerpColor(color("lightblue"), color("salmon"), map(cx, 1, width, 0, 1))
      );
      circle(cx, cy, random(100));
    }
  }

  // Draw and update water droplet
  let result1 = drawWaterDroplet(100, dropY1, dropSpeed1);
  dropY1 = result1.y;
  dropSpeed1 = result1.speed;
  
  let result2 = drawWaterDroplet(100, dropY2, dropSpeed2);
  dropY2 = result2.y;
  dropSpeed2 = result2.speed;
  
  let result3 = drawWaterDroplet(500, dropY3, dropSpeed3);
  dropY3 = result3.y;
  dropSpeed3 = result3.speed;
  
  let result4 = drawWaterDroplet(500, dropY4, dropSpeed4);
  dropY4 = result4.y;
  dropSpeed4 = result4.speed;




  // Draw trees
  for (let i = 0; i < width; i += 50) {
    drawTree(i, height - 50);
  }

  // Update Deon position
  x += xspeed;
  y += yspeed;

  // Draw Deons and update their sizes
  size1 = drawBody(x + 100, y + 100, size1);
  size2 = drawBody(x - 100, y - 100, size2);
  size3 = drawBody(x - 300, y, size3);
  size4 = drawBody(x + 200, y - 100, size4);

  // Move food with arrow keys
  handleFoodMovement();

  // Draw food
  fill("green");
  circle(foodX, foodY, 10);
}

// Handle Food Movement
function handleFoodMovement() {
  if (keyIsDown(LEFT_ARROW)) foodX -= 3;
  if (keyIsDown(RIGHT_ARROW)) foodX += 3;
  if (keyIsDown(UP_ARROW)) foodY -= 3;
  if (keyIsDown(DOWN_ARROW)) foodY += 3;
}

// Draw a Deon Body
function drawBody(x, y, size) {
  push();
  let d = dist(mouseX, mouseY, x, y);
  let foodDist = dist(x, y, foodX, foodY);

  if (mouseIsPressed) {
    rotate(radians(random(sin(50 * frameCount)), frameCount / 200));
    fill("red");
  } else if (d < size + 30 || foodDist < size + 10) {
    fill(random(0, 100), random(100, 200), 0);
  } else {
    fill("blue");
  }

  if (foodDist < size - 10) {
    size += 1;
    foodX = random(width / 2);
    foodY = random(height / 2);
  }

  drawLimb(x, y);
  circle(x, y, size);

  if (x > width - 20 || x < 0) xspeed = -xspeed;
  if (y > height - 20 || y < 0) yspeed = -yspeed;
  
 //Eyes
  eye(x, y, 6);
  pop();
  return size;
}

// Draw Deon Limbs
function drawLimb(x, y) {
  push();
  translate(x, y);
  stroke(0, random(sin(frameCount)), random(100, 255));
  strokeWeight(2);
  for (let angle = 0; angle < TWO_PI; angle += PI / 4) {
    push();
    rotate(angle);
    noFill();
    beginShape();
    let lineLength = 60 + 10 * sin(frameCount * 0.1);
    for (let i = 0; i <= lineLength; i += lineLength / 3) {
      let v = 10 * sin(frameCount * 0.1 - i);
      vertex(i, v);
    }
    endShape();
    pop();
  }
  pop();
}

// Draw Eyes
function eye(x, y, size) {
  push();
  translate(x, y);
  fill("white");
  circle(-7, 0, size);
  circle(7, 0, size);
  fill("black");
  circle(-7 + mouseX * 0.01, 0, size - 3);
  circle(7 + mouseX * 0.01, 0, size - 3);
  pop();
}

// Draw Tree
function drawTree(x, y) {
  fill("brown");
  rect(x - 5, y, 10, 100);
  fill("green");
  triangle(x - 15, y, x, y - 30, x + 15, y);
}

// Draw and Update Water Droplet
function drawWaterDroplet(x, y, speed) {
  fill("lightcyan");
  noStroke();
  circle(x, y, 20);
  y += speed;
  if (y > height || y < 0) speed *= -1;
  return { y, speed };
}
