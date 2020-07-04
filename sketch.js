var ground,ground1,thief,bullet,people,police,currency,Go,GoImage,laser,thiefS,copS,bb;
var policeGroup,peopleGroup,bulletGroup,laserGroup;
var gamestate="play"
function preload(){
ground1= loadImage("bg.jpg"); 
GoImage= loadImage("go.png"); 
thiefS=loadSound("thief.mp3");
copS=loadSound("cops/cevilians.mp3");
bb=loadSound("shoot.mp3");
}
function setup() {
  createCanvas(800,800);
 // ground = createSprite(400,400,800,20);
  //ground.addImage ("bg",ground1)
 // ground.scale=2.7;
//ground.velocityY=+3;
bulletGroup=new Group();
policeGroup=new Group();
peopleGroup=new Group();
laserGroup= new Group();
currency=0
Go=createSprite(400,400);
Go.addImage("GO",GoImage);
Go.scale=0.68
thief=createSprite(400,700,50,100)
}

function draw() {
  background(215,255,255);  
  if(gamestate==="play"){
    Go.visible=false;
  if (keyDown ("left") ) {
thief.x-=50
  }
  if (keyDown ("right") ) {
    thief.x+=50
      }
      if (keyDown ("space") ) {
        shoot();
        bb.play();
          }
   Cops();
   civil()
   if(bulletGroup.isTouching(peopleGroup)){
bullet.remove()
people.remove()
copS.play();
currency+=Math.round(random(5,10))
   }
   if(bulletGroup.isTouching(policeGroup)){
    bullet.remove()
    police.remove()
    copS.play()
   }   
   if(laserGroup.isTouching(thief)){
    bullet.remove()
    thief.remove()
    gamestate="end"
    thiefS.play();
   }   
   thief.visible=true;
   if(policeGroup.isTouching(thief)){
     police.remove()
     thief.visible=false;
     gamestate="end"
     thiefS.play();
   }
   }

   else if(gamestate==="end"){
    background(0);
    Go.visible= true;
    policeGroup.destroyEach()
    peopleGroup.destroyEach()
    bulletGroup.destroyEach()
   }
  //if(ground.y>800){
   // ground.y = ground.height/2;
    //ground.velocityY=+3;
  //}

  drawSprites();
  textSize(24);
  if(gamestate==="play"){
  fill("green")
text("Cash:"+currency,649,40);}
if(gamestate==="end"){
  textSize(36);
  
  textFont("chiller")
  fill("white")
text("Cash:"+currency,380,700);

  }}
function shoot(){
  if(frameCount % 8  === 0) {
   bullet= createSprite(thief.x,650,8,10);
  bullet.velocityY=-10
bullet.lifetime=81;
bulletGroup.add(bullet);
  }
}

function Cops(){
  if(frameCount % 175 ===0) {
       police= createSprite(10,-10,50,100)
      police.x= Math.round(random (10,790)) 
      police.velocityY=5
      police.shapeColor="blue"
      police.lifetime=165;
      policeGroup.add(police);
    
      if((thief.x-8)<police.x || (thief.x+8)>police.x|| thief.x===police.x){
        
        laser =createSprite(police.x,police.y,8,10)
        laser.velocityY=+10;
        laser.lifetime=81;
        laserGroup.add(laser);
      }
  }
}
function civil(){
  if(frameCount % 111 ===0) {
       people= createSprite(10,-10,50,100)
      people.x= Math.round(random (10,790)) 
      people.velocityY=5
      people.shapeColor="red"
      people.lifetime=93;
      peopleGroup.add(people);
  }
}