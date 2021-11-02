/* A class that receives the weather API and makes rain when it rains */
/* Brief description 
x and y : location of the rain
w : thickness of the rain
alpha : transparency of the rain
len : length of the rain */

let gravity = 0.01;
let lmin = 5;
let lmax = 50;
let yvmin = 6;
let yvmax = 40;
let wmin = 1.5;
let wmax = 5;
let opacityMin = 150;
let opacityMax = 255;
let drops = [];
let dropNum = 1000;

class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-2 * height, -height);
    this.fxCurveValue = pow(2, random(-10, 0));
    this.len = map(this.fxCurveValue, pow(2, -10), pow(2, 0), lmin, lmax);
    this.w = map(this.len, lmin, lmax, wmin, wmax);
    this.yv = map(this.len, lmin, lmax, yvmin, yvmax);
    this.alpha = map(this.len, lmin, lmax, opacityMin, opacityMax);
  }

  show() {
    stroke(151, 185, 208, this.alpha);
    strokeWeight(this.w);
    line(this.x, this.y, this.x, this.y + this.len);
  }

  move() {
    this.yv += gravity;
    this.y += this.yv;
  }

  relocate() {
    if (this.y > height) {
      this.y = random(-height, -height / 2);
      this.fxCurveValue = pow(2, random(-6, 0));
      this.len = map(this.fxCurveValue, pow(2, -10), pow(2, 0), lmin, lmax);
      this.x = random(width);
      this.w = map(this.len, lmin, lmax, wmin, wmax);
      this.yv = map(this.len, lmin, lmax, yvmin, yvmax);
      this.alpha = map(this.len, lmin, lmax, opacityMin, opacityMax);
    }
  }
}
