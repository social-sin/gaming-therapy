const Y_AXIS = 2;
const X_AXIS = 3;
let b1, b2, b3, c1, c2, c3;

var clouds;

var sequenceAni;
var player;

let song;

var w = 0;

function preload() {
  song = loadSound('BubblePop.mp3');
  clouds = loadImage('Clouds.png');
  sequenceAni = loadAnimation('B1.png','B2.png','B3.png', 'B4.png','B5.png', 'B6.png', 'B7.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  b1 = color('#1d77c4');
  b2 = color('#444da3');
  b3 = color('#581875');
  imageMode(CENTER);
}

function draw() {
  if (w === 0) {
    setGradient(0, 0, windowWidth, windowHeight, b3, b2, b1, Y_AXIS);
    image(clouds, windowWidth/2, windowHeight/2, windowHeight*1.5, windowHeight);
    stroke(255);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text('Click or Tap!', windowWidth/2, windowHeight/2);
  } else if (w > 0) {
    setGradient(0, 0, windowWidth, windowHeight, b3, b2, b1, Y_AXIS);
    image(clouds, windowWidth/2, windowHeight/2, windowHeight*1.5, windowHeight);
  }
  drawSprites();
}

function mousePressed() {
  song.play();
  w++;
  player = createSprite(windowWidth/2, windowHeight/2, random(10, 50), random(10, 50));
  player.velocity.x = random(3, 6);
  player.velocity.y = -3;
  player.position.x = mouseX;
  player.position.y = mouseY;
  player.scale = random(0.25, 1);
  player.addAnimation('bubbles', sequenceAni);
  player.life = 28;
  frameRate(65);
}

function touchStarted() {
  song.play();
  w++;
  player = createSprite(windowWidth/2, windowHeight/2, random(10, 50), random(10, 50));
  player.velocity.x = random(3, 6);
  player.velocity.y = -3;
  player.position.x = mouseX;
  player.position.y = mouseY;
  player.scale = random(0.55, 2);
  player.addAnimation('bubbles', sequenceAni);
  player.life = 28;
  frameRate(100);
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();
  if (axis === Y_AXIS) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}
