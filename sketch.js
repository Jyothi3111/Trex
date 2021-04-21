var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var coinGroup, coinImage;
var obstaclesGroup, obstacle2, obstacle1, obstacle3;
var score = 0;
var life = 3;

var  restart;

localStorage["HighestScore"] = 0;

function preload() {
  mario_running = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  mario_collided = loadAnimation("mariodead.png");
  groundImage = loadImage("backg.jpg");
  coinSound = loadSound("coin.wav");

  coinImage = loadImage("coin.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle3 = loadImage("obstacle3.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 
}

function draw() {
  

}

function spawnCoin() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(600, 120, 40, 10);
    coin.y = Math.round(random(80, 120));
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;

    //assign lifetime to the variable
    coin.lifetime = 200;

    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;

    //add each cloud to the group
    coinGroup.add(coin);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle2);
        break;
      case 2:
        obstacle.addImage(obstacle1);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
    }

    obstacle.velocityX = -(6 + 3 * score / 100);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {

  gameState = PLAY;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();

  mario.changeAnimation("running", mario_running);
  mario.scale = 0.5;

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }

  score = 0;
 
}
