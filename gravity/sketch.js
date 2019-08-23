let astroVector = []; //vector of celestial objects
let counter = 0;      //counter of celestial objects
let timer;            //needed to calculate masses
let tFactor = 1.;     //time to mass conversion
let vFactor = 0.1;    //mouse to velocity conversion
let G = 1.;           //gravitational constant
let startX, startY;   //start position of object
let colors = ['red','orange','yellow','white','blue','violet'];
let color;
let stopped = false;  //run o stop simulation
let gSlider = document.getElementById("gSlider");
let vSlider = document.getElementById("vSlider");
let dSlider = document.getElementById("dSlider");
let settingsBox = document.getElementsByClassName("box")[0];
let startStopButton = document.getElementById("startStopButton");

function reset(){     //clear the vector
  astroVector = [];
  counter = 0;
}

function startStop(){
  if (!stopped){
    stopped = true;
    startStopButton.value=("START");
  } else {
    stopped = false;
    startStopButton.value=("STOP");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  timer = millis();
  startX = mouseX;
  startY = mouseY;
  color = colors[Math.floor(dSlider.value/10.*colors.length)]; //color based on density
}

function mouseReleased(){
  let mass = ( millis() -timer )/tFactor;
  let vx = (mouseX-startX)*vFactor;
  let vy = (mouseY-startY)*vFactor;
  let d = dSlider.value;
  if ((mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) && !(mouseX <= settingsBox.offsetWidth+settingsBox.offsetTop && mouseX >= settingsBox.offsetTop && mouseY <= settingsBox.offsetHeight+settingsBox.offsetLeft && mouseY >= settingsBox.offsetLeft)){
    astroVector.push(new astro(counter,mass,startX,startY,vx,vy,color,d));
    counter++;
  }
}

function draw() {
  background(0);
  G = gSlider.value;
  vFactor = vSlider.value;
  if ( (mouseIsPressed) && (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) && !(mouseX <= settingsBox.offsetWidth+settingsBox.offsetTop && mouseX >= settingsBox.offsetTop && mouseY <= settingsBox.offsetHeight+settingsBox.offsetLeft && mouseY >= settingsBox.offsetLeft) ) {
    fill(color);
    strokeWeight(0);
    circle(startX,startY,Math.sqrt((millis()-timer))/tFactor);
    stroke(colors[Math.floor(vFactor/1.*colors.length)]);
    strokeWeight(2);
    line(startX,startY,mouseX,mouseY);
  }
  for (var i = 0; i < astroVector.length; i++) {
    astroVector[i].show();
    astroVector[i].updateA(astroVector);
    /*if (!stopped){
      astroVector[i].move(); //euler integration
    }*/
    if (!stopped){
      astroVector[i].leapfrog1(); //leapfrog integration
    }

  }
  if (!stopped){
    for (var i = 0; i < astroVector.length; i++) {
      astroVector[i].updateA(astroVector);
    }
    for (var i = 0; i < astroVector.length; i++) {
      astroVector[i].leapfrog2();
    }
  } // <- leapfrog integration
}
