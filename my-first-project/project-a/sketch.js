let x, y;
let x1 = 200;
let y1 = 200;
let x2 = 300;
let y2 = 100;
let x3 = 400;
let y3 = 200;
let xspeed, yspeed;
let size1 = 30,
  size2 = 30,
  size3 = 30,
  size4 = 30;
let foodX = 400;
let foodY = 250;

// Water droplet state
let dropY1 = 100,
  dropSpeed1 = 1;
let dropY2 = 200,
  dropSpeed2 = 0.5;
let dropY3 = 200,
  dropSpeed3 = 1;
let dropY4 = 300,
  dropSpeed4 = 0.5;

// particle
let partX;
let partY;
let partXDest;
let partYDest;
let hasParticle = false;
let lerpProgress = 0;
let showText = false;

function setup() {
  let canvas =createCanvas(800, 500);
  canvas = canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;

  xspeed1 = random(1, 3);
  yspeed1 = random(1, 3);
  xspeed2 = random(0.2, 0.5);
  yspeed2 = random(0.5, 1);
  xspeed3 = random(0.5, 1);
  yspeed3 = random(0.5, 1);
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
  if (showText) {
    fill(0);
    textSize(20);
    text("Message", 20, 40);
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
  x1 += xspeed1;
  y1 += yspeed1;
  x2 += xspeed2;
  y2 += yspeed2;
  x3 += xspeed3;
  y3 += yspeed3;
  if (x1 > width - 20 || x1 < 20) xspeed1 = -xspeed1;
  if (y1 > height - 20 || y1 < 20) yspeed1 = -yspeed1;
  if (x2 > width - 20 || x2 < 20) xspeed2 = -xspeed2;
  if (y2 > height - 20 || y2 < 20) yspeed2 = -yspeed2;
  if (x3 > width - 20 || x3 < 20) xspeed3 = -xspeed3;
  if (y3 > height - 20 || y3 < 20) yspeed3 = -yspeed3;

  // Draw Deons and update their sizes
  size1 = drawBody(x1, y1, size1);
  size2 = drawBody(x2, y2, size2);
  size3 = drawBody(x3, y3, size3);

  // Move food with arrow keys
  handleFoodMovement();

  // Draw food
  fill("green");
  circle(foodX, foodY, 10);

  // === Draw particle ===
  if (hasParticle) {
    fill(0);
    circle(partX, partY, 8);
    lerpProgress += 0.1;
    partX = lerp(partX, partXDest, lerpProgress);
    partY = lerp(partY, partYDest, lerpProgress);

    if (lerpProgress >= 1) {
      hasParticle = false;
      showText = false;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // space
    let from = floor(random(3));
    if (from == 0) {
      partX = x1;
      partY = y1;
    } else if (from == 1) {
      partX = x2;
      partY = y2;
    } else {
      partX = x3;
      partY = y3;
    }
    let to = floor(random(3));
    if (to == 0) {
      partXDest = x1;
      partYDest = y1;
    } else if (to == 1) {
      partXDest = x2;
      partYDest = y2;
    } else {
      partXDest = x3;
      partYDest = y3;
    }

    lerpProgress = 0;
    hasParticle = true;
    showText = true;
  }
}

// Handle Food Movement
function handleFoodMovement() {
  if (keyIsDown(LEFT_ARROW)) foodX -= 5;
  if (keyIsDown(RIGHT_ARROW)) foodX += 5;
  if (keyIsDown(UP_ARROW)) foodY -= 5;
  if (keyIsDown(DOWN_ARROW)) foodY += 5;
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
