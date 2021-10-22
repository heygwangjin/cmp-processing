function addLine(){
  targetX = round(random(width-1));
  targetY = round(random(height-1));
  
  colour = img.get(targetX, targetY);
  colour = color(red(colour), green(colour), blue(colour), 50);
  
  target = createVector(targetX, targetY);
  dir = p5.Vector.random2D();
  dir.mult((20+ dist(mouseX, mouseY, width/2, height/2)) / 10);
  
  start = p5.Vector.add(target, dir);  
  end = p5.Vector.sub(target, dir);
   
  stroke(colour);
  line(start.x, start.y, end.x, end.y);
}
