/**
 * Created by Gwang Jin Kim on 10/14/21.
 * This class is responsible for managing about penguin scene.
 */
let penguin;
let snowballs = [];

class ManagerGame {
  constructor() {
    this.isEnd = 0;
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
    penguin = createSprite(w, h); penguin.scale = s;
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

  /**
   * Make snowball fall every t seconds after create it.
   * @param {Number} t seconds that make snow fall.
   * @param {Number} sp scalar speed to add at which snow fall.
   * @param {Number} sc at which snow create.
   */
  createSnowball(t, sp, sc) {
    if (millis() % t === 0) {
      const snowball = createSprite(random(0, WIDTH_CANVAS), 20); snowball.scale = sc;
      snowball.setCollider("circle", 0, 0, 300);
      snowball.addAnimation("snowball", "data/snowball.png");
      snowball.addSpeed(sp, 90);

      snowballs.push(snowball);
    }
  }

  /**
   * Remove snowball if it passes penguin.
   */
  removeSnowball() {
    snowballs.forEach(snowball => {
      if (snowball.newPosition.y >= penguin.position.y) {
          snowball.remove();
          snowballs.shift();
      }
    })
  }

  /**
   * Check game over.
   */
  checkGameOver() {
    snowballs.forEach(snowball => {if (snowball.overlap(penguin)) penguin.remove();});

    if (penguin.removed) {
        this.isEnd = 1;
        
        if (this.isEnd) {
          textSize(26);
          text("GAME OVER!", WIDTH_CANVAS/2, 40);
          text("Press 'R' if you want to see the penguin again!", WIDTH_CANVAS/2, 100);
        }
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
}
