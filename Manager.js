// Gwang-jin Kim
class Manager {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  drawStartCanvas() {
    createCanvas(this.width, this.height);
    playButton = createButton("PlAY!");
    playButton.position(300, 600);
    playButton.size(320, 70);
  }

  // TODO : 캔버스 다시 그리는 함수
  resetCanvas() {
    alert("reset Canvas");
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
