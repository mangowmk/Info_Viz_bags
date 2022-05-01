function BagPoint(idx, startX, startY, brd, pnm, nm, stl, prc, bag_cl, sk_tp, vlm, sel) {
  var index = idx;
  var name = nm;
  var picName = pnm;
  var brand = brd;
  var style = stl;
  var price = prc;
  var bagColor = bag_cl;
  //var iconColor = cl;
  var skinType = sk_tp;
  var volume = vlm;
  var nearestDot = false;
  var selected = sel;
 
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;
  
  // this handles updating any animated variables
  this.updatePosition = function(){
    x.update();
    y.update();
  };

  this.displayDot = function(){
    push();
    if(selected){
      if(this.mouseHover() && nearestDot && selected){
        fill('Red');
      }else{
        fill(bagPointColor);
    }
    }else{
      fill(unselectedBagPointColor);
    }
   
    strokeWeight(1);
    stroke('lightgray');
    if (this.mouseHover() && nearestDot && selected){
      ellipse(x.value + bagPointRadius / 2, y.value + bagPointRadius / 2, bagPointRadius + 4, bagPointRadius + 4);
    }else{
      ellipse(x.value + bagPointRadius / 2, y.value + bagPointRadius / 2, bagPointRadius, bagPointRadius);
    }
    
    
    //if (style == "Crossbody Bag"){
      
    //}
    //else if(style == "Shoulder Bag"){
    //  rect(x.value, y.value, 10, 15);
    //}
    //else if(style == "Handbag"){
    //  rect(x.value, y.value, 13, 13);
    //}
    //else if(style == "Crossbody Bag, Shoulder Bag"){
    //  rect(x.value, y.value, 10, 15, 2);
    //}
    //else if(style == "Shoulder Bag, Handbag"){
    //  ellipse(x.value + 6, y.value + 6, 12, 16);
    //}
    //else if(style == "Crossbody Bag, Handbag"){
    //  rect(x.value, y.value, 13, 13, 3);
    //}
    //else if(style == "Crossbody Bag, Shoulder Bag, Handbag"){
    //  rect(x.value, y.value, 13, 13, 6);
    //}
    pop();   
  };
  
  this.setNearest = function(nearest){
    nearestDot = nearest;
  };
  
  this.getDistance = function(){
    return dist(mouseX, mouseY, x.value, y.value);
  };
  
  this.getBrand = function(){
    return brand;
  };
  
  this.getStyle= function(){
    return style;
  };
  // function to get the data point's value so it can be sorted 
  this.getIndex = function(){
    return index;
  };
 
  this.display = function(){
    this.displayDot();
       
    if (this.mouseHover() && nearestDot && selected){
      this.displayBagInfo();
      this.displayBagImg();
    }   
  };
  this.setSelected = function(sel){
    selected = sel;
  };
  this.mouseHover = function(){
    var mouseDistance = dist(mouseX, mouseY, x.value, y.value);
    if (mouseDistance <= bagPointRadius){
      return true;
    }
    else{
    return false;
  }
  };
  
  this.displayBagInfo = function(){
      push();
      textAlign(LEFT);
      // draw the value of this data point (using 1 decimal point)
      textSize(bagNameSize);
      textFont(font);
      fill(bagNameColor);
      text(name, bagNameX, bagNameY);
      
      textSize(bagBrandSize);
      textFont(fontB);
      fill(bagNameColor);
      text(brand, bagNameX, bagNameY - bagBrandSize);

      textSize(bagPriceSize);
      textFont(fontB);
      fill(bagNameColor);
      text("$" + price, bagPriceX, bagPriceY);
       
      textSize(bagVolumeSize);
      textFont(font);
      fill(bagNameColor);
      text("/ " + volume + " inch"+ String.fromCodePoint(0x00B3), bagVolumeX, bagVolumeY);
      pop();
  };
  
  this.displayBagImg = function(){
  var bagInfoImgWidth = bagImgs[picName].width * 0.25;
  var bagInfoImgHeight = bagImgs[picName].height * 0.25;
  image(bagImgs[picName], bagImgLeftBottomX, bagImgLeftBottomY - bagInfoImgHeight, bagInfoImgWidth, bagInfoImgHeight);
  };
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setX = function(newX) {
    // if this is the first time it's being set, create the SoftNum
    if (x == null) {
      x = new SoftNum(newX, 0.35, 0.5);
    } else {
      x.setTarget(newX);
    }
  };

  this.setY = function(newY) {
    // use setTarget() instead of x= so that it will animate
    // if this is the first time it's being set, create the SoftNum
    if (y == null) {
      y = new SoftNum(newY, 0.35, 0.5);
    } else {
     y.setTarget(newY);
    }
  };
  
 this.getPrice = function(){
  return price;
};

 this.getVolume = function(){
  return volume;
};
  
  // this sets the actual value for this data point
  // function to get the data point's value so it can be sorted
  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setX(startX);
  this.setY(startY);
}
