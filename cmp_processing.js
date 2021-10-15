/* Constants */
const Y_AXIS = 1; // axis of gardient
const X_AXIS = 2;
const WIDTH_CANVAS = 1450;
const HEIGHT_CANVAS = 800;

const SNOW_COLOR = "snow";
const SNOWFLAKES_PER_LAYER = 200;
const MAX_SIZE = 10;
//const GRAVITY = 0.5;
const LAYER_COUNT = 4;

const SKY_COLOR = "skyblue";
const SKY_SPACE = 0.4;
const SKY_AMP = 150;
const SKY_ZOOM = 0.0025;
const SKY_LAYER_OFFSET = 3;

const WIND_SPEED = 1;
const WIND_CHANGE = 0.0025;

const SUN_COLOR = "#FFF2AD";
const SUN_GLOW = 100;
const SUN_RADIUS = 150;

const RIDGE_TOP_COLOR = "#BCCEDD";
const RIDGE_BOT_COLOR = "#7E9CB9";
const RIDGE_STEP = 4;
const RIDGE_AMP = 250;
const RIDGE_ZOOM = 0.005;
  let snow=0.3;

const SNOWFLAKES = [];
/* Buttons */
let btnPlay, btnAnswer, btnWrongOne, btnWrongTwo, btnNext;
/* Values for creating button */
let textBtn, xPosBtn, yPosBtn, widthBtn, heightBtn;
/* Font of fancy text */
let font;
/* Variables to store fancy text */
let title, questionOne, questionOne_2, questionTwo, questionTwo_2, questionThree, questionThree_2;
/* Variables to change background */
let needGradient, needPenguinScene, needGateScene,needSnowScene;
/* background image */
let antarctica, gate;
/* sound */
let song;

const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);
const managerGame = new ManagerGame();
const managerGate = new ManagerGate();
const managersnow = new ManagerSnow();

function preload() {
  font = loadFont(
    "http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf"
  );
  antarctica = loadImage("data/antarctica.jpeg");
  gate = loadImage("data/Janganmun.jpg");
  
  soundFormats('mp3');
  song = loadSound("data/music.mp3");
}

function setup() {
  manager.setInit();
  manager.displayInitScreen();
    for (let l = 0; l < LAYER_COUNT; l++) {
    SNOWFLAKES.push([]);
    for (let i = 0; i < SNOWFLAKES_PER_LAYER; i++) {
      SNOWFLAKES[l].push({
        x: random(width),
        y: random(height),
        mass: random(0.75, 1.25),
        l: l + 1
      });
    }
  }
}

function draw() {
  /* Draw Main Scene */
  if (needGradient) {
    manager.setGradient(0, 0, manager.width, manager.height, color(65), color(50), Y_AXIS);
  } else if (needPenguinScene) {
    managerGame.drawPenguinScene();
    managerGame.controlPenguin();
    managerGame.movePenguinRight();
    managerGame.movePenguinLeft();
    drawSprites();
  } else if (needGateScene){
    managerGate.drawGateScene();
  }else if(needSnowScene){
    noStroke();
    snowdraw();
  }


  /* Draw Question Scene. */
  if (title.need) {
    title.drawFancyText();
  } else if (questionOne.need && questionOne_2.need) {
    questionOne.drawFancyText();
    questionOne_2.drawFancyText();
  } else if (questionTwo.need && questionTwo_2.need) {
    questionTwo.drawFancyText();
    questionTwo_2.drawFancyText();
  } else if (questionThree.need && questionThree_2.need) {
    questionThree.drawFancyText();
    questionThree_2.drawFancyText();
  }

  /* Initial Scene -> Question01 */
  btnPlay.mousePressed(() => {
    manager.drawQuestionScene(questionOne, questionOne_2, "Penguin", "Arctic bear", "Arctic fox");
    manager.deleteFancyText(title);

    /* Question01 -> Question01-Main */
    btnAnswer.mousePressed(() => {
      /* Previous setting off */
      manager.hideQuestionScene(questionOne, questionOne_2, btnAnswer, btnWrongOne, btnWrongTwo);
      manager.turnOffGradient();
      /* Penguin setting on */
      manager.changeBtnPos(btnNext, btnNext.x + 20, 20);
      manager.turnOnPenguinScene();
      managerGame.createPenguin();

      /* Question01-Main -> Question02 */
      btnNext.mousePressed(() => {
        /* Previous setting off */
        manager.turnOffPenguinScene();
        /* Question02 setting on */
        manager.turnOnGradient();
        manager.drawQuestionScene(questionTwo, questionTwo_2, "Paldalmun Gate", "Janganmun Gate", "Hwaseomun Gate");
        manager.hideMainScene(btnNext);

        /* Question02 -> Question02-Main */
        btnAnswer.mousePressed(() => {
          manager.hideQuestionScene(questionTwo, questionTwo_2, btnAnswer, btnWrongOne, btnWrongTwo);
         
          song.play();
          manager.turnOffGradient();
          manager.turnOnGateScene();
          
          /* Question02-Main -> Question03*/
          btnNext.mousePressed(() => {
            song.pause();
            manager.turnOffGateScene();
            manager.turnOnGradient();
            manager.drawQuestionScene(questionThree, questionThree_2, "Anna", "Elsa", "Olaf");
            manager.hideMainScene(btnNext);

            /* Question03 -> Question03-Main */
            btnAnswer.mousePressed(() => {
              manager.hideQuestionScene(questionThree, questionThree_2, btnAnswer, btnWrongOne, btnWrongTwo);
              manager.hideMainScene(btnNext);
              manager.turnOffGradient();
              manager.turnOnSnowScene();
            });
          });
        });
      });
    });
  });
}
