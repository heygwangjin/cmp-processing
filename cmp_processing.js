/* Constants */
const Y_AXIS = 1; // axis of gardient
const X_AXIS = 2;
const WIDTH_CANVAS = 1450;
const HEIGHT_CANVAS = 800;
const WRONG_SIZE = 150;

/* Buttons */
let btnPlay, btnAnswer, btnWrongOne, btnWrongTwo, btnNext;
/* Values for creating button */
let textBtn, xPosBtn, yPosBtn, widthBtn, heightBtn;
/* Font of fancy text */
let font, wrongFont, r = 0;
/* Variables to store fancy text */
let title, questionOne, questionOne_2, questionTwo, questionTwo_2, questionThree, questionThree_2;
/* Variables to change background */
let needGradient, needPenguinScene, needGateScene,needSnowScene,needFinalScene;
/* background image */
let antarctica, gate;
/* sound */
let song; 
let song_frozen;
/* filter image*/
let img;

let array;

const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);
const managerGame = new ManagerGame();
const managerGate = new ManagerGate();
const managersnow = new ManagerSnow();
const managerweather=new ManageWeather();
function preload() {
  font = loadFont(
    "http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf"
  );
  wrongFont = loadFont("data/Arial.ttf");
  antarctica = loadImage("data/antarctica.jpeg");
  gate = loadImage("data/Janganmun.png");
  
  soundFormats('mp3');
  song = loadSound("data/music.mp3");
  song_frozen=loadSound("data/frozen.mp3");
}

function setup() {
  manager.setInit();
  manager.displayInitScreen();
  manager.setWrong();
  weather_setup();
}

function draw() {
  /* Draw Main Scene */
  if (needGradient) {
    manager.setGradient(0, 0, manager.width, manager.height, color(65), color(50), Y_AXIS);
  } else if (needPenguinScene) {
    managerGame.drawPenguinScene();
    managerGame.createSnowball(time, speedSnowball, scaleSnowball);
    managerGame.movePenguinRight(1, RIGHT);
    managerGame.movePenguinLeft(1, LEFT);
    managerGame.controlPenguin();
    managerGame.checkGameOver();
    managerGame.removeSnowball(penguin.position.y);
    managerGame.changeLevel();
    managerGame.replay();
    drawSprites();
  } else if (needGateScene){
    managerGate.drawGateScene();
    managerGate.gateFilter();
  }else if(needSnowScene){
    noStroke();
    frozen_draw();
  }
  else if(needFinalScene){
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

  if(manager.wrong) manager.drawWrong();

  /* Initial Scene -> Question01 */
  btnPlay.mousePressed(() => {
    manager.drawQuestionScene(questionOne, questionOne_2, "Penguin", "Arctic bear", "Arctic fox");
    manager.deleteFancyText(title);
    manager.changeBtnPos(btnAnswer, btnAnswer.x, btnAnswer.y + 100);
    manager.changeBtnPos(btnWrongOne, btnWrongOne.x, btnWrongOne.y + 100);
    manager.changeBtnPos(btnWrongTwo, btnWrongTwo.x, btnWrongTwo.y - 200);
    btnWrongOne.mousePressed(() => {
      manager.displayWrong(questionOne, questionOne_2);
    });

    btnWrongTwo.mousePressed(() => {
      manager.displayWrong(questionOne, questionOne_2);
    });

    /* Question01 -> Question01-Main */
    btnAnswer.mousePressed(() => {
      /* Previous setting off */
      manager.hideQuestionScene(questionOne, questionOne_2, btnAnswer, btnWrongOne, btnWrongTwo);
      manager.turnOffGradient();
      manager.hideWrong();
      /* Penguin setting on */
      manager.changeBtnPos(btnNext, btnNext.x + 20, 20);
      manager.turnOnPenguinScene();
      managerGame.createPenguin(WIDTH_CANVAS/2, HEIGHT_CANVAS - 170, .5, .11);

      /* Question01-Main -> Question02 */
      btnNext.mousePressed(() => {
        /* Previous setting off */
        manager.turnOffPenguinScene();
        /* Question02 setting on */
        manager.turnOnGradient();
        manager.drawQuestionScene(questionTwo, questionTwo_2, "Janganmun Gate", "Paldalmun Gate", "Hwaseomun Gate");
        manager.hideMainScene(btnNext);

        btnWrongOne.mousePressed(() => {
          manager.displayWrong(questionTwo, questionTwo_2);
        });

        btnWrongTwo.mousePressed(() => {
          manager.displayWrong(questionTwo, questionTwo_2);
        });

        /* Question02 -> Question02-Main */
        btnAnswer.mousePressed(() => {
          manager.hideQuestionScene(questionTwo, questionTwo_2, btnAnswer, btnWrongOne, btnWrongTwo);
          background(10);
          song.play();
          manager.turnOffGradient();
          manager.turnOnGateScene();
          manager.hideWrong();
          
          /* Question02-Main -> Question03*/
          btnNext.mousePressed(() => {
            song.pause();
            manager.turnOffGateScene();
            manager.turnOnGradient();
            manager.drawQuestionScene(questionThree, questionThree_2, "Elsa", "Anna", "Olaf");
            manager.changeBtnPos(btnAnswer, btnAnswer.x, btnAnswer.y - 100);
            manager.changeBtnPos(btnWrongOne, btnWrongOne.x, btnWrongOne.y + 200);
            manager.changeBtnPos(btnWrongTwo, btnWrongTwo.x, btnWrongTwo.y - 100);
            manager.hideMainScene(btnNext);

            btnWrongOne.mousePressed(() => {
              manager.displayWrong(questionThree, questionThree_2);
            });

            btnWrongTwo.mousePressed(() => {
              manager.displayWrong(questionThree, questionThree_2);
            });
            /* Question03 -> Question03-Main */
            btnAnswer.mousePressed(() => {
              manager.hideMainScene(btnNext);
                manager.hideQuestionScene(questionThree, questionThree_2, btnAnswer, btnWrongOne, btnWrongTwo);
              manager.turnOffGradient();
              manager.turnOnSnowScene();
            song_frozen.play();
            manager.hideWrong();
            btnNext.mousePressed(()=>{
              song_frozen.stop();
              manager.turnOffSnowScene();
              manager.hideMainScene(btnNext);
              manager.turnOnFinalScene();
            });
            });
          });
        });
      });
    });
  });
}