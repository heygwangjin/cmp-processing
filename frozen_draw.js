
function frozen_draw() {
 r_color=map(mouseX,0,255,0,5);
 g_color=map(mouseY,0,255,0,10);
 b_color=map(mouseX,0,255,15,0);
  background(r_color,g_color,b_color);
  blendMode(SCREEN);
  
  for (let i = allParticles.length - 1; i > -1; i--) {
    allParticles[i].move();
    if (allParticles[i].vel.mag() < 0.01) {
      allParticles.splice(i, 1);
    }
  }
  
  if (allParticles.length > 0) {
    let data = Delaunay.triangulate(
      allParticles.map(function(pt) {
        return [pt.pos.x, pt.pos.y];
    }));
    
    strokeWeight(0.1);
    
    for (let i = 0; i < data.length; i+=3) {
      let particle1 = allParticles[data[i]];
      let particle2 = allParticles[data[i + 1]];
      let particle3 = allParticles[data[i + 2]];
      
      if (particle1.pos.dist(particle2.pos) > distThreshold ||
          particle2.pos.dist(particle3.pos) > distThreshold ||
          particle1.pos.dist(particle3.pos) > distThreshold) {
        continue;
      }
      
      let mass = max(-2 + particle1.life * 0.75, 0);
      
      drawingContext.shadowColor = color(110 + particle1.life * 1.5, mouseX, mouseY, 255 - particle1.life * 5);
      drawingContext.shadowBlur = mass;
      
      noFill();
      stroke(0);
      strokeWeight(mass);
      
      triangle(
        particle1.pos.x, particle1.pos.y, 
        particle2.pos.x, particle2.pos.y, 
        particle3.pos.x, particle3.pos.y);
    }
  }
  
  drawingContext.shadowBlur = 0;
  noStroke();
  fill(255);
}
function mouseDragged() {
  if (frameCount % 2== 0) {
    allParticles.push(new Particle(mouseX, mouseY, maxSplitCount));
  }
}
