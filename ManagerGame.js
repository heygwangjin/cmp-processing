/**
 * Created by Gwang Jin Kim on 10/14/21.
 * This class is responsible for managing about penguin scene.
 */

/* CONSTANTS */
const RIGHT = 0;
const LEFT = 180;
const THOUSAND = 1000;
const WHITE = '#FFFFFF';
const RED = '#FF0000';
const YELLOW = '#FFFF00';

let penguin;
let snowballs = [];
let time, speedSnowball, scaleSnowball;

// TODO: 펭귄이 캔버스 화면을 벗어나는 것 방지
// TODO: 마지막 단계는 눈이 핵폭탄을 변화
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
   * @param {Number} sc scale of penguin image.
   * @param {Number} f friction of penguin.
   */
  createPenguin(w, h, sc, f) {
    penguin = createSprite(w, h);
    penguin.scale = sc; //penguin.debug = true;
    penguin.setCollider("rectangle", 0, 0, 170, 310);
    penguin.friction = f;
    penguin.addAnimation("penguin", "data/penguin.png");
  }

  /**
   * Move penguin to the right.
   * @param {Number} sp scalar speed to add of penguin.
   * @param {Number} a direction of penguin in degrees.
   */
  movePenguinRight(sp, a) {
    if (keyIsPressed === true && key === "d" && penguin.position.x < 1355) {
      penguin.addSpeed(sp, a);
    }
  }

  /**
   * Move penguin to the left.
   * @param {Number} sp scalar speed to add of penguin.
   * @param {Number} a direction of penguin in degrees.
   */
  movePenguinLeft(sp, a) {
    if (keyIsPressed === true && key === "a" && penguin.position.x > 94) {
      penguin.addSpeed(sp, a);
    }
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
      const snowball = createSprite(random(0, WIDTH_CANVAS), 20);
      snowball.scale = sc;
      // snowball.debug = true;
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
    snowballs.forEach((snowball) => {
      if (snowball.position.y >= range) snowball.remove();
    });
  }

  /**
   * Check game over.
   */
  checkGameOver() {
    // When penguin is hit by snowball.
    snowballs.forEach((snowball) => {
      if (snowball.overlap(penguin)) {
        penguin.remove();
        this.lose = 1;
      }
    });

    if (this.lose) {
      this.isEnd = 1;

      textSize(26);
      text("GAME OVER 😢", WIDTH_CANVAS / 2, 40);
      text(
        "Press 'r' if you want to see the penguin again! 🐧",
        WIDTH_CANVAS / 2,
        100
      );
    }

    if (this.win) {
      this.isEnd = 1;

      textSize(26);
      text("CONGRATULATIONS 🎉", WIDTH_CANVAS / 2, 40);
      text("You win the game 🏆", WIDTH_CANVAS / 2, 100);
      text(
        "Press 'r' if you want to play with penguin again! 🐧",
        WIDTH_CANVAS / 2,
        150
      );
    }
  }

  /**
   * Set variables in the difficulty of the game.
   * @param {Number} t seconds that make snow fall.
   * @param {Number} sp scalar speed to add at which snow fall.
   * @param {Number} sc scale at which snow create.
   * @param {Number} f friction of penguin sprite.
   */
  setDifficulty(t, sp, sc, f) {
    time = t;
    speedSnowball = sp;
    scaleSnowball = sc;
    penguin.friction = f;
  }

  /**
   * Change the level of the game depending on elapsed time.
   */
  changeLevel() {
    this.elapsedTime = millis() / THOUSAND - this.overTime;

    const xPosLevel = 370;
    const yPosLevel = 40;
    const sizeLevel = 36;

    textSize(sizeLevel);
    if (this.elapsedTime <= 10) {
      fill(WHITE);
      text("Level 1", xPosLevel, yPosLevel);
      this.setDifficulty(3, 6, 0.1, penguin.friction);
    } else if (this.elapsedTime <= 20) {
      fill(WHITE);
      text("Level 2", xPosLevel, yPosLevel);
      this.setDifficulty(3, 8, 0.15, 0.09);
    } else if (this.elapsedTime <= 30) {
      fill(YELLOW);
      text("Level 3", xPosLevel, yPosLevel);
      this.setDifficulty(2, 10, 0.2, 0.07);
    } else if (this.elapsedTime <= yPosLevel) {
      fill(YELLOW);
      text("Level 4", xPosLevel, yPosLevel);
      this.setDifficulty(2, 12, 0.24, 0.05);
    } else if (this.elapsedTime <= 50) {
      fill(RED);
      text("Level 5", xPosLevel, yPosLevel);
      this.setDifficulty(1.5, 13, 0.27, 0.04);
    } else if (this.elapsedTime <= 65) {
      fill(RED);
      text("Level 6", xPosLevel, yPosLevel);
      this.setDifficulty(1.5, 13, 0.3, 0.04);
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

      this.createPenguin(WIDTH_CANVAS / 2, HEIGHT_CANVAS - 170, 0.5, 0.11);
      this.removeSnowball(0);
      snowballs.length = 0;
    }
  }
}
