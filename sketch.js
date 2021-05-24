var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feed;
var foodObj;
var feed,lastfed,feedDog;

//create feed and lastFed variable here

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfed=data.val();
  });

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog= createButton("feed the dog!");
  feedDog.position(700,95);
  feedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime= database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  
    
 
  //write code to display text lastFed time here
  if (lastfed>=12){
  //show time in PM format when lastfed is greater than 12
  }else if(lastfed==0){
    text("Last Feed:12AM",350,30);
  }else{
    //show time in AM format when lastFed is less than 12
    text("Last Feed:"+ lastfed+"AM",350,30);
  }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   Food: foodObj.getFoodStock(),
   FeedTime :hour()
 })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
