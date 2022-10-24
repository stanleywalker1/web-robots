let bodyPallete = [];
let headPallete = [];
let robots = []
let a = 128;
let downArrow, upArrow, leftArrow, rightArrow;
let arrows = [];
let arrowsArr = [];
let arrow;
let tracker = 0;
let arrowAmount = 20;
let interval = 2;

function preload() {
  // load in all of our graphics
  downArrow = loadImage("media/arrow_down.png");
  upArrow = loadImage("media/arrow_up.png");
  leftArrow = loadImage("media/arrow_left.png");
  rightArrow = loadImage("media/arrow_right.png");

}


function setup() {
  createCanvas(800,600);
  bodyPallete = [color('#7400b8'), color('#e67e22'), color('#5e60ce'), color('#5390d9'), color('#4ea8de'), color('48bfe3,'), color('#56cfe1'), color('#64dfdf'), color('#72efdd'), color('#80ffdb')];
  headPallete = [color('#006d77'), color('#83c5be'), color('#f0f3bd'), color('#ffddd2'), color('#e29578')];


  // for(let i = arrowAmount-1; i >= 0; i--){
  //   arrows.push(new Arrow(imageX, imageY, startArrow));
  // }



  arrows = [["up", upArrow], ["right", rightArrow], ["down", downArrow], ["left", leftArrow]];
  

  imageX = width/2;
  imageY = height/2;

  for (let x=30;x<width;x+=100){
    for (let y=80;y<height-20;y+=100){
      startArrow = random(arrows);
      arrowsArr.push(new Arrow(x, y, startArrow));
    }
  }

  //arrow = new Arrow(imageX, imageY, startArrow);

}

function draw() {
  background(20);

  if(frameCount % (interval * 30) == 0){
    robots.push(new Robot(-50, height/2, random(40, 50),random(30, 35), random(headPallete), random(bodyPallete), "right", 2));

  }

   for(let i = robots.length - 1; i >= 0; i--){
    robots[i].move();
    robots[i].checkCollision();
    noStroke();
    robots[i].display();
  
  
    if(robots[i].x > width+100 || robots[i].x < -80 || robots[i].y > height || robots[i].y < -50){
      robots.splice(i, 1);
      i = i - 1;
    } 
    // if(robots[i].x < -80){
    //   robots.splice(i, 1);
    //   i = i - 1;
    // } 
    // if(robots[i].y > height){
    //   robots.splice(i, 1);
    //   i = i - 1;
    // } 
    // if(robots[i].y < -50){
    //   robots.splice(i, 1);
    //   i = i - 1;
    // } 

  }

  for(let i = arrowsArr.length - 1; i >= 0; i--){
    arrowsArr[i].display();
    arrowsArr[i].checkClick();

  }

 // checkCollision(1, 23);



 
}

function visor(){
  return rect(this.x, this.y-this.bodySize/2-(this.headSize/3)*2, this.headSize/2, 10);
}

function twoEyes(){
  rect(this.x-this.headSize/4, this.y-this.bodySize/2-(this.headSize/3)*2, 6, 10);
  rect(this.x+this.headSize/4, this.y-this.bodySize/2-(this.headSize/3)*2, 6, 10);
}
function arms(){
  rotate(PI/3.0);
  rect(this.x+this.bodySize/2, this.y, 2, 12);
}

const eyeArray = [
  visor,
  twoEyes
]


class Robot {
  constructor(x, y, bodySize, headSize, headColor, bodyColor, dir, speed){
    this.x = x;
    this.y = y;
    this.bodySize = bodySize;
    this.headSize = headSize;
    this.headColor = headColor;
    this.bodyColor = bodyColor;
    this.eyes = random(eyeArray);
    this.dir = dir;
    this.Xspeed = speed;
    this.Yspeed = speed;
   // this.arms = arms();
  }

  display() {
    rectMode(CENTER);
    fill(this.bodyColor);
    rect(this.x, this.y, this.bodySize, this.bodySize);
    fill(this.headColor);
    rect(this.x, this.y-this.bodySize/2-this.headSize/2, this.headSize, this.headSize);
    fill(255);
    this.eyes();
  }

  move(){
      a = (128 + 128 * sin(millis() / 700));

      if(this.dir == "right"){
        this.x += this.Xspeed;
        fill(255, 255, 0, a);
        ellipse(this.x-this.bodySize/2, this.y, 30);
      } 
      
      if (this.dir == "left"){
        this.x -= this.Xspeed;
        fill(255, 255, 0, a);
        ellipse(this.x+this.bodySize/2, this.y, 30);
      } 

      if (this.dir == "up") {
        this.y -= this.Yspeed;
        fill(255, 255, 0, a);
        ellipse(this.x, this.y+this.bodySize/2, 30);

      } 
      if(this.dir == "down"){
        this.y += this.Yspeed;
        fill(255, 255, 0, a);
        ellipse(this.x, this.y-this.bodySize-10, 30);
      }

    }
    checkCollision(){

       for(let i = arrowsArr.length-1; i >=0;i--){

        let d = dist(this.x, this.y, arrowsArr[i].x+25, arrowsArr[i].y+25);
        let m = map(d, 20, 200, 3, 0.1);


         if (d < 200){
         
          stroke(255);
          strokeWeight(m);
        //  console.log(m);
          line(this.x, this.y, arrowsArr[i].x+25, arrowsArr[i].y+25);
        }


        if (d < 20){  // if the robot is approaching the arrow, swap direction
        //  console.log(d);
         

          if(arrowsArr[i].dir == "right"){
            this.dir = "right";
          } 
          if (arrowsArr[i].dir == "left"){
            this.dir = "left";
          } 
          if (arrowsArr[i].dir == "up") {
            this.dir = "up";
          } 
          if(arrowsArr[i].dir == "down"){
            this.dir = "down";
          }
        }
      }




      //   let d = dist(this.x, this.y, arrowsArr[20].x, arrowsArr[20].y);
      //   // console.log(arrowsArr[0].d20r);
      //   if(frameCount % (interval * 30) == 0){

      //    console.log(d);

      //   }
      //   // console.log(arrowsArr[20].x);
 
 
      //    if (d < 10){  // 20f the robot 20s approach20ng the arrow, swap d20rect20on
      //      console.log(d);
      //      if(arrowsArr[20].dir == "right"){
      //        this.dir = "right";
      //      } 
      //      if (arrowsArr[20].dir == "left"){
      //        this.dir = "left";
      //      } 
      //      if (arrowsArr[20].dir == "up") {
      //        this.dir = "up";
      //      } 
      //      if(arrowsArr[20].dir == "down"){
      //        this.dir = "down";
      //      }
         
      // }
    }
}


class Arrow {
  constructor(x, y, startArrow){
    this.x = x;
    this.y = y;
    this.dir = startArrow[0];
    this.graphic = startArrow[1];
  }

  display(){
    image(this.graphic, this.x, this.y);
   // console.log("clicked");
   
  }

  checkClick(testX, testY) {
   // console.log("checking...");

    // now test to see if the user is over the button - if so, they are clicking on it!
    // console.log("x: " + this.x);
    // console.log("y: " + this.y);

    // if (testX > buttonX && testX < buttonX+100 && testY > buttonY && testY < buttonY + 100) {
    //   fill(0,255,0);
    // }
    // else {
    //   fill(255);
    // }
  
    // rect(buttonX, buttonY, 100, 100);
    if (testX > this.x && testX < this.x+100 && testY > this.y && testY < this.y + 100) {
      console.log("y: " + this.y);
      console.log("x: " + this.x);
      // if (mousePressed()) {

      //   if(this.dir=="up"){
      //     this.graphic = rightArrow;
      //     this.dir = "right";
      //     console.log("press right");
    
      //   }
      //   else if(this.dir=="right"){
      //     this.graphic = downArrow;
      //     this.dir = "down";
      //     console.log("press down");
    
      //   }
      //   else if(this.dir=="down"){
      //     this.graphic = leftArrow;
      //     this.dir = "left";
      //     console.log("press left");
    
      //   }
      //   else if(this.dir=="left"){
      //     this.graphic = upArrow;
      //     this.dir = "up";
      //     console.log("press up");
    
      //   }
      // }
      
      return true;
    }
  
    // not over the button - return false
    else {
      return false;
    }
   
  }

  checkPressed(){
       if(this.dir=="up"){
          this.graphic = rightArrow;
          this.dir = "right";
          console.log("press right");
        }
        else if(this.dir=="right"){
          this.graphic = downArrow;
          this.dir = "down";
          console.log("press down");
        }
        else if(this.dir=="down"){
          this.graphic = leftArrow;
          this.dir = "left";
          console.log("press left");
    
        }
        else if(this.dir=="left"){
          this.graphic = upArrow;
          this.dir = "up";
          console.log("press up");
    
        }
      }


  }




function mousePressed() {
  // see if the user is clicking on the button
  for(let i = arrowsArr.length-1; i >=0;i--){
  let clicked = arrowsArr[i].checkClick(mouseX, mouseY);
 // console.log(clicked);
  

  if (clicked == true) {
    

    if(arrowsArr[i].dir=="up"){
      arrowsArr[i].graphic = rightArrow;
      arrowsArr[i].dir = "right";
      console.log("press right");

    }
    else if(arrowsArr[i].dir=="right"){
      arrowsArr[i].graphic = downArrow;
      arrowsArr[i].dir = "down";
      console.log("press down");

    }
    else if(arrowsArr[i].dir=="down"){
      arrowsArr[i].graphic = leftArrow;
      arrowsArr[i].dir = "left";
      console.log("press left");

    }
    else if(arrowsArr[i].dir=="left"){
      arrowsArr[i].graphic = upArrow;
      arrowsArr[i].dir = "up";
      console.log("press up");

    }
  }
}
}
