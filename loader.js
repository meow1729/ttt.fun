let circleX, circleY, circleSize;

function setup() {
 
  createCanvas(windowWidth-100, windowHeight-100).parent('p5-container');
  frameRate(20);
  
  textAlign(CENTER, CENTER); // Align text to the center
  rectMode(CENTER); // Align rectangle to the center
}

function draw() {
  background(0,0,0);

  // Draw the rectangle as a placeholder for the logo
  fill(0);
  let logoX = width / 2;
  let logoY = height / 3;
  let logoWidth = 400;
  let logoHeight = 200;
  rect(logoX, logoY, logoWidth, logoHeight);

  // Draw TTT inside the rectangle with gradient for metallic effect
  let letterSize = 60;
  for (let i = 0; i < 3; i++) {
    let x = logoX - logoWidth / 4 + (i * logoWidth / 4);
    drawMetallicT(x, logoY, letterSize);
  }
  
  // Draw the game name
  fill(250, 250, 250);
 

  // Draw the instructions
  textSize(10);
  text("TapTuneTapestry v0.2.1", width / 2, height / 2 + 40);
  textSize(16);
  text("CONTROLS : S,D,F,J,K,L. Key function should be self-evident.", width / 2, height / 2 + 70);
  text("Alternate CONTROLS: Z,X,C,1,2,3 (ideal for 104-key keyboards)", width / 2, height / 2 + 100);
 text("Press any key to start the fun", width / 2, height / 2 + 130);
}

function drawMetallicT(x, y, s) {
  let horizontalWidth = s / 4; // Width of the horizontal part of the T
  let verticalWidth = s / 6;   // Width of the vertical part of the T

  // Draw the top horizontal part of the T
  for (let i = 0; i < horizontalWidth; i++) {
    let inter = map(i, 0, horizontalWidth, 0, 1);
    let c = lerpColor(color(200, 200, 200), color(50, 50, 50), inter);
    stroke(c);
    line(x - s / 2, y - s / 2 + i, x + s / 2, y - s / 2 + i);
  }

  // Draw the vertical part of the T
  for (let i = 0; i < verticalWidth; i++) {
    let inter = map(i, 0, verticalWidth, 0, 1);
    let c = lerpColor(color(200, 200, 200), color(50, 50, 50), inter);
    stroke(c);
    line(x - verticalWidth / 2 + i, y - s / 4, x - verticalWidth / 2 + i, y + s / 2);
  }
}

function keyPressed() {
  loadSketch();
}

function loadSketch() {
  remove(); // Remove the existing canvas

  let existingCanvas = document.querySelector('canvas');
  if (existingCanvas) existingCanvas.remove();

  let head = document.getElementsByTagName('head')[0];

  // Load p5.js library
  let p5Script = document.createElement('script');
  p5Script.type = 'text/javascript';
  p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
  head.appendChild(p5Script);

  p5Script.onload = function() {
    // Load p5.sound library
    let soundScript = document.createElement('script');
    soundScript.type = 'text/javascript';
    soundScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js';
    head.appendChild(soundScript);

    soundScript.onload = function() {
      // Load sketch.js
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'sketch.js';
      head.appendChild(script);
    };
  };
}
