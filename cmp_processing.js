/* Constants */
const Y_AXIS = 1; // axis of gardient
const X_AXIS = 2;
const WIDTH_CANVAS = 1500;
const HEIGHT_CANVAS = 900;

/* Buttons */
let playBtn, answerBtn, wrongBtnOne, wrongBtnTwo;
/* Values for creating button */
let contentBtn, xPosBtn, yPosBtn, widthBtn, heightBtn;
/* Font of fancy text */
let font;
/* Variables to store fancy text */
let title, questionOne, questionTwo, questionThree;

const manager = new Manager(WIDTH_CANVAS, HEIGHT_CANVAS);

function preload() {
  font = loadFont(
    "http://themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf"
  );
}

function setup() {
  // Display initial screen
  manager.displayInitScreen();

  // Instanciate title and questions
  title = manager.generateFancyText("QUESTION BOARD", 400, 200, 80, font);
  questionOne = manager.generateFancyText(
    "Choose the animal which lives in 'Antarctica'",
    100,
    200,
    60,
    font
  );
  questionTwo = manager.generateFancyText("Question two", 100, 200, 80, font);
  questionThree = manager.generateFancyText(
    "Question three",
    100,
    200,
    80,
    font
  );

  title.need = 1; // We need to display title when we start our app.
}

function draw() {
  /* Draw background */
  manager.setGradient(
    0,
    0,
    manager.width,
    manager.height,
    color(65),
    color(50),
    Y_AXIS
  );

  /* Scene flow. */
  if (title.need) {
    title.drawFancyText();
  } else if (questionOne.need) {
    questionOne.drawFancyText();
  }

  /* Scene01 -> Scene02 */
  playBtn.mousePressed(() => {
    // Hide title and playbutton
    manager.hideFancyText(title);
    manager.hideButton(playBtn);

    // Display question one and multiple choices
    manager.displayFancyText(questionOne);

    // Display multiple choices
    manager.setValuesBtn("Arctic bear", 600, 400, 320, 70);
    wrongBtnOne = manager.displayButton(
      contentBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );

    manager.setValuesBtn("Penguin", 600, 500, 320, 70);
    answerBtn = manager.displayButton(
      contentBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );

    manager.setValuesBtn("Arctic fox", 600, 600, 320, 70);
    wrongBtnTwo = manager.displayButton(
      contentBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );
  });
}
