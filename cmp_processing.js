/* Constants */
const Y_AXIS = 1; // axis of gardient
const X_AXIS = 2;
const WIDTH_CANVAS = 1450;
const HEIGHT_CANVAS = 800;

/* Buttons */
let btnPlay, btnAnswer, btnWrongOne, btnWrongTwo, btnNext;
/* Values for creating button */
let textBtn, xPosBtn, yPosBtn, widthBtn, heightBtn;
/* Font of fancy text */
let font;
/* Variables to store fancy text */
let title, questionOne, questionOne_2, questionTwo, questionTwo_2, questionThree, questionThree_2;

const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);

function preload() {
  font = loadFont(
    "http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf"
  );
}

function setup() {
  manager.setInit();
  manager.displayInitScreen();
}

function draw() {
  /* Draw background */
  // TODO : 각자 기능 화면 실행할 때는 수행 안되게 하기
  manager.setGradient(0, 0, manager.width, manager.height, color(65), color(50), Y_AXIS);

  /* Scene flow. */
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

    /* Question01 -> Question01-Main */
    btnAnswer.mousePressed(() => {
      manager.hideQuestionScene(questionOne, questionOne_2, btnAnswer, btnWrongOne, btnWrongTwo);

      /* Question01-Main -> Question02 */
      btnNext.mousePressed(() => {
        manager.drawQuestionScene(questionTwo, questionTwo_2, "Paldalmun Gate", "Janganmun Gate", "Hwaseomun Gate");
        manager.hideMainScene(btnNext);

        /* Question02 -> Question02-Main */
        btnAnswer.mousePressed(() => {
          manager.hideQuestionScene(questionTwo, questionTwo_2, btnAnswer, btnWrongOne, btnWrongTwo);

          /* Question02-Main -> Question03*/
          btnNext.mousePressed(() => {
            manager.drawQuestionScene(questionThree, questionThree_2, "Anna", "Elsa", "Olaf");
            manager.hideMainScene(btnNext);

            /* Question03 -> Question03-Main */
            btnAnswer.mousePressed(() => {
              manager.hideQuestionScene(questionThree, questionThree_2, btnAnswer, btnWrongOne, btnWrongTwo);
              manager.hideMainScene(btnNext);
            });
          });
        });
      });
    });
  });
}