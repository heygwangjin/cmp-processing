var allParticles = [];
var maxSplitCount = 3;
var distThreshold = 75;

function weather_setup(){
    for (let l = 0; l < LAYER_COUNT; l++) {
    SNOWFLAKES.push([]);
    for (let i = 0; i < SNOWFLAKES_PER_LAYER; i++) {
      SNOWFLAKES[l].push({
        x: random(width),
        y: random(height),
        mass: random(0.75, 1.25),
        l: l + 1
      });
    }
  }
}
function snowdraw() {
 background(SKY_COLOR);
  const skyHeight = round(height * SKY_SPACE);

  for (let i = 1; i < LAYER_COUNT; i++) {
    drawRidge(
      i,
      (i * skyHeight) / LAYER_COUNT,
      SKY_AMP,
      SKY_ZOOM,
      SKY_COLOR,
      SUN_COLOR,
      SKY_LAYER_OFFSET
    );
  }

  drawSun(width / 2, skyHeight - RIDGE_AMP / 2);

  // Iterate through the layers of snowflakes
  for (let l = 0; l < SNOWFLAKES.length; l++) {
    const SNOWLAYER = SNOWFLAKES[l];

    // Draw a ridge for each layer of snow
    const layerPosition = l * ((height - skyHeight) / LAYER_COUNT);
    drawRidge(
      l,
      skyHeight + layerPosition,
      RIDGE_AMP,
      RIDGE_ZOOM,
      RIDGE_TOP_COLOR,
      RIDGE_BOT_COLOR,
      0
    );

    // Draw each snowflake
    for (let i = 0; i < SNOWLAYER.length; i++) {
      const snowflake = SNOWLAYER[i];
      circle(snowflake.x, snowflake.y, (snowflake.l * MAX_SIZE) / LAYER_COUNT);
      updateSnowflake(snowflake);
    }
  }
}

// Draw a simple sun
function drawSun(x, y) {
  fill(SUN_COLOR);

  drawingContext.shadowBlur = SUN_GLOW;
  drawingContext.shadowColor = SUN_COLOR;
  circle(x, y, SUN_RADIUS * 2);
  drawingContext.shadowBlur = 0;
}

// Compute and draw a ridge
function drawRidge(l, y, amp, zoom, c1, c2, coff) {
  // Choose a color for the ridge based on its height
  const FILL = lerpColor(color(c1), color(c2), l / (LAYER_COUNT - 1 + coff));
  fill(FILL);

  beginShape();
  // Iterate through the width of the canvas
  for (let x = 0; x <= width; x += RIDGE_STEP) {
    const noisedY = noise(x * zoom, y);
    vertex(x, y - noisedY * amp);
  }
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  fill(SNOW_COLOR);
}

// Helper function to prepare a given snowflake for the next frame
function updateSnowflake(snowflake) {
  const diameter = (snowflake.l * MAX_SIZE) / LAYER_COUNT;
  if (snowflake.y > height + diameter) snowflake.y = -diameter;
  else snowflake.y += snow* snowflake.l * snowflake.mass;
  //if(mousePressed){
  //  snow++;
  //}

  // Get the wind speed at the given layer and area of the page
  const wind =
    noise(snowflake.l, snowflake.y * WIND_CHANGE, frameCount * WIND_CHANGE) -
    0.5;
  if (snowflake.x > width + diameter) snowflake.x = -diameter;
  else if (snowflake.x < -diameter) snowflake.x = width + diameter;
  else snowflake.x += wind * WIND_SPEED * snowflake.l;
}
function frozen_draw() {
 
  blendMode(BLEND);
  background(0);
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
      
      drawingContext.shadowColor = color(110 + particle1.life * 1.5, 255, 255, 255 - particle1.life * 5);
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
  text("Click and drag the mouse!", width / 2, height / 2);
}
function mouseDragged() {
  if (frameCount % 2 == 0) {
    allParticles.push(new Particle(mouseX, mouseY, maxSplitCount));
  }
}
