var canvasWidth = 1420;
var canvasHeight = 700;

var total;
var bagPoints = [];
var page = 'home';
var bagInfo;
var brands = ['Celine', 'Chanel', 'Dior', 'Fendi', 'Gucci', 'Louis Vitton', 'Loewe', 'Saint Laurent'];
var styles = ['crossbody', 'shoulder', 'handbag'];
var style_map = {'crossbody': ['Crossbody Bag', 'Crossbody Bag, Shoulder Bag', 'Crossbody Bag, Handbag', 'Crossbody Bag, Shoulder Bag, Handbag'],
                 'shoulder': ['Shoulder Bag', 'Crossbody Bag, Shoulder Bag', 'Crossbody Bag, Shoulder Bag, Handbag', 'Shoulder Bag, Handbag'],
                 'handbag': ['Handbag', 'Crossbody Bag, Shoulder Bag, Handbag', 'Shoulder Bag, Handbag', 'Crossbody Bag, Handbag']
                };
var bagNames = {};
var bagImgs = {};

var pages = ['Style','Brand','All'];
var pageSelected = {};
var menuPageNum = pages.length;
var menuPageTextSize = [20,20,20];
var title = 'What are\n   YOU\n      looking for?';
var fontSizeS = 12;
var fontSizeM = 16;
var fontSizeL = 20;
var fontSizeXL = 28;
var fontSizeXXL = 56;

//Menu elements
var menuInnerCircleRadius;
var menuInnerCircleOriginX;
var menuInnerCircleOriginY;
var menuRingRadius;
var menuRingOriginX;
var menuRingOriginY;
var menuRingWidth;
var menuPageCircleRadius;
var menuMainTextX;
var menuMainTextY;

var menuStartAngle;
var menuEndAngle;

var menuPageNum = pages.length;
var menuPageDegrees = [];
var menuPageXs = {};
var menuPageYs = {};
var mouseHoverMenu;

// subPage
var brand_icons = {};
var brandInfo = {};
var styleInfo = {};
var subPageOrbitRadius;
var subPageCircleRadius;

// BagPoint elements
var bagPointColor = 'black';
var unselectedBagPointColor = '#e5e5e5';
var selectedBagPointColor = '#ffda40';
var unselectedBagPointStroke = 1.5;
var selectedBagPointStroke = 2;
var bagNameTextColor = 'black';
var bagNameColor = 'black';
var bagNameX;
var bagNameY;
var bagImgLeftBottomX;
var bagImgLeftBottomY;
var bagPriceX;
var bagPriceY;
var bagVolumeX;
var bagVolumeY;
var bagSizeX;
var bagSizeY;
var bagPointRadius = 12;

function preload(){
  bagInfo = loadTable("data/luxurybag_final_data.csv", "csv", 'header');
  font = loadFont("font/Skia.ttf");
  fontB = loadFont("font/NuevaStd-Bold.ttf"); 
}

function setup(){
  createCanvas(canvasWidth, canvasHeight);
  ctx = canvas.getContext('2d');

  total = bagInfo.getRowCount();
  for (i = 0; i < total; i++){
    let brand = bagInfo.getString(i, 'brand');
    let name = bagInfo.getString(i, 'bag name');
    let picName = bagInfo.getString(i, 'pic name');
    let style = bagInfo.getString(i, 'bag style');
    let skinType = bagInfo.getString(i, 'skin type');
    let bagColor = bagInfo.getString(i, 'color');
    let volume = bagInfo.get(i, 'volume');
    let bagWidth = bagInfo.get(i, 'width (in)');
    let bagHeight = bagInfo.get(i, 'height (in)');
    let bagDepth = bagInfo.get(i, 'depth (in)');
    let price = bagInfo.get(i, 'price ($)');
    let x_start = map(i, 0, total, 10, width - 10);
    let y_start = -10;
   
    bagPoints.push(new BagPoint(i, x_start, y_start, brand, picName, name, style, price, bagColor, skinType, volume, bagWidth, bagHeight, bagDepth, true));
    if(!(brand in bagNames)){
      bagNames[brand] = [];
    }
    bagNames[brand].push(picName);
  }
  
  // Set all selection flags to false under default condition
  for(let i=0; i<pages.length; i++){
    pageSelected[pages[i]] = false;
  }
  
  for(let i=0; i<pages.length; i++){
    pageSelected[pages[i]] = false;
  }

  // Load image
  let imgPath;
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
   
  // product elements dimension
  bagImgLeftBottomX = 0.745 * width;
  bagImgLeftBottomY = 0.36 * height;
  bagNameX = bagImgLeftBottomX;
  bagNameY = 0.43 * height;
  bagPriceX = bagImgLeftBottomX;
  bagPriceY = 0.48 * height;
  bagVolumeX = bagImgLeftBottomX + 0.055 * width;
  bagVolumeY = 0.48 * height;
  bagSizeX = 0.72 * width;
  bagSizeY = 0.51 * height;
  
  // menu elements dimension
  menuInnerCircleRadius = 0.17 * width;
  menuInnerCircleOriginX = width;
  menuInnerCircleOriginY = height;
  menuRingRadius = 0.22 * width;
  menuRingOriginX = width;
  menuRingOriginY = height;
  menuRingWidth = 5;
  menuPageCircleRadius = 0.037 * width;
  menuStartAngle = PI * (1 + 1/12);
  menuEndAngle = PI *(3/2 - 1/12);
  subPageOrbitRadius = 0.06 * width;
  subPageCircleRadius = 0.014 * width;

  menuMainTextX = width - 0.8 * menuInnerCircleRadius;
  menuMainTextY = height -  0.45 * menuInnerCircleRadius;
 
  // brand & style subpages
  brands.forEach(function(brd){
    let imgPathW = 'icon/logo_' + brd.replace(/ /g, '_') + 'W.png';
    let imgPathB = 'icon/logo_' + brd.replace(/ /g, '_') + 'B.png';
    
    brandInfo[brd] = {};
    brandInfo[brd].imgW = loadImage(imgPathW);
    brandInfo[brd].imgB = loadImage(imgPathB);
    brandInfo[brd].selected = false;
  });
  
  styles.forEach(function(stl){
    let imgPathW = 'icon/logo_' + stl + 'W.png';
    let imgPathB = 'icon/logo_' + stl + 'B.png';
    styleInfo[stl] = {};
    styleInfo[stl].imgW = loadImage(imgPathW);
    styleInfo[stl].imgB = loadImage(imgPathB);
    styleInfo[stl].selected = false;
    
  });

  for (let k = 0; k < pages.length; k++){
    let curretDegree = map(k, 0, menuPageNum - 1, menuStartAngle, menuEndAngle);
    menuPageDegrees.push(curretDegree);
    menuPageXs[pages[k]] = cos(curretDegree) * menuRingRadius + menuRingOriginX;
    menuPageYs[pages[k]] = sin(curretDegree) * menuRingRadius + menuRingOriginY;
    }
  
  for(let i = 0; i < brands.length; i++){
          initialSpeed = map(i, 0, brands.length - 1, 0.5, 0.7);
          brandInfo[brands[i]].X = new SoftNum(menuPageXs.Brand, initialSpeed, 0.2);
          brandInfo[brands[i]].Y = new SoftNum(menuPageYs.Brand, initialSpeed, 0.2);
        }
        
  for(let j = 0; j < styles.length; j++){
          initialSpeed = map(j, 0, styles.length - 1, 0.5, 0.7);
          styleInfo[styles[j]].X = new SoftNum(menuPageXs.Style, initialSpeed, 0.2);
          styleInfo[styles[j]].Y = new SoftNum(menuPageYs.Style, initialSpeed, 0.2);
        }
  }
   
function drawTitle(){
  var titleTextColor = 'black';
  var bigTitle = 'Stylish Style  &  Pricey Price';
  var subTitle = 'Exploring variations across brands in high-end bag market';
  var corner = '©2022, Project by Mengke Wu & Youjia Li';
  var titleX = 35;
  var titleY = 60;
  var subTitleX = titleX;
  var subTitleY = 95;
  var cornerX = titleX;
  var cornerY = 685;  
  
  fill(titleTextColor);
  noStroke();
  textSize(fontSizeXXL);
  textFont(fontB);
  text(bigTitle, titleX, titleY);
  
  textSize(fontSizeL);
  textFont(font);
  text(subTitle, subTitleX, subTitleY);
  
  textSize(fontSizeS);
  textFont(font);
  text(corner, cornerX, cornerY);
}

function drawMenu(){
  var menuRingColor = '#ededed';
  var menuMainTextColor = 'white';
  var menuPageTextColor = 'black';
  var menuInnerCircleColor = 'black';
  var menuPageCircleColor = 'white';
  var menuPageSelectedCircleColor = '#ffda40';

  push();
  // Draw outer ring
  fill(menuRingColor);
  noStroke();
  circle(menuRingOriginX, menuRingOriginY, 2 * menuRingRadius);
  
  // Draw inner circle
  push();
  ctx.shadowColor = color (150,150,150);
  ctx.shadowBlur = 100;
  fill(menuInnerCircleColor);
  noStroke();
  circle(menuInnerCircleOriginX, menuInnerCircleOriginY, 2 * menuInnerCircleRadius);
  pop();
  
  // Draw title text
  fill(menuMainTextColor);
  noStroke();
  textSize(fontSizeXL);
  textFont(fontB);
  text(title, menuMainTextX, menuMainTextY);
  
  // Draw page circles
  noStroke();
  push();
  ctx.shadowColor = color (200,200,200);
  ctx.shadowBlur = 30;
  mouseHoverMenu = false;
  
  for(let j = 0; j < menuPageNum;j++){
    if (pageSelected[pages[j]]){
      fill(menuPageSelectedCircleColor);
    }
    else{
      fill(menuPageCircleColor);
    }
    circle(menuPageXs[pages[j]], menuPageYs[pages[j]], 2 * menuPageCircleRadius);
    if (dist(mouseX, mouseY, menuPageXs[pages[j]], menuPageYs[pages[j]]) <= menuPageCircleRadius){
    mouseHoverMenu = true;
    }
  }
  pop();
  noStroke();
  
  for(k = 0; k < menuPageNum;k++){
    fill(menuPageTextColor);
    textSize(menuPageTextSize[k]);
    if (pageSelected[pages[k]]){
      textFont(fontB);
    }
    else{
      textFont(font);
    }
    textAlign(CENTER);
    text(pages[k], menuPageXs[pages[k]], menuPageYs[pages[k]] + 5);
  }
  pop();
  console.log(mouseHoverMenu);
  if(mouseHoverMenu){
    cursor(HAND);
  }
}

function drawPrice(){
  var AxisColor = 'black';
  var AxisOriginX = parseInt(0.07 * width);
  var AxisOriginY =  parseInt(0.85 * height);
  var priceAxisEndX =  parseInt(0.65 * width);
  var priceAxisEndY = AxisOriginY;
  var volumeAxisEndX = AxisOriginX;
  var volumeAxisEndY =  parseInt(0.25 * height);
  var ticksLength = 3;
  
  var maxPriceTickX =  parseInt(0.63 * width);
  var maxVolumeTickY =  parseInt(0.25 * height);
  
  var volumeTicks = [250, 500, 750, 1000];
  var priceTicks = [2000, 4000, 6000, 8000];
  var priceAxisMax = 9000;
  var volumeAxisMax = 1100;
  
  var volumeTicksTextLength = 15;
  var priceTicksTextLength = 50;
  var priceTicksTextYOffset = 20;
  
  var volumeTicksY;
  var priceTicksX;
  var lineWeight = 1.5;
  
  // Draw XY axis
  push();
  strokeWeight(lineWeight);
  stroke(AxisColor);
  line(AxisOriginX, AxisOriginY, volumeAxisEndX, volumeAxisEndY);
  line(AxisOriginX, AxisOriginY, priceAxisEndX, priceAxisEndY);
  pop();
  
  // Draw Y info
  for (i = 0; i < volumeTicks.length; i++){
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
    textSize(fontSizeM);
    text(volumeTicks[i], AxisOriginX - volumeTicksTextLength, volumeTicksY + 5);
    pop();
  }
  
  // Draw X info
  for (j = 0; j < priceTicks.length; j++){
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
    textSize(fontSizeM);
    text('$' + priceTicks[j], priceTicksX - priceTicksTextLength / 2, AxisOriginY + priceTicksTextYOffset);
    pop();
  }
  
  // Draw label
  push();
  textAlign(RIGHT);
  textFont(font);
  fill(AxisColor);
  textSize(fontSizeM);
  text('Vol / in' + String.fromCodePoint(0x00B3), 100, 160);
  pop();
  
  // Draw bag points
  bagPoints.forEach(function(point){
    var newX = map(point.getPrice(), 0, priceAxisMax, AxisOriginX, priceAxisEndX);
    var newY = map(point.getVolume(), 0, volumeAxisMax, AxisOriginY, volumeAxisEndY);
    point.setX(newX);
    point.setY(newY);
  });
}

function drawBlurb(){
  var blurbStartX = bagImgLeftBottomX;
  var blurbStartY = 0.04 * height;
  var blurbWidth = 0.236 * width;
  var blurbHeight = 0.5 * height;
  var blurbTitle = "Introduction";
  var blurb = "High-end bags always occupy a unique and mysterious market, they are stylish, but pricey. This project collects the classic bags from 8 current mainstream brands, and visually presents the distributions across different brands and different styles (the axis based on price and volume can be regarded as part of the cost performance).\n\nThis project aims to 1) provide people with general information and framework of the high-end bag market, and 2) be a simple product information tool for those who are interested in purchasing a bag.";
  if (dist(mouseX, mouseY, menuRingOriginX, menuRingOriginY) < menuInnerCircleRadius){
    textFont(font);
    textSize(fontSizeM);
    text(blurb, blurbStartX, blurbStartY + 30, blurbWidth, blurbHeight);
    
    textFont(fontB);
    textSize(fontSizeL);
    text(blurbTitle, blurbStartX, blurbStartY, blurbWidth, blurbHeight);
  } 
}

function drawBrand(){
  var subPageCircleColor = 'white';
  var brandNum = brands.length;
  
  brands.forEach(function(brd){
    push();
    ctx.shadowColor = color (180,180,180);
    ctx.shadowBlur = 10;
    let imgShow;
    if (brandInfo[brd].selected){
      imgShow = brandInfo[[brd]].imgB;
    }else{
      imgShow = brandInfo[[brd]].imgW;
    }
    image(imgShow, brandInfo[brd].X.value - subPageCircleRadius, brandInfo[brd].Y.value - subPageCircleRadius, 2 * subPageCircleRadius,  2 * subPageCircleRadius);
    pop();
  });
}

function drawStyle(){
  var subPageCircleRadius = 0.015 * width;
  var subPageCircleColor = 'white';
  var styleNum = styles.length;
  
  styles.forEach(function(stl){
      push();
      ctx.shadowColor = color (180,180,180);
      ctx.shadowBlur = 10;
      let imgShow;
      if (styleInfo[stl].selected){
        imgShow = styleInfo[stl].imgB;
      }
      else{
        imgShow = styleInfo[stl].imgW;
      }
      image(imgShow, styleInfo[stl].X.value - subPageCircleRadius, styleInfo[stl].Y.value - subPageCircleRadius, 2 * subPageCircleRadius,  2 * subPageCircleRadius);
      pop();
  });
}

function updateSubPage(){
  styles.forEach(function(stl){
    styleInfo[stl].X.update();
    styleInfo[stl].Y.update();
  });
  brands.forEach(function(brd){
    brandInfo[brd].X.update();
    brandInfo[brd].Y.update();
  });
}

function drawPoints(){
  let nearestMouseDistance = 1000;
  let nearestIndex; 
  
  if(pageSelected.Brand){
    let selectedBrands = [];
    brands.forEach(function(brd){
      if (brandInfo[brd].selected){
        selectedBrands.push(brd);
      }
    });
    bagPoints.forEach(function(point){
      if(selectedBrands.includes(point.getBrand())){
        point.setSelected(true);
      }
      else{
        point.setSelected(false);
      }
    });
  }
  
  if(pageSelected.Style){
    let selectedStyles = [];
    styles.forEach(function(stl){
      if(styleInfo[stl].selected){
        selectedStyles = selectedStyles.concat(style_map[stl]);
      }
    });
    bagPoints.forEach(function(point){
      if(selectedStyles.includes(point.getStyle())){
        point.setSelected(true);
      }
      else{
        point.setSelected(false);
      }
    });
  }
  
  bagPoints.forEach(function(point){
    point.updatePosition();
    point.setNearest(false);
    if (point.getDistance() < nearestMouseDistance){
      nearestMouseDistance = point.getDistance();
      nearestIndex = point.getIndex();
    }
    
  });
  if (nearestMouseDistance <= bagPointRadius){
    cursor(HAND);
  }else{
    if(!mouseHoverMenu){
      cursor(AUTO);
    }
  }

  bagPoints.forEach(function(point){
    if (point.getIndex() == nearestIndex){
      point.setNearest(true);
    }
    point.display();
  });
}

function draw(){
  background('white');
  drawTitle();
  drawBlurb();
  drawMenu();
  drawPrice();
  if(pageSelected.Brand){
    drawBrand();
  }
  if(pageSelected.Style){
    drawStyle();
  }
  updateSubPage();
  drawPoints();
}
  
function resetBrand(){
  pageSelected.Brand = false;
  for (let i = 0; i < brands.length; i++){
    brandInfo[brands[i]].X.setTarget(menuPageXs.Brand);
    brandInfo[brands[i]].Y.setTarget(menuPageYs.Brand);
    }
    
    brands.forEach(function(brd){
      brandInfo[brd].selected = true;
    });
}

function resetStyle(){
  pageSelected.Style = false;
  for (let i = 0; i < styles.length; i++){
      styleInfo[styles[i]].X.setTarget(menuPageXs.Style);
      styleInfo[styles[i]].Y.setTarget(menuPageYs.Style);
    }
 
  styles.forEach(function(stl){
        styleInfo[stl].selected = true;
    }); 
}

function clickedStyle(){
  var styleStartAngle = - 135/180 * PI;
  var styleEndAngle = - 210/180 * PI;
  let styleNum = styles.length;
  pageSelected.Style = true;
  pageSelected.All = false;
    
  for (let i = 0; i < styleNum; i++){
    let curretBrandDegree = map(i, 0, styleNum - 1, styleStartAngle, styleEndAngle);
    let newX = cos(curretBrandDegree) * subPageOrbitRadius + menuPageXs.Style;
    let newY = sin(curretBrandDegree) * subPageOrbitRadius + menuPageYs.Style;
    styleInfo[styles[i]].X.setTarget(newX);
    styleInfo[styles[i]].Y.setTarget(newY);
  }
    styles.forEach(function(stl){
      styleInfo[stl].selected = false;
    });
    resetBrand();
}

function clickedBrand(){
  var brandStartAngle = - 10/180 * PI;
  var brandEndAngle = - 260/180 * PI;
  let brandNum = brands.length;
  pageSelected.Brand = true;
  pageSelected.All = false;
  for (let i = 0; i < brandNum; i++){
    let curretBrandDegree = map(i, 0, brandNum - 1, brandStartAngle, brandEndAngle);
    let newX = cos(curretBrandDegree) * subPageOrbitRadius + menuPageXs.Brand;
    let newY = sin(curretBrandDegree) * subPageOrbitRadius + menuPageYs.Brand;
    brandInfo[brands[i]].X.setTarget(newX);
    brandInfo[brands[i]].Y.setTarget(newY); 
    }
    brands.forEach(function(brd){
      brandInfo[brd].selected = false;
    });
   resetStyle();
}

function clickedAll(){
    pageSelected.All = true;
    resetBrand();
    resetStyle();
    bagPoints.forEach(function(point){
      point.setSelected(true);
    }); 
}

function mouseClicked(){
  if(dist(mouseX, mouseY, menuPageXs.Brand,  menuPageYs.Brand) < menuPageCircleRadius){
     clickedBrand();
  }
  else if(dist(mouseX, mouseY, menuPageXs.Style, menuPageYs.Style) < menuPageCircleRadius){
     clickedStyle();
  }
  else if(dist(mouseX, mouseY, menuPageXs.All, menuPageYs.All) < menuPageCircleRadius){
     clickedAll();
  }
  else{
    if(pageSelected.Brand){
      brands.forEach(function(brd){
        if(dist(mouseX, mouseY, brandInfo[brd].X.value, brandInfo[brd].Y.value) < subPageCircleRadius){
          brandInfo[brd].selected = !brandInfo[brd].selected;
        } 
      });
    }
    
   if(pageSelected.Style){
    styles.forEach(function(stl){
      if(dist(mouseX, mouseY, styleInfo[stl].X.value, styleInfo[stl].Y.value) < subPageCircleRadius){
        styleInfo[stl].selected = !styleInfo[stl].selected;
      }
    });
  }
  }
}
