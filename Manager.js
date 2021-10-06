// Gwang-jin Kim
class Manager {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  displayInitScreen() {
    createCanvas(this.width, this.height);
    this.setValuesBtn("PLAY!", 600, 600, 320, 70);
    playBtn = this.displayButton(
      contentBtn,
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

  displayFancyText(fancyText) {
    fancyText.need = 1;
  }

  hideFancyText(fancyText) {
    fancyText.need = 0;
  }

  /* Button */
  setValuesBtn(content, x, y, w, h) {
    contentBtn = content;
    xPosBtn = x;
    yPosBtn = y;
    widthBtn = w;
    heightBtn = h;
  }

  displayButton(text, positionX, positionY, width, height) {
    const button = createButton(text);
    button.position(positionX, positionY);
    button.size(width, height);

    return button;
  }

  hideButton(button) {
    button.elt.style.display = "none";
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
