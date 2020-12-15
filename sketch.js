
var monkey , monkey_running,ground,ground_moving
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var background,backgroundImg
var score=0
var gameState="play"

function preload(){
  backgroundImg=loadImage("jungle.jpg")
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  ground_moving=loadImage("ground.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,600);
     background=createSprite(0,250,400,400)
  background.addImage(backgroundImg)
monkey=createSprite(50,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
 
  ground=createSprite(400,450,900,10);
 
  ground.velocityX=-4;
  ground.x=ground.width/2;
 console.log(ground.x)

  obstaclesGroup=new Group();
  foodGroup=new Group();
  
var survivalTime=0;
 
}


function draw() {
 
 ground.visible=false;
  if(gameState==="play"){
     background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
   
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(foodGroup.isTouching(monkey)){
    score = score+2;
     foodGroup.destroyEach()
  }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  monkey.velocityY=monkey.velocityY+0.5
  
  if(keyDown("space")&&monkey.y>350){
    monkey.velocityY=-12
  }
  
  monkey.collide(ground);
  
  spawnObstacles()
  spawnFood()
   
    if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.1;
     
    }
   if(monkey.scale===0.1 && obstaclesGroup.isTouching(monkey)) {
     gameState="end"
     obstaclesGroup.destroyEach();
    foodGroup.destroyEach()
   }
  }
  else if(gameState==="end"){
     background.velocityX=0
    
    monkey.visible=false;
    stroke("black")
    fill("black")
    textSize(20);
    text("GAME OVER",150,300)
  
    
  }
  drawSprites()
   stroke("blue");
  textSize(20);
  fill("blue");
  text("Score:"+score,400,50)
 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50)
  
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(400,420,40,40)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15
    obstacle.velocityX=-4;
    obstacle.lifetime=134;
    obstacle.debug=true
   obstacle.setCollider("circle",0,0,50)
    obstaclesGroup.add(obstacle);
  }
}

function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(400,200,40,40)
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.y=Math.round(random(120,200))
    banana.velocityX=-4;
    banana.lifetime=134
    
    foodGroup.add(banana);
   
  }
}


