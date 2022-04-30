var canvasWidth = 1250;
var canvasHeight = 700;

var total;
var bagPoints = [];
var page = 'home';
var bagInfo;
var brands = ['Celine', 'Chanel', 'Dior', 'Fendi', 'Gucci', 'LV', 'Loewe', 'YSL'];
var bagNames = {};
var bagImgs = {};

var pages = ['Brand','Style', 'Price'];
var menuPageNum = pages.length;
var menuPageTextSize = [20,20,20];

var title = 'Stylish Style \n            & \n     Pricey Price';

// BagPoint
var dotMouseRadius = 10;
var bagPointColor = 'black';
var bagNameTextColor = 'black';
var bagNameSize = 16;
var bagBrandSize = 20;
var bagPriceSize = 24;
var bagVolumeSize = 12;
var bagNameColor = 'black';
var bagNameX;
var bagNameY;
var bagImgLeftBottomX;
var bagImgLeftBottomY;
var bagPriceX;
var bagPriceY;
var bagVolumeX;
var bagVolumeY;

function preload(){
  bagInfo = loadTable("data/luxurybag_final_data.csv", "csv", 'header');
  font = loadFont("font/Skia.ttf");
  fontB = loadFont("font/Recoleta-SemiBold.ttf");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  ctx = canvas.getContext('2d');
  bagImgLeftBottomX = 0.72 * width;
  bagImgLeftBottomY = 0.36 * height;
  bagNameX = 0.72 * width;
  bagNameY = 0.43 * height;
  bagPriceX = 0.72 * width;
  bagPriceY = 0.48 * height;
  bagVolumeX = 0.785 * width;
  bagVolumeY = 0.48 * height;
  
  total = bagInfo.getRowCount();
  for (i = 0; i < total; i++){
    let brand = bagInfo.getString(i, 'brand');
    let name = bagInfo.getString(i, 'bag name');
    let picName = bagInfo.getString(i, 'pic name');
    let style = bagInfo.getString(i, 'bag style');
    let skinType = bagInfo.getString(i, 'skin type');
    let bagColor = bagInfo.getString(i, 'color');
    let volume = bagInfo.get(i, 'volume');
    let price = bagInfo.get(i, 'price ($)');
    let x_start = map(i, 0, total, 10, width - 10);
    let y_start = 10;
   
    bagPoints.push(new BagPoint(i, x_start, y_start, brand, picName, name, style, price, bagColor, skinType, volume));
    if(!(brand in bagNames)){
      bagNames[brand] = [];
    }
    bagNames[brand].push(picName);
  }

  // Load image
  var imgPath;
  for(var brand in bagNames){
    for(i = 0; i < bagNames[brand].length; i++){
          name_str = bagNames[brand][i].replace(/ /g, '_');
       if (brand === 'Louis Vitton'){
        imgPath = 'img/'.concat('LV', '/', name_str, '.png');
      }
        else if(brand === 'Saint Laurent'){
        imgPath = 'img/'.concat('YSL', '/', name_str, '.png');
      }
        else{
        imgPath = 'img/'.concat(brand, '/', name_str, '.png');
      }
        bagImgs[bagNames[brand][i]] = loadImage(imgPath);
      }
  }  
}

function drawMenu(){
  var menuInnerCircleRadius = 0.19 * width;
  var menuInnerCircleOriginX = width;
  var menuInnerCircleOriginY = height;
  var menuRingRadius = 0.25 * width;
  var menuRingOriginX = width;
  var menuRingOriginY = height;
  var menuRingWidth = 3;
  var menuPageCircleRadius = 0.04 * width;

  var menuStartAngle = PI * (1 + 1/12);
  var menuEndAngle = PI *(3/2 - 1/12);
  var menuPageNum = pages.length;
  var menuPageDegrees = [];
  var menuPageXs = [];
  var menuPageYs = [];
  
  var menuRingColor = 'lightgray';
  var menuMainTextColor = 'white';
  var menuPageTextColor = 'black';
  var menuInnerCircleColor = 'black';
  var menuPageCircleColor = 'white';
  
  var menuMainTextX = width - 0.75 * menuInnerCircleRadius;
  var menuMainTextY = height -  0.45 * menuInnerCircleRadius;

  for (i = 0; i < pages.length; i++){
  let curretDegree = map(i, 0, menuPageNum - 1, menuStartAngle, menuEndAngle);
  menuPageDegrees.push(curretDegree);
  menuPageXs.push(cos(curretDegree) * menuRingRadius + menuRingOriginX);
  menuPageYs.push(sin(curretDegree) * menuRingRadius + menuRingOriginY);
  }

  push();
  //Draw outer ring
  fill(menuRingColor);
  noStroke();
  circle(menuRingOriginX, menuRingOriginY, 2 * menuRingRadius);
  
  //Draw inner circle
  fill(menuInnerCircleColor);
  noStroke();
  circle(menuInnerCircleOriginX, menuInnerCircleOriginY, 2 * menuInnerCircleRadius);
  
  //Draw title text
  fill(menuMainTextColor);
  noStroke();
  textSize(26);
  textFont(fontB);
  text(title, menuMainTextX, menuMainTextY);
  
  //Draw page circles
  noStroke();
  push();
  ctx.shadowColor = color (180,180,180);
  ctx.shadowBlur = 20;
  
  for(j = 0; j < menuPageNum;j++){
    fill(menuPageCircleColor);
    circle(menuPageXs[j], menuPageYs[j], 2 * menuPageCircleRadius);
  }
  pop();
  noStroke();
  for(k = 0; k < menuPageNum;k++){
    fill(menuPageTextColor);
    textSize(menuPageTextSize[k]);
    textFont(font);
    textAlign(CENTER);
    text(pages[k], menuPageXs[k], menuPageYs[k] + 5);
  }
  pop();
}

function drawPrice(){
  var AxisColor = 'black';
  var AxisOriginX = parseInt(0.07 * width);
  var AxisOriginY =  parseInt(0.8 * height);
  var priceAxisEndX =  parseInt(0.65 * width);
  var priceAxisEndY = AxisOriginY;
  var volumeAxisEndX = AxisOriginX;
  var volumeAxisEndY =  parseInt(0.3 * height);
  var ticksLength = 3;
  
  var maxPriceTickX =  parseInt(0.63 * width);
  var maxVolumeTickY =  parseInt(0.3 * height);
  
  var volumeTicks = [250, 500, 750, 1000];
  var priceTicks = [2000, 4000, 6000, 8000];
  var priceAxisMax = 9000;
  var volumeAxisMax = 1100;
  
  var ticksTextSize = 16;
  var volumeTicksTextLength = 15;
  var priceTicksTextLength = 50;
  var priceTicksTextYOffset = 20;
  
  var volumeTicksY;
  var priceTicksX;
  var lineWeight = 1.5;
  
  //Draw XY axis
  push();
  strokeWeight(lineWeight);
  stroke(AxisColor);
  line(AxisOriginX, AxisOriginY, volumeAxisEndX, volumeAxisEndY);
  line(AxisOriginX, AxisOriginY, priceAxisEndX, priceAxisEndY);
  pop();
  
  // Draw Y info
  for (var i = 0; i < volumeTicks.length; i++){
    push();
    strokeWeight(lineWeight);
    stroke(AxisColor);
    volumeTicksY = map(volumeTicks[i], 0, volumeAxisMax, AxisOriginY, maxVolumeTickY);
    line(AxisOriginX, volumeTicksY, AxisOriginX + ticksLength, volumeTicksY);
    pop();
    
    push();
    noStroke();
    textAlign(RIGHT);
    textFont(font);
    fill(AxisColor);
    textSize(ticksTextSize);
    text(volumeTicks[i], AxisOriginX - volumeTicksTextLength, volumeTicksY + 5);
    pop();
  }
  
  // Draw X info
  for (var j = 0; j < priceTicks.length; j++){
    priceTicksX = map(priceTicks[j], 0, priceAxisMax, AxisOriginX, maxPriceTickX);
    push();
    strokeWeight(lineWeight);
    stroke(AxisColor);
    line(priceTicksX, AxisOriginY, priceTicksX, AxisOriginY - ticksLength);
    pop();
    
    push();
    noStroke();
    textAlign(LEFT);
    textFont(font);
    fill(AxisColor);
    textSize(ticksTextSize);
    text("$" + priceTicks[j], priceTicksX - priceTicksTextLength / 2, AxisOriginY + priceTicksTextYOffset);
    pop();
  }
  
  // Draw label
  push();
  textAlign(RIGHT);
  textFont(font);
  fill(AxisColor);
  textSize(ticksTextSize);
  text('Vol / inch' + String.fromCodePoint(0x00B3), 100, 200);
  pop();
  
  // Draw bag points
  bagPoints.forEach(function(point){
    var newX = map(point.getPrice(), 0, priceAxisMax, AxisOriginX, priceAxisEndX);
    var newY = map(point.getVolume(), 0, volumeAxisMax, AxisOriginY, volumeAxisEndY);
    point.setX(newX);
    point.setY(newY);
  });
}

function draw(){
  background('white');
  drawMenu();
  drawPrice();
  let nearestMouseDistance = 1000;
  let nearestIndex; 
  bagPoints.forEach(function(point){
    point.updatePosition();
    point.setNearest(false);
    if (point.getDistance() < nearestMouseDistance){
      nearestMouseDistance = point.getDistance();
      nearestIndex = point.getIndex();
    }
  });
  
  bagPoints.forEach(function(point){
    //point.updatePosition();
    if (point.getIndex() == nearestIndex){
      point.setNearest(true);
    }
    point.display();
  });
  //noLoop();
}
