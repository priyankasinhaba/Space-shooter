var backg_play;
var playbutton, aboutbutton;
var rocket,rocketImg;
var ufo1Img
var ufo2Img;
var ufo3Img;
var ufo4Img;
var bg,bgImg,bgSound,explosionSound,explosionImg,explosion;
var obstacle;
var laser,laserImg;
var obstacleGroup;
var laserSound;
var score;
var missedLaserSound;
var rays=100;
var gameState="wait";
var checkPointSound;



function preload() {

  //loading images
  bgImg=loadImage("shooterbck.gif");
  backg_play = loadImage("spaceImg.jpg");
  ufo1Img=loadImage("UFO1.png");
  ufo4Img=loadImage("UFO4.png");
  ufo3Img=loadImage("UFO3.png");
  ufo2Img=loadImage("UFO2.png");
  laserImg=loadImage("laser.png");
  rocketImg=loadImage("Rocket.png");
  explosionImg=loadImage("explosion.png");
  
  //loading sounds
  checkPointSound=loadSound("checkPointSound.mp3");
  missedLaserSound=loadSound("missedLaser.mp3");
  laserSound=loadSound("laserSound.mp3");
  explosionSound=loadSound("explosionSound.mp3");
  bgSound=loadSound("backgroundSound.mp3");
}
function setup() {  
  createCanvas(900,600);
    //createCanvas(windowWidth, windowHeight);
    
    playbutton = createImg("playgrey.png");
    playbutton.position(780, 500);
    playbutton.size(100, 100);
    playbutton.hide();

    aboutbutton = createImg("info.png");
    aboutbutton.position(10, 30);
    aboutbutton.size(50, 50);
    aboutbutton.hide();
  
  score=0;
  obstacleGroup=new Group();
  laserGroup=new Group();
}

function draw() {
  if (gameState == "wait") {
    background(bgImg);
    playbutton.show()
    aboutbutton.show()
}

// arrow function =>
// ()=>{write the entire task here}
playbutton.mousePressed(() => {
    playbutton.hide();
    aboutbutton.hide();
    gameState = "hold";
})

aboutbutton.mousePressed(() => {
    playbutton.hide();
    aboutbutton.hide();
    gameState = "about";

})

if (gameState == "about") {
  aboutgame();
}

 if(gameState == 'hold'){
  
    bg=createSprite(500,500,500,500)
    bg.addImage(backg_play);
    bg.scale=1.7;
  // background(backg_play); - cannot be used directly as we need to move background
    rocket=createSprite(500,500);
    rocket.addImage(rocketImg);
    rocket.scale=0.1;
    //rocket.debug = 'true'
    gameState = "play";
 }

 if(gameState == 'play'){
    rocket.visible = true;
    bg.velocityY=10

  if(bg.y>700){
    bg.y=height/2;
 }


  
  textSize(18);
  fill("yellow")
  //console.log("gameState", gameState)

  if(keyDown("RIGHT_ARROW")){
    if(rocket.x<770)
    {
     rocket.x = rocket.x+ 10;
    }
    
  }
  if(keyDown("LEFT_ARROW")){
    if(rocket.x>25)
    {
     rocket.x = rocket.x- 10;
    }
    
 }
  
  if(keyWentDown("space")){
    spawnLaser();
    laser.x=rocket.x;
    laserSound.play();
  }
  
  spawnObstacles();

  if(obstacleGroup.isTouching(rocket)){
    obstacleGroup.destroyEach();
    gameState = 'lose';
  }
  if(obstacleGroup.isTouching(laserGroup)){
    laserGroup.destroyEach();
    obstacleGroup.destroyEach();
    score +=10
  }
 
 }

  drawSprites();
  text("Score: "+ score, 100,100); 
  if(gameState == 'lose'){
    bg.velocityY = 0
    textSize(50);
    strokeWeight(4)
    fill("white")
    text("GAME OVER",200,200)
  
   }

}

function aboutgame() {

  swal({
      title: "About Game === How to Play!!",
      text: "Control the spaceship in space & survive the flying saucers and asteroids !!",
      textAlign: "center",
      imageUrl: "spaceImg.jpg",
      imageSize: "200x200",
      confirmButtonText: "Lets destroy the asteroids!!",
      confirmButtonColor: "brown",
  },
      function () {
          gameState = "wait"
      }

  )


}

function spawnObstacles(){
  if(frameCount%60===0){    
  obstacle=createSprite(random(50,400),100,10,40);
  obstacle.velocityY = 2;
  //obstacle.debug = true
  var rand=Math.round(random(1,4))
  switch(rand){
    case 1:obstacle.addImage(ufo1Img);
    break;
    case 2:obstacle.addImage(ufo2Img);
    break;
    case 3:obstacle.addImage(ufo3Img);
    break;
    case 4:obstacle.addImage(ufo4Img);
    break;
    default:break;
  }
 
obstacle.scale=0.08
obstacle.lifetime=165;
obstacleGroup.add(obstacle);  
}

}

function spawnLaser(){
  laser= createSprite(500,500);
  laser.addImage(laserImg);
  laser.x = 360;
  laser.velocityY = -10;
  laser.scale = 0.05;
  laserGroup.add(laser);
  
}