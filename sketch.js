//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg;
//var count = 20;
var feed, addFood;

var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,30,30);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed Tom");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
  
}


function draw() {  
  background(46,139,87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12) {
    text("Last Feed: " + lastFed%12 + "PM", 350, 30);
  }
  else if (lastFed === 0) {
    text("Last Feed: 12 AM", 350, 30);
  }
  else {
    text("Last Feed: " + lastFed + "AM" , 350, 30);
  }

  drawSprites();

  foodObj.display();

}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



