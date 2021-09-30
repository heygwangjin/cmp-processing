// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
const WIDTH_CANVAS = 900;
const HEIGHT_CANVAS = 900;

let playButton;
let xPosQuestion; // Variable for x position of question text
let yPosQuestion; // Variable for y position of question text
let sizeQuestion;
let vehicles = [];
let font;
const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);

function preload() {
  font = loadFont("http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf");
}

function setup() {
  manager.drawStartCanvas();
  playButton.mousePressed(manager.resetCanvas);
  
  xPosQuestion = 100;
  yPosQuestion = 200;
  sizeQuestion = 80;
  let points = font.textToPoints('QUESTION BOARD', xPosQuestion, yPosQuestion, sizeQuestion);
  
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  manager.setGradient(0, 0, manager.width, manager.height, color(65), color(50), Y_AXIS);
  
  for (let i=0; i < vehicles.length; i++){
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
