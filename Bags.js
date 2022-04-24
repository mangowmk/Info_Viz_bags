var canvasWidth = 1250;
var canvasHeight = 800;


var total = 130;
var bagPoints = [];
var page = 'home';
var bagInfo;
var brands = ['Celine', 'Chanel', 'Dior', 'Fendi', 'Gucci', 'LV', 'Loewe', 'YSL'];
var bagNames = {};
var bagImgs = {};


//var pages = ['Brand', 'Style', 'Skin', 'Volume', 'Price'];
var pages = ['Brand','Style', 'Price'];
var menuPageNum = pages.length;
var menuPageTextSize = [12,12,12];

var title = 'Stylish Style & Pricy Price';



// BagPoint
var dotMouseRadius = 10;
var bagPointColor = 0;
var bagNameTextColor = 0;
var bagNameSize = 18;
var bagBrandSize = 14;
var bagNameColor = 'black';
var bagNameX;
var bagNameY;
var bagImgLeftBottomX;
var bagImgLeftBottomY;
//var bagInfoImgWidth;
//var bagSourceImgWidth = 1100;
//var bagSourceImgHeight = 1100;



function preload(){
  bagInfo = loadTable("data/luxurybag_final_data.csv", "csv", 'header');
  
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  bagInfoImgX = 0.75 * width;
  bagInfoImgY = 0.05 * height;
  bagInfoImgWidth = 0.25 * width;
  bagNameX = 0.75 * width;
  bagNameY = 0.5 * height;
  bagImgLeftBottomX = 0.75 * width;
  bagImgLeftBottomY = 0.4 * height;
  frameRate(30);

  
  for (i = 0; i < total; i++){
    let brand = bagInfo.getString(i, 0);
    let name = bagInfo.getString(i, 1);
    let style = bagInfo.getString(i, 2);
    let skinType = bagInfo.getString(i, 4);
    let bagColor = bagInfo.getString(i, 5);
    let volume = bagInfo.get(i, 9);
    let price = bagInfo.get(i, 10);
    let x_start = map(i, 0, total, 10, width - 10);
    let y_start = 10;
    bagPoints.push(new BagPoint(i, x_start, y_start, brand, name, style, price, bagColor, skinType, volume));
    if(!(brand in bagNames)){
      bagNames[brand] = [];
    }
    bagNames[brand].push(name);
  }
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
  //console.log(bagImgs);
  
}




function drawMenu(){
  var menuInnerCircleRadius = 0.2 * width;
  var menuInnerCircleOriginX = width;
  var menuInnerCircleOriginY = height;
  var menuRingRadius = 0.25 * width;
  var menuRingOriginX = width;
  var menuRingOriginY = height;
  var menuRingWidth = 3;
  var menuPageCircleRadius = 0.04 * width;


  var menuStartAngle = PI * (1 + 1/18);
  var menuEndAngle = PI *(3/2 - 1/18);
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
  
  var menuMainTextX = width - 0.8 * menuInnerCircleRadius;
  var menuMainTextY = height -  0.5 * menuInnerCircleRadius;

  
  for (i = 0; i < pages.length; i++){
  let curretDegree = map(i, 0, menuPageNum - 1, menuStartAngle, menuEndAngle);
  //console.log(degrees(curretDegree));
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
  //console.log(menuPageXs, menuPageYs);
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


function drawPrice(){
  var AxisColor = 'black';
  var AxisOriginX = parseInt(0.1 * width);
  //console.log(AxisOriginX);
  var AxisOriginY =  parseInt(0.8 * height);
  var priceAxisEndX =  parseInt(0.65 * width);
  var priceAxisEndY = AxisOriginY;
  var volumnAxisEndX = AxisOriginX;
  var volumnAxisEndY =  parseInt(0.2 * height);
  var ticksLength = 3;
  
  var maxPriceTickX =  parseInt(0.63 * width);
  var maxVolumnTickY =  parseInt(0.22 * height);
  
  var volumnTicks = [250, 500, 750, 1000];
  var priceTicks = [2000, 4000, 6000, 8000];
  var priceAxisMax = 9000;
  var volumnAxisMax = 1100;
  
  var ticksTextSize = 16;
  var volumnTicksTextLength = 15;
  var priceTicksTextLength = 50;
  var priceTicksTextYOffset = 20;
  
  var volumnTicksY;
  var priceTicksX;
  
  push();
  strokeWeight(3);
  stroke(AxisColor);
  line(AxisOriginX, AxisOriginY, volumnAxisEndX, volumnAxisEndY);
  line(AxisOriginX, AxisOriginY, priceAxisEndX, priceAxisEndY);
  pop();
  
  for (var i = 0; i < volumnTicks.length; i++){
    push();
    strokeWeight(3);
    stroke(AxisColor);
    volumnTicksY = map(volumnTicks[i], 0, volumnAxisMax, AxisOriginY, maxVolumnTickY);
    line(AxisOriginX, volumnTicksY, AxisOriginX + ticksLength, volumnTicksY);
    pop();
    push();
    noStroke();
    textAlign(RIGHT);
    fill(AxisColor);
    textSize(ticksTextSize);
    text(volumnTicks[i], AxisOriginX - volumnTicksTextLength, volumnTicksY + 5);
    pop();
    
  }
  for (var j = 0; j < priceTicks.length; j++){
    priceTicksX = map(priceTicks[j], 0, priceAxisMax, AxisOriginX, maxPriceTickX);
    push();
    strokeWeight(3);
    stroke(AxisColor);
    line(priceTicksX, AxisOriginY, priceTicksX, AxisOriginY - ticksLength);
    pop();
    push();
    noStroke();
    textAlign(LEFT);
    fill(AxisColor);
    textSize(ticksTextSize);
    text("$" + priceTicks[j], priceTicksX - priceTicksTextLength / 2, AxisOriginY + priceTicksTextYOffset);
    pop();
  }

  
  push();
  textAlign(RIGHT);
  fill(AxisColor);
  textSize(ticksTextSize);
  //console.log(AxisOriginX - volumnTicksTextLength, volumnAxisEndY + 5);
  //text('Vol /inch3', AxisOriginX - volumnTicksTextLength, volumnAxisEndY + 5);
  text('Vol /inch3', 110, 165);
  //textAlign(LEFT);
  //text('Price', priceAxisEndX, AxisOriginY + priceTicksTextYOffset);
  pop();
  
  
  bagPoints.forEach(function(point){
    var newX = map(point.getPrice(), 0, priceAxisMax, AxisOriginX, priceAxisEndX);
    var newY = map(point.getVolumn(), 0, volumnAxisMax, AxisOriginY, volumnAxisEndY);
    point.setX(newX);
    point.setY(newY);
  });

}

//function mouseClicked(){
//  drawPrice();
//  //redraw();
//  //loop();
//}



function draw(){
  background('white');
  //for(var i = 0; i < total; i++){
  //  bagPoints[i].displayDot();
  //}
  
  drawMenu();
  drawPrice();
  //image(bagImgs[name], bagInfoImgX, bagInfoImgY, bagInfoImgWidth, bagInfoImgWidth);  
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
