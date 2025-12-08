let curScene = 0;
//let scrollY = window.scrollY;
let scenes = [];

let bg0;
let bg1;
let bg2;

let amp;

function preload() {
  //Images & text
  scenes.push(new Scene(
    //scene0
    ['Assets/children.png'],
    ['🎉Welcome to 2070🎉\nI have a great story to share with you\nIn 2020, our beloved country faced a severe enviromental crisis, illegal mining.\nToday, I would like to share stories of two cities and how they dealt it.'],
    0));
  scenes.push(new Scene(
    //scene1
    ['Assets/negotiation_a.png'],
    ['Mr. Eric, a 60 years old man\nDecided to his land to a illegal miner for a quick money\n As he thought farming was waste of his time\nAs he has discovered he would get huge sums of money from the sale of the land'], 1));
  scenes.push(new Scene(
    //scene2
    ['Assets/rich_family.png'],
    ['After 2 years, Mr. Eric became rich\nBut due to the pollution situation in his commmunity\nHe has to import drinking water and foodstuffs, which was expensive\nSince, he was not getting enough money from his business\nPoverty started to struck him and his family'], 2));
  scenes.push(new Scene(
    //scene3
    ['Assets/sick_family.png'],
    ['Due to the influx of chemicals in the environment,he and his family became illness\nAfter they started drinking and eating from waterbodies and farms in the community\nUnfortunately, he and his family died from prolonged illness caused the pollution in the environment.'], 3));
  scenes.push(new Scene(
    //scene4
    ['Assets/negotiation_b.png'],
    ['Mr. Jacob, a hardworking farmer and a father of six\nMr. Jacob was approached by a mining company with a hefty sums of money\nto persuade him to sell his farmland\nAfter discovering gold deposits beneath his land'
    ], 4));
  scenes.push(new Scene(
    //scene5
    ['Assets/family_farms.png'],
    ['Mr. Jacob refused as that farmland was his only source of income\nAnd the location of the farmland was not ideal for mining '], 5));
  scenes.push(new Scene(
    //scene6
    ['Assets/large_farm.png'],
    ["After several years, Mr. Jacob's farmland became huge\n He started exporting his crops to other cities and neighbouring countries "], 6));
  scenes.push(new Scene(
    //scene7
    ['Assets/national_best_farmer.png'],
    ['Due to his hardwork, he won the national best farmer in Ghana\n And his children won scholarships to study in the top universities in the country\nMr. Jacob lived a happy life with his family\nAnd his community thrived due to the good environment they lived in'], 7));
  scenes.push(new Scene(
    //scene8
    ['Assets/illegal_miners.png'],
    ['Moral of the story: Illegal mining has more cons than pros\nIt destroys the environment and affects the health of the people living in that community\nChoose wisely.'], 8));
  scenes.push(new Scene(
    ['Assets/children.png'],
    ['END'], 9
  ))

  for (let s of scenes) {
    s.preload();
  }
  bg0 = loadImage("Assets/kids.jpg")
  bg1 = loadImage("Assets/city_1.jpg");
  bg2 = loadImage("Assets/city_2.png");

  mySound = loadSound("Sounds/calm_music.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //canvas.parent('p5-canvas-container');
  amp = new p5.Amplitude();
  amp.setInput(mySound);
}

function draw() {
  tint(255, 255, 255, 255);
  background("d0d0d0");
  if (curScene == 0) {
    image(bg0, 0, 0, windowWidth, windowHeight);
  }
  else if (curScene > 0 && curScene <= 4) {
    image(bg1, 0, 0, windowWidth, windowHeight);
    textSize(50);
    textFont("Amatic SC")
    text('City A', windowWidth / 2, 0);
  } else if (curScene >= 5) {
    image(bg2, 0, 0, windowWidth, windowHeight);
    textSize(50);
    textFont("Amatic SC")
    text('City B', windowWidth / 2, 0);

  }

  let rectW = width * 0.8;
  let rectH = height * 0.8;
  let rectX = (width - rectW) / 2;
  let rectY = (height - rectH) / 2;

  fill("lightgray");
  stroke("black");
  strokeWeight(7);
  rect(rectX, rectY, rectW, rectH);
  noStroke();

  scrollY = window.scrollY;
  for (let s of scenes) {
    s.display(scrollY);
  }




  curScene = int(scrollY / 200);
  curScene = constrain(curScene, 0, scenes.length - 1);
  //scenes[curScene].display(scrollY);

  // this is a number between 0 and 1
  // let scrollY =
  //   window.scrollY /
  // (document.documentElement.scrollHeight - window.innerHeight);
  //let scrollY = window.scrollY;

  if (keyIsPressed && key == "w") {
    window.scrollY--;
  }
  if (keyIsPressed && key == "s") {
    window.scrollY++;
  }


  let volValue = map(scrollY, 0, 2000, 0, 1);
  mySound.setVolume(volValue);
  let level = amp.getLevel();
  let moveY = map(level, 0, 0.3, -30, 30);
  // Instructions
  textSize(16);
  textFont('Caveat')
  textAlign(LEFT, TOP);
  stroke(255)
  fill(0);
  text("Scroll to explore the story\nPress 'W' to scroll up\nPress 'S' to scroll down\nClick to play music", 20, 20);


}
class Scene {
  constructor(img, text, index) {
    this.img = img;
    this.text = text;
    this.images = [];
    this.speed = 5;
    this.index = index;

    //this.ImgSettings = ImgSettings;


  }
  preload() {
    for (let s of this.img) {
      this.images.push(loadImage(s));
    }
  }

  update(scrollY) {
    let start = this.index * 500;
    let end = start + 200;

    if (scrollY >= start && scrollY < end) {
      curScene = this.index;
    }

  }
  display(scrollY) {
    let curScroll = scrollY - this.index * 300;
    let margin = 40;
    let space = 12;
    let imgW = width * 0.4;
    let imgH = imgW * 0.75;
    let imgX = margin;

    let alpha = constrain(map(curScroll, 0, 150, 255, 0), 0, 255);


    let yBase = 100 - curScroll * this.speed;
    let contentW = this.images.length * imgW + (this.images.length - 1) * margin;

    if (this.index === 0) {
      fill(30, alpha);
      textSize(40);
      textFont('Amatic SC');
      textAlign(CENTER, CENTER);
      textWrap(WORD);
      text(this.text[0], width / 2, height / 2);

      return;
    }
    for (let i = 0; i < this.images.length; i++) {
      fill(255, alpha);
      let moveY = map(amp.getLevel(), 0, 0.3, -30, 30);
      let y = yBase + moveY;
      let x = (width - contentW) / 2 + i * (imgW + margin);

      image(this.images[i], x, y, imgW, imgH);
    }
    for (let i = 0; i < this.text.length; i++) {
      noTint()
      fill(30, alpha);
      textSize(24);
      textFont('Caveat')
      textAlign(CENTER, CENTER);
      textWrap(WORD);


      text(this.text[i], width / 2, 550 + i * 50 - curScroll * 4);

    }
  }
}

function mousePressed() {
  if (!mySound.isPlaying()) {
    mySound.loop();
  } else {
    return false;
  }
}

