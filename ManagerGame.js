/**
 * Created by Gwang Jin Kim on 10/14/21.
 * This class is responsible for managing about penguin scene.
 */
let penguin;

class ManagerGame {
  drawPenguinScene() {
    image(antarctica, 0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
    fill(0);
    textAlign(CENTER);
    textSize(26);
    text("Welcome to Penguin Game!", width / 2, 40);
    textSize(22);
    fill(50);
    text("Controller", 60, 30);
    textSize(18);
    text("a - move penguin to left", 100, 60);
    text("d - move penguin to right", 105, 80);
  }

  createPenguin() {
    penguin = createSprite(WIDTH_CANVAS / 2, HEIGHT_CANVAS - 170); penguin.scale = .5; penguin.debug = true;
    penguin.friction = 0.11;
    penguin.addAnimation("penguin", "data/penguin.png");
  }

  movePenguinRight(){
    if (keyIsPressed === true && key === "d" && penguin.position.x < 1355) {
      penguin.addSpeed(1.1, 0);
    };
  }

  movePenguinLeft(){
    if (keyIsPressed === true && key === "a" && penguin.position.x > 94) {
      penguin.addSpeed(1.1, 180);
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
}
