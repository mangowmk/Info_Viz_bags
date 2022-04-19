var canvasWidth = 1250;
var canvasHeight = 800;


var total = 130;
var bagPoints = [];
var page = 'home';

var pages = ['Brand', 'Style', 'Skin', 'Volume', 'Price'];
var menuPageNum = pages.length;
var menuPageTextSize = [12,12,12,12,12];

var title = 'Stylish Style & Pricy Price';





function preload(){
  bagInfo = loadTable("data/luxurybag_raw_data.csv", "csv", 'header');
  
}

function drawMenu(){
  var menuInnerCircleRadius = 0.2 * width;
  var menuInnerCircleOriginX = 0.5 * width;
  var menuInnerCircleOriginY = height;
  var menuRingRadius = 0.25 * width;
  var menuRingOriginX = 0.5 * width;
  var menuRingOriginY = height;
  var menuRingWidth = 3;
  var menuPageCircleRadius = 0.04 * width;


  var menuStartAngle = PI * 7 / 6;
  var menuEndAngle = PI * 11 / 6;
  var menuPageNum = pages.length;
  var menuPageDegrees = [];
  var menuPageXs = [];
  var menuPageYs = [];
  
  var menuRingColor = 'black';
  var menuBackgroundColor = 'white';
  var menuMainTextColor = 'black';
  var menuPageTextColor = 'black';
  var menuInnerCircleColor = 'gray';
  var menuPageCircleColor = 'gray';
  
  var menuMainTextX = 0.5 * width - 0.4 * menuInnerCircleRadius;
  var menuMainTextY = height -  0.8 * menuInnerCircleRadius;

  
  for (i = 0; i < pages.length; i++){
  let curretDegree = map(i, 0, menuPageNum - 1, menuStartAngle, menuEndAngle);
  console.log(degrees(curretDegree));
  menuPageDegrees.push(curretDegree);
  menuPageXs.push(cos(curretDegree) * menuRingRadius + menuRingOriginX);
  menuPageYs.push(sin(curretDegree) * menuRingRadius + menuRingOriginY);
  }


  
  //Draw outer ring
  push();
  fill(menuBackgroundColor);
  strokeWeight(menuRingWidth);
  circle(menuRingOriginX, menuRingOriginY, 2 * (menuRingRadius - 1/2 * menuRingWidth));
  
  //Draw inner circle
  fill(menuInnerCircleColor);
  noStroke();
  circle(menuInnerCircleOriginX, menuInnerCircleOriginY, 2 * menuInnerCircleRadius);
  
 //Draw title text
  fill(menuMainTextColor);
  noStroke();
  textSize(15);
  text(title, menuMainTextX, menuMainTextY);
  
  //Draw page circles
  console.log(menuPageXs, menuPageYs);
  //circle(menuPageXs[0], menuPageYs[0], 2 * menuPageCircleRadius);
  noStroke();
  for(j = 0; j < menuPageNum;j++){
    fill(menuPageCircleColor);
    circle(menuPageXs[j], menuPageYs[j], 2 * menuPageCircleRadius);
  }
  
  noStroke();
  for(k = 0; k < menuPageNum;k++){
    fill(menuPageTextColor);
    textSize(menuPageTextSize[k]);
    text(pages[k], menuPageXs[k], menuPageYs[k]);
  }
  
  pop();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  // BagPoint
  var dotMouseRadius = 10;
  var bagInfoImgX = 0.3 * width;
  var bagInfoImgY = 0.7 * height;
  var bagInfoImgWidth = 0.2 * width;
  var bagInfoImgHeight = height - bagInfoImgY;
  
  var bagPointColor = 0;
  
  var bagNameX = 0.5 * width;
  var bagNameY = 0.2 * height;
  
  var bagNameTextColor = 0;
  var bagNameSize = 12;
    
  
  for (i = 0; i < total; i++){
    let brand = bagInfo.getString(i, 0);
    let name = bagInfo.getString(i, 1);
    let style = bagInfo.getString(i, 2);
    let skinType = bagInfo.getString(i, 4);
    let bagColor = bagInfo.getString(i, 5);
    let volume = bagInfo.get(i, 9);
    let price = bagInfo.get(i, 10);
    let x_start = map(i, 10, total, 0, width - 10);
    let y_start = 10;
    bagPoints.push(new BagPoint(i, x_start, y_start, brand, name, style, price, bagColor, skinType, volume));
  }
}


function draw() {
  drawMenu();
  noLoop();

}
