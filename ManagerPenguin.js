/**
 * Created by Gwang-jin Kim on 10/14/21.
 * This class is responsible for managing about penguin scene.
 */
class ManagerPenguin {
  drawPenguinScene() {
    image(antarctica, 0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
    fill(0);
    textAlign(CENTER);
    textSize(26);
    text("Welcome to Penguin World!", width / 2, 40);
  }

  createPenguins(numPenguin) {
    for (let i = 0; i < numPenguin; i++) {
      penguins[i] = createSprite((i + 1) * 300, window.innerHeight / 2);
      penguins[i].addAnimation("penguin", "data/penguin.png");
    }
  }

  controlPenguin() {
    if (keyIsPressed === true) {
      if (key === "z") {
        penguins[0].rotation -= 10;
        penguins[0].velocity.x = random(-10, 10);
        penguins[0].velocity.y = random(-10, 10);
      } else if (key === "x") {
        penguins[1].rotation -= 100;
        penguins[1].velocity.x = random(-10, 10);
        penguins[1].velocity.y = random(-10, 10);
      } else if (key === "c") {
        penguins[2].rotation -= 10;
        penguins[2].velocity.x = random(-10, 10);
        penguins[2].velocity.y = random(-10, 10);
      } else if (key === "v") {
        penguins[3].rotation -= 10;
        penguins[3].velocity.x = random(-10, 10);
        penguins[3].velocity.y = random(-10, 10);
      }
    }
  }
}