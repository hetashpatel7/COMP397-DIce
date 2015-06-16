/// <reference path="typings/jquery/jquery.d.ts" />
// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />



// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;
var assets: createjs.LoadQueue;
var helloLabel: createjs.Text;
var random_no1: number;
var random_no2: number;
var dice2Label2: createjs.Text;

var manifest = [
    { id: "pinkButton", src: "assets/images/button.png" },
    { id: "one", src: "assets/images/one.png" },
    { id: "two", src: "assets/images/two.png" },
    { id: "three", src: "assets/images/three.png" },
    { id: "four", src: "assets/images/four.png" },
    { id: "five", src: "assets/images/five.png" },
    { id: "six", src: "assets/images/six.png" },

    { id: "clicked", src: "assets/audio/clicked.wav" }
];


// Game Variables
var pinkButton: createjs.Bitmap;
var one: createjs.Bitmap;
var two: createjs.Bitmap;
var three: createjs.Bitmap;
var four: createjs.Bitmap;
var five: createjs.Bitmap;
var six: createjs.Bitmap;
var dice1: createjs.Bitmap;
var dice2: createjs.Bitmap;

// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events
function pinkButtonClicked(event: createjs.MouseEvent) {//generate random numbers
     random_no1 = Math.floor((Math.random() * 6) + 1);
     random_no2 = Math.floor((Math.random() * 6) + 1);
    updateDice(random_no1,random_no2);

    createjs.Sound.play("clicked");
}

// Callback functions that change the alpha transparency of the button

// Mouseover event
function pinkButtonOver() {
    pinkButton.alpha = 0.8;
}
function updateDice(no1:number,no2:number)//update dice images+++++++++++
{
    //if (no1 == 1)
      //  stage.removeChild(dice1);
    stage.removeChild(dice1);
    stage.removeChild(dice2);
    if (no1 == 1)
        dice1 = new createjs.Bitmap(assets.getResult("one"));
    if (no1 == 2)
        dice1 = new createjs.Bitmap(assets.getResult("two"));
    if (no1 == 3)
        dice1 = new createjs.Bitmap(assets.getResult("three"));
    if (no1 == 4)
        dice1 =new createjs.Bitmap(assets.getResult("four"));
    if (no1 == 5)
        dice1 = new createjs.Bitmap(assets.getResult("five"));
    if (no1 == 6)
        dice1 =new createjs.Bitmap(assets.getResult("six"));

    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);

    if (no2 == 1)
        dice2 = new createjs.Bitmap(assets.getResult("one"));
    if (no2 == 2)
        dice2 = new createjs.Bitmap(assets.getResult("two"));
    if (no2 == 3)
        dice2 = new createjs.Bitmap(assets.getResult("three"));
    if (no2 == 4)
        dice2 = new createjs.Bitmap(assets.getResult("four"));
    if (no2 == 5)
        dice2 = new createjs.Bitmap(assets.getResult("five"));
    if (no2 == 6)
        dice2 = new createjs.Bitmap(assets.getResult("six"));

    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);

    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);
    stage.removeChild(helloLabel);
    stage.removeChild(dice2Label2);
    helloLabel = new createjs.Text("" + random_no1, "25px Consolas", "#000000");
    helloLabel.x = 60;
    helloLabel.y = 200;
    stage.addChild(helloLabel);
    dice2Label2 = new createjs.Text("" + random_no2, "25px Consolas", "#000000");
    dice2Label2.x = 170;
    dice2Label2.y = 200;
    stage.addChild(dice2Label2)
  




}

// Mouseout event
function pinkButtonOut() {
    pinkButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");
  
    dice1 = new createjs.Bitmap(assets.getResult("one"));
    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);
    dice2 = new createjs.Bitmap(assets.getResult("three"));
    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);

    pinkButton = new createjs.Bitmap(assets.getResult("pinkButton"));
    pinkButton.regX = pinkButton.getBounds().width * 0.5;
    pinkButton.regY = pinkButton.getBounds().height * 0.5;
    pinkButton.x = 150;
    pinkButton.y = 300;
    stage.addChild(pinkButton);
    pinkButton.on("click", pinkButtonClicked);
    pinkButton.on("mouseover", pinkButtonOver);
    pinkButton.on("mouseout", pinkButtonOut);
}