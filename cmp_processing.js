// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
const WIDTH_CANVAS = 900;
const HEIGHT_CANVAS = 900;

let playButton;
let font;
let title;
const questions = [];

const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);

function preload() {
  font = loadFont("http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf");
}

function setup() {
  manager.drawStartCanvas();
  
  //playButton.mousePressed(manager.redrawCanvas);
  title = new FancyText('QUESTION BOARD', 100, 200, 80, font);
  title.createFancyText();
}

function draw() {
  manager.setGradient(0, 0, manager.width, manager.height, color(65), color(50), Y_AXIS);

  if (title.need) {
    title.drawFancyText();
  }

  playButton.mousePressed(title.deleteFancyText);
  //console.log(title.need);
}
