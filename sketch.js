var PLAY=1;
var END=0
var gameState=1;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime;
survivalTime=0;

function preload(){ 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup()
{
  createCanvas(600,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.14; 
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  FoodGroup = createGroup(); 
  obstacleGroup = createGroup();
}

function draw()
{
  background("white"); 
  text("Score: "+ survivalTime, 400,20);    
  if(gameState===PLAY)
  {
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  ground.velocityX=-7;
  if (ground.x < 300)
  {
    ground.x = ground.width/2;
  } 
  if(keyDown("space")&&monkey.y>=100)
  {
    monkey.velocityY=-13;
  } 
  if(obstacleGroup.isTouching(monkey))
  {
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);   
    }
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  food();
  obstacles();
  drawSprites();
}

function food()
{
  if(frameCount%80===0)
  {
    banana = createSprite(400);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-7;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function obstacles()
{ 
  if(frameCount%300===0)
  {
    obstacle = createSprite(400,322);             
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}










