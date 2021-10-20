/**
 * Created by Gwang Jin Kim on 10/14/21.
 * This class is responsible for managing about penguin scene.
 */

/* CONSTANTS */
const RIGHT = 0;
const LEFT = 180;
const THOUSAND = 1000;

let penguin;
let snowballs = [];
let time, speedSnowball, scaleSnowball;

class ManagerGame {
  constructor() {
    this.isEnd = 0;
    this.startingTime = 0;
    this.overTime = 0;
    this.elapsedTime = 0;
    this.win = 0;
    this.lose = 0;
  }
  /**
   * Draw initial scene of penguin game.
   */
  drawPenguinScene() {
    image(antarctica, 0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
    fill(0);
    textAlign(CENTER);
    textSize(26);
    if (!this.isEnd) text("Welcome to Penguin Game!", width / 2, 40);
    textSize(22);
    fill(50);
    text("Controller", 60, 30);
    textSize(18);
    text("a - move penguin to left", 100, 60);
    text("d - move penguin to right", 105, 80);
  }

  /**
   * Create penguin sprite.
   * @param {Number} w width of penguin.
   * @param {Number} h height of penguin.
   * @param {Number} s scale of penguin image.
   * @param {Number} f friction of penguin.
   */
  createPenguin(w, h, s, f) {
    penguin = createSprite(w, h); penguin.scale = s; //penguin.debug = true;
    penguin.setCollider("rectangle", 0, 0, 170, 310);
    penguin.friction = f;
    penguin.addAnimation("penguin", "data/penguin.png");
  }

  /**
   * Move penguin to the right.
   * @param {Number} s scalar speed to add of penguin.
   * @param {Number} a direction of penguin in degrees.
   */
  movePenguinRight(s, a){
    if (keyIsPressed === true && key === "d" && penguin.position.x < 1355) {
      penguin.addSpeed(s, a);
    }
  }

  /**
   * Move penguin to the left.
   * @param {Number} s scalar speed to add of penguin.
   * @param {Number} a direction of penguin in degrees.
   */
  movePenguinLeft(s, a){
    if (keyIsPressed === true && key === "a" && penguin.position.x > 94) {
      penguin.addSpeed(s, a);
    };
  }

  controlPenguin() {
    if (keyIsPressed === true) {
      if (key === "z") {
        penguin.rotation -= 10;
        penguin.velocity.x = random(-10, 10);
        penguin.velocity.y = random(-10, 10);
      }
    }
  }

  /**
   * Make snowball fall every t seconds after create it.
   * @param {Number} t seconds that make snow fall.
   * @param {Number} sp scalar speed to add at which snow fall.
   * @param {Number} sc scale at which snow create.
   */
  createSnowball(t, sp, sc) {
    if (millis() % t === 0 && !this.isEnd) {
      const snowball = createSprite(random(0, WIDTH_CANVAS), 20); snowball.scale = sc; snowball.debug = true;
      snowball.setCollider("circle", 0, 0, 300);
      snowball.addAnimation("snowball", "data/snowball.png");
      snowball.addSpeed(sp, 90);

      snowballs.push(snowball);
    }
  }

  /**
   * Remove snowball whithin a specified range.
   * @param {Number} range range of snowball that you want to remove.
   */
  removeSnowball(range) {
    snowballs.forEach(snowball => {if (snowball.position.y >= range) snowball.remove()});
  }

  /**
   * Check game over.
   */
  checkGameOver() {
    snowballs.forEach(snowball => {
      if (snowball.overlap(penguin)) {
        penguin.remove();
        this.lose = 1;
      }
    });

    /* LOSE !! */
    if (this.lose) {
      this.isEnd = 1;

      textSize(26);
      text("GAME OVER 😢", WIDTH_CANVAS/2, 40);
      text("Press 'r' if you want to see the penguin again! 🐧", WIDTH_CANVAS/2, 100);
    } else if(this.win) {
      this.isEnd = 1;

      textSize(26);
      text("CONGRATULATIONS 🎉", WIDTH_CANVAS/2, 40);
      text("You win the game 🏆", WIDTH_CANVAS/2, 100);
      text("Press 'r' if you want to play with penguin again! 🐧", WIDTH_CANVAS/2, 150);
    }
  }

  /**
   * Set variables in the difficulty of the game.
   * @param {Number} t seconds that make snow fall.
   * @param {Number} sp scalar speed to add at which snow fall.
   * @param {Number} sc scale at which snow create.
   */
  setDifficulty(t, sp, sc) {
    time = t;
    speedSnowball = sp;
    scaleSnowball = sc;
  }

  /**
   * Change the level of the game depending on elapsed time.
   */
  changeLevel() {
    this.elapsedTime = (millis() / THOUSAND) - this.overTime;

    if (this.elapsedTime <= 10) {
      this.setDifficulty(3, 6, .1);
    } else if (this.elapsedTime <= 20) {
      this.setDifficulty(2, 8, .15);
    } else if (this.elapsedTime <= 30) {
      this.setDifficulty(1.5, 10, .2);
    } else if (this.elapsedTime <= 40) {
      this.setDifficulty(1.5, 12, .24);
    } else if (this.elapsedTime <= 50) {
      this.setDifficulty(1.3, 13, .27);
    } else if (this.elapsedTime <= 65) {
      this.setDifficulty(1.2, 14, .3);
    } else if (this.elapsedTime > 65) {
      this.win = 1;
    }
  }

  /**
   * Replay the game.
   */
  replay() {
    if (keyIsPressed === true && key === "r" && this.isEnd) {
      if (!penguin.removed) penguin.remove();

      this.isEnd = 0;
      this.lose = 0;
      this.win = 0;

      this.overTime = millis() / THOUSAND; // update game over time.

      this.createPenguin(WIDTH_CANVAS/2, HEIGHT_CANVAS - 170, .5, .11);
      this.removeSnowball(0);
      snowballs.length = 0;
    }
  }
}
