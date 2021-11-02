/* A function that draws an image as a line */

function addLine(){
  /* Save image colour */
  targetX = round(random(width-1));
  targetY = round(random(height-1));
  
  colour = img.get(targetX, targetY);
  colour = color(red(colour), green(colour), blue(colour), 50);
  
  /* After creating a vector, multiply the vector by a scalar
  while generating a new 2D unit vector at an arbitrary angle */
  target = createVector(targetX, targetY);
  dir = p5.Vector.random2D();
  dir.mult(8);
  
  /* Draw lines through vector addition and subtraction */
  start = p5.Vector.add(target, dir);  
  end = p5.Vector.sub(target, dir);
   
  stroke(colour);
  line(start.x, start.y, end.x, end.y);
}
