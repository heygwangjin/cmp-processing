/**
 * Created by Gwang Jin Kim on 9/30/21.
 * This class is responsible for managing the scenes of question board
 * and the components to make scene.
 */
class Manager {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.startingTime = 0;
    this.wrong = 0;
  }

  // * We can here implement everything that needs to be assigned at the start of the program.
  setInit() {
    /* Instanciate title and questions with FancyText*/
    title = manager.generateFancyText("QUESTION BOARD", 400, 200, 80, font);
    questionOne = manager.generateFancyText(
      "Choose the animal",
      250,
      200,
      80,
      font
    ); // First line
    questionOne_2 = manager.generateFancyText(
      "which lives in 'Antarctica'",
      250,
      300,
      80,
      font
    ); // Second line
    questionTwo = manager.generateFancyText(
      "Choose the 'north gate'",
      100,
      200,
      80,
      font
    ); // First line
    questionTwo_2 = manager.generateFancyText(
      "from Suwon Hwaseong fortress",
      100,
      300,
      80,
      font
    ); // Second line
    questionThree = manager.generateFancyText(
      "Choose the character who sang ",
      100,
      200,
      80,
      font
    ); // First Line
    questionThree_2 = manager.generateFancyText(
      "‘show yourself’ in movie of the Frozen?",
      100,
      300,
      70,
      font
    ); // Second Line

    /* Set need variables*/
    title.need = 1; // We need to display title when we start our app.
    needGradient = 1;
    needPenguinScene = 0;
    needSnowScene=0;
    needFinalScene=0;
  }

  displayInitScreen() {
    createCanvas(this.width, this.height);
    this.setValuesBtn("PLAY!", 600, 600, 320, 70);
    btnPlay = this.generateBtn(
      textBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );
  }

  /* FancyText */
  generateFancyText(text, x, y, size, font) {
    // Create FancyText after instanciating FancyText
    const fancyText = new FancyText(text, x, y, size, font);
    fancyText.createFancyText();

    return fancyText;
  }

  deleteFancyText(fancyText) {
    fancyText.vehicles = [];
  }

  displayFancyText(fancyText) {
    fancyText.need = 1;
  }

  hideFancyText(fancyText) {
    fancyText.need = 0;
  }

  /* Button */
  setValuesBtn(text, x, y, w, h) {
    textBtn = text;
    xPosBtn = x;
    yPosBtn = y;
    widthBtn = w;
    heightBtn = h;
  }

  generateBtn(text, positionX, positionY, width, height) {
    const btn = createButton(text);
    btn.position(positionX, positionY);
    btn.size(width, height);

    return btn;
  }

  hideBtn(btn) {
    btn.elt.style.display = "none";
  }

  changeBtnPos(btn, x, y) {
    btn.position(x, y);
  }

  drawQuestionScene(firstLine, secondLine, answer, wrong1, wrong2) {
    this.displayFancyText(firstLine);
    this.displayFancyText(secondLine);

    this.setValuesBtn(answer, 600, 500, 320, 70);
    btnAnswer = manager.generateBtn(
      textBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );

    this.setValuesBtn(wrong1, 600, 400, 320, 70);
    btnWrongOne = manager.generateBtn(
      textBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );

    this.setValuesBtn(wrong2, 600, 600, 320, 70);
    btnWrongTwo = manager.generateBtn(
      textBtn,
      xPosBtn,
      yPosBtn,
      widthBtn,
      heightBtn
    );

    if(title.need === 1) this.hideFancyText(title);
    if(btnPlay.elt.style.siplay !== "none") this.hideBtn(btnPlay);
  }

  hideQuestionScene(firstLine, secondLine, btn1, btn2, btn3) {
    this.hideFancyText(firstLine);
    this.hideFancyText(secondLine);
    this.deleteFancyText(firstLine);
    this.deleteFancyText(secondLine);

    this.hideBtn(btn1);
    this.hideBtn(btn2);
    this.hideBtn(btn3);

    this.setValuesBtn("Next", width - 200, height - 100, 150, 70);
    btnNext = manager.generateBtn(textBtn, xPosBtn, yPosBtn, widthBtn, heightBtn);
  }

  /* Background Control */
  turnOffGradient(){
    needGradient = 0;
  }

  turnOnGradient(){
    needGradient = 1;
  }

  turnOnPenguinScene(){
    needPenguinScene = 1;
    managerGame.overTime = millis() / THOUSAND;
  }

  turnOffPenguinScene(){
    needPenguinScene = 0;
    snowballs = null;
    penguin = null;
  }
  
  turnOnGateScene(){
    needGateScene = 1;
  }
  
  turnOffGateScene(){
    needGateScene = 0;
  }

  turnOnSnowScene(){
    needSnowScene = 1;
  }
    turnOffSnowScene(){
    needSnowScene = 0;
  }

   turnOnFinalScene(){
    needFinalScene = 1;
  }
  
  turnOffFinalScene(){
    needFinalScene = 0;
  }

  /* Hide btn and main scene */
  hideMainScene(btn){
    this.hideBtn(btn);
    redraw();
  }

  setWrong(){
    array = wrongFont.textToPoints("WRONG!", width/3-70, height/2-100, WRONG_SIZE);
  }

  displayWrong(q1, q2){
    this.wrong = 1;
    this.hideFancyText(q1);
    this.hideFancyText(q2);

    // Display wrong text for 2 seconds.
    setTimeout(() => {
      this.wrong = 0;
      this.displayFancyText(q1);
      this.displayFancyText(q2);
    }, 700);
  }

  hideWrong() {
    this.wrong = 0;
  }

  // Reference : https://openprocessing.org/sketch/1250854
  drawWrong(){
    fill(RED);
    for(let i=0; i<array.length; i++){
      push();
        translate(array[i].x, array[i].y);
        scale(0.2);
        rotate(r);
        r+=0.001;
        strokeWeight(0.45);
        rect(0,0,40,40);
      pop();
    }
  }

  // Use p5.js example
  setGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
}
