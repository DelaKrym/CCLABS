let curScene = 0;
//let scrollY = window.scrollY;
let scenes = [];


function preload() {
  //Images & text
  scenes.push(new Scene(
    //scene0
    ['Assets/children.png'],
    ['Welcome to 2070', 'I have a great story to share with you.', 'In 2020, our beloved country faced a severe enviromental crisis.',
      'Illegal mining', 'Today, I would like to share stories of two cities and how they dealt it illegal mining.'], 0));
  scenes.push(new Scene(
    //scene1
    ['Assets/city_a.png', 'Assets/negotiation_a.png'],
    ['City A', 'Mr. Eric, a 60 years old man, decided to his land to a illegal miner for a quick money as he thought farming was waste of his time',
      'As he has discovered he would get huge sums of money from the sale of the land'], 1));
  scenes.push(new Scene(
    //scene2
    ['Assets/rich_family.png'],
    ['After 2 years, Mr. Eric became rich.', 'But due to the pollution situation in his commmunity, He has to import drinking water and foodstuffs, which was expensive',
      'Since, he was not getting enough money from his business, poverty started to struck him and his family'], 2));
  scenes.push(new Scene(
    //scene3
    ['Assets/sick_family.png', 'Assets/grave.png'],
    ['Due to the influx of chemicals in the environment,he and his family became illness after they started drinking and eating from waterbodies and farms in the community',
      'Unfortunately, he and his family died from prolonged illness caused the pollution in the environment.'], 3));
  scenes.push(new Scene(
    //scene4
    ['Assets/city_b.png', 'Assets/negotiation_b.png'],
    ['City B', 'Mr. Jacob, a hardworking farmer and a father of six',
      'Mr. Jacob was approached by a mining company with a hefty sums of money to persuade him to sell his farmland after discovering gold deposits beneath his land'
    ], 4));
  scenes.push(new Scene(
    //scene5
    ['Assets/large_farm.png'],
    ['Mr. Jacob refused as that farmland was his only source of income and also farmland was not far from the city, which is not ideal for mining '], 5));
  scenes.push(new Scene(
    //scene6
    ['Assets/national_best_farmer.png'],
    ["After several years, Mr. Jacob's farmland became huge which led him to exporting his crops to other cities and neighbouring countries "], 6));
  scenes.push(new Scene(
    //scene7
    ['Assets/family_farms.png'],
    ['Due to his hardwork, he won the national best farmer in Ghana and his children won scholarships to study in the top universities in the country', 'Mr. Jacob lived a happy life with his family and his community thrived due to the good environment they lived in'], 7));
  scenes.push(new Scene(
    //scene8
    ['Assets/children.png', 'Assets/illegal_miners.png'],
    ['Moral of the story: Illegal mining has more cons than pros. It destroys the environment and affects the health of the people living in that community. Choose wisely.'], 8));

  for (let s of scenes) {
    s.preload();
  }

  mySound = loadSound("Sounds/song.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //canvas.parent('p5-canvas-container');

}

function draw() {
  background("white");
  scrollY = window.scrollY;
  //scenes[curScene].update(scrollY);

  curScene = int(scrollY / 500);
  curScene = constrain(curScene, 0, scenes.length - 1);
  scenes[curScene].display(scrollY);

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

  let panValue = map(scrollY, 0, 2000, -1, 1);
  mySound.pan(panValue);

  let rateValue = map(scrollY, 0, 2000, 0.5, 2);
  mySound.rate(rateValue);
}

class Scene {
  constructor(img, text, index) {
    this.img = img;
    this.text = text;
    this.images = [];
    this.speed = 2;
    this.index = index;
    this.imgFade = 0;
    // this.x = x;
    // this.y = y;
    // this.w = w;
    // this.h = h;

  }
  preload() {
    for (let s of this.img) {
      this.images.push(loadImage(s));
    }
  }

  update(scrollY) {
    let start = this.index * 500;
    let end = start + 500;
    if (scrollY >= start && scrollY < end) {
      curScene = this.index;
    }

  }
  display(scrollY) {
    let curScroll = scrollY - this.index * 500;
    let margin = 40;
    let space = 12;
    let imgW = width * 0.4;
    let imgH = imgW * 0.75;
    let imgX = margin;
    let textX = imgX + imgW + 30;
    let yBase = 100 - curScroll * this.speed;

    for (let i = 0; i < this.images.length; i++) {
      image(this.images[i], imgX + i, yBase, imgW, imgH);
    }
    for (let i = 0; i < this.text.length; i++) {
      textSize(24);
      textFont('Caveat')
      textAlign(CENTER, CENTER);
      textWrap(WORD);
      fill(30);

      text(this.text[i], width / 2, 500 + i * 50 - curScroll * this.speed);

    }
  }
}

function mousePressed() {
  if (!mySound.isPlaying()) {
    mySound.loop();
  }
}

