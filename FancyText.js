// Gwang-jin Kim
// We will use this class for creating our visual title and questions.
class FancyText {
  constructor(text, x, y, size, font) {
    this.text = text;
    this.x = x; // variable for x position of text
    this.y = y; // variable for y position of text
    this.size = size;
    this.font = font;
    this.vehicles = [];
    this.need = 0; // Determine whether fancytext is necessary or not.
  }

  /* Create vehicles with points. */
  createFancyText() {
    let points = this.font.textToPoints(this.text, this.x, this.y, this.size);
    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let vehicle = new Vehicle(pt.x, pt.y);
      this.vehicles.push(vehicle);
    }
  }

  /* Draw text visually */
  drawFancyText() {
    for (let i = 0; i < this.vehicles.length; i++) {
      let v = this.vehicles[i];
      v.behaviors();
      v.update();
      v.show();
    }
  }
}
