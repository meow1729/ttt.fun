class PianoKey {
  constructor(frequency) {
    this.oscillator = new p5.Oscillator('sine');
    this.oscillator.freq(frequency);
    this.oscillator.amp(0);
    this.oscillator.start();
    this.envelope = new p5.Envelope();
    this.envelope.setADSR(0.02, 0.1, 0.2, 0.5);
    this.envelope.setRange(0.5, 0);
    this.playing = false;
  }

  play() {
    this.oscillator.amp(this.envelope);
    this.envelope.play();
    this.playing = true;
  }

  stop() {
    this.oscillator.amp(0);
    this.envelope.triggerRelease();
    this.playing = false;
  }

  isAnimating() {
    return this.playing;
  }
}

let pianoKeys = [];
let keyLabels = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'Enter'];
//let keyNames = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'enter'];

// Solfeggio Frequencies
let solfeggioFrequencies = [174, 285, 396, 417, 528, 639, 741, 852, 963, 1080];

// Piano Frequencies
let pianoFrequencies = [
  130.81, // C3
  146.83, // D3
  164.81, // E3
  174.61, // F3
  196.00, // G3
  220.00, // A3
  246.94, // B3
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.00, // G4
  440.00, // A4
  493.88, // B4
  523.25, // C5
  587.33, // D5
  659.26, // E5
  698.46, // F5
  783.99, // G5
  880.00, // A5
  987.77, // B5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
  1396.91, // F6
  1567.98, // G6
  1760.00, // A6
  1975.53, // B6
  2093.00  // C7
];

let keyNames = [
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
  'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
  'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6',
  'C7'
];

let currentNoteIndex = 15;
let arrowKeySound = new PianoKey(pianoFrequencies[currentNoteIndex]);


let x = (windowWidth-100)/2;
let y = (windowHeight-100)/2;
let speed = 10;
let tl = 800;
let angle = 0;
let angleChange = Math.PI / 6;
let trail = [];
let ballColor = [255, 105, 180];
let gameOverMessage = "";
let draggingSlider = false;

let sliderX = 1005;
let sliderY = 50;
let sliderWidth = 20;
let sliderHeight = 180;
let sliderMin = 1;
let sliderMax = 20;

function setup() {
  createCanvas(1100, 1000);
  frameRate(20);
  window.addEventListener("keydown", keyPressed);
  
  for (let i = 0; i < keyLabels.length; i++) {
    pianoKeys.push(new PianoKey(solfeggioFrequencies[i]));
  }
}
function draw() {
  background(0, 0, 0);
  
  moveLine();
  drawLine();
  checkCollision();
  displayGameOverMessage();


  //drawSpeedSlider();
 // displayCurrentNote();
  //drawCredits();
}

function drawChessboard() {
  let squareSize = width / 8;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let xCoord = i * squareSize;
      let yCoord = j * squareSize;

      if ((i + j) % 2 === 0) {
        fill(0, 0, 0);
      } else {
        fill(0,0,0);
      }

      rect(xCoord, yCoord, squareSize, squareSize);
    }
  }
}

function moveLine() {
  x += speed * cos(angle);
  y += speed * sin(angle);

  if (x > width) {
    x = 0;
  } else if (x < 0) {
    x = width;
  }

  if (y > height) {
    y = 0;
  } else if (y < 0) {
    y = height;
  }

  trail.push({ x: x, y: y, color: ballColor });
  if (trail.length > tl ) {
    trail.shift();
  }
}

function drawLine() {
  for (let i = 0; i < trail.length; i++) {
    stroke(trail[i].color);
    strokeWeight(7);
    point(trail[i].x, trail[i].y);
  }
}

function checkCollision() {
  for (let i = 0; i < trail.length - 1; i++) {
    let d = dist(x, y, trail[i].x, trail[i].y);
    if (d < 7) {
      gameOver();
      break;
    }
  }

  if (x < 0 || x > width || y < 0 || y > height) {
    gameOver();
  }
}

function gameOver() {
  gameOverMessage = "you noob";
  setTimeout(resetRound, 2000);
}

function resetRound() {
  gameOverMessage = "";
  x = (windowWidth-100)/2;
  y = (windowHeight-100)/2;
  angle = 0;
  trail = [];
  ballColor = [255, 105, 180];
}

function displayGameOverMessage() {
  fill(255, 0, 0);
  textSize(48);
  textAlign(CENTER);
  text(gameOverMessage, width / 2, height / 2);
  fill(0);
}

function drawSpeedSlider() {
  fill(100, 150);
  rect(sliderX , sliderY, sliderWidth , sliderHeight);
  let sliderPosition = map(speed, sliderMin, sliderMax, sliderY + sliderHeight, sliderY);
  fill(255, 150);
  ellipse(sliderX + sliderWidth / 2 , sliderPosition, 20);

  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("Speed: " + Math.round(speed), sliderX + sliderWidth / 2 + 30, sliderY + sliderHeight + 20);
 
}


function drawCredits() {
  fill(255);
  textSize(11); // Increase the font size
  textAlign(CENTER);
  text("use L/R arrow keys " , sliderX + sliderWidth / 2 + 30 +5, sliderY + sliderHeight + 500); 
  text("AND " , sliderX + sliderWidth / 2 + 30+5, sliderY + sliderHeight + 520); 
  text(" a and d " , sliderX + sliderWidth / 2 + 30+5, sliderY + sliderHeight + 540); 
  
  textSize(8);
  text(" TapTuneTapestry v0.1  " , sliderX + sliderWidth / 2 + 30 +5, sliderY + sliderHeight + 680);
  
    textSize(12);
  text(" >.<  " , sliderX + sliderWidth / 2 + 30 +5, sliderY + sliderHeight + 700);
  
}

function displayCurrentNote() {
  fill(255);
  textSize(24); // Increase the font size
  textAlign(CENTER);
  text("🎵" + keyNames[currentNoteIndex], sliderX + sliderWidth / 2 + 30, sliderY + sliderHeight + 250); // Position it 100 pixels below the slider
}
 function keyPressed() {
  let keyIndex = keyLabels.indexOf(key);
  if (keyCode === RIGHT_ARROW) {
    currentNoteIndex = (currentNoteIndex + 1) % pianoFrequencies.length;
    arrowKeySound.oscillator.freq(pianoFrequencies[currentNoteIndex]);
    arrowKeySound.play();
    angle += angleChange * 2;
    ballColor = [255, 255, 0];
  } else if (keyCode === LEFT_ARROW) {
    currentNoteIndex = (currentNoteIndex - 1 + pianoFrequencies.length) % pianoFrequencies.length;
    arrowKeySound.oscillator.freq(pianoFrequencies[currentNoteIndex]);
    arrowKeySound.play();
    angle -= angleChange *2 ;
    ballColor = [255, 105, 180];
  } else if (key === 'a') {
    currentNoteIndex = (currentNoteIndex - 2 + pianoFrequencies.length) % pianoFrequencies.length;
    arrowKeySound.oscillator.freq(pianoFrequencies[currentNoteIndex]);
    arrowKeySound.play();
    angle -= angleChange * 3 ; // Adjust angle and color as desired
    ballColor = [0, 255, 0];
  } else if (key === 'd') {
    currentNoteIndex = (currentNoteIndex + 2) % pianoFrequencies.length;
    arrowKeySound.oscillator.freq(pianoFrequencies[currentNoteIndex]);
    arrowKeySound.play();
    angle += angleChange * 3 ; // Adjust angle and color as desired
    ballColor = [255, 0, 0];
  } else {
    if (key === "+") {
      increaseSpeed();
    } else if (key === "-") {
      decreaseSpeed();
    }
    keyIndex = keyLabels.indexOf(key);
  }

  if (keyIndex >= 0 && keyIndex < pianoKeys.length) {
    pianoKeys[keyIndex].play();
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    arrowKeySound.stop();
  } else {
    let keyIndex = keyLabels.indexOf(key);
    if (keyIndex >= 0 && keyIndex < pianoKeys.length) {
      pianoKeys[keyIndex].stop();
    }
  }
}

function increaseSpeed() {
  speed = constrain(speed + 1, sliderMin, sliderMax);
}

function decreaseSpeed() {
  speed = constrain(speed - 1, sliderMin, sliderMax);
}

function mousePressed() {
  let sliderPosition = map(speed, sliderMin, sliderMax, sliderY + sliderHeight, sliderY);
  let d = dist(mouseX, mouseY, sliderX + sliderWidth / 2, sliderPosition);
  if (d < 10) {
    draggingSlider = true;
  }
}

function mouseReleased() {
  draggingSlider = false;
}

function mouseDragged() {
  if (draggingSlider) {
    let newY = constrain(mouseY, sliderY, sliderY + sliderHeight);
    speed = map(newY, sliderY + sliderHeight, sliderY, sliderMin, sliderMax);
  }
}
