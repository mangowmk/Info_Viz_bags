
function BagPoint(idx, startX, startY, brd, nm, stl, prc, bag_cl, sk_tp, vlm) {
  var index = idx;
  var name = nm;
  var brand = brd;
  var style = stl;
  var price = prc;
  var bagColor = bag_cl;
  //var iconColor = cl;
  var skinType = sk_tp;
  var volumn = vlm;
  var nearestDot = false;
 
  
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;


  // this handles updating any animated variables
  this.updatePosition = function(){
    x.update();
    y.update();
  };

  this.displayDot = function(){
    // color the dots in gray, with no outline
    //fill(this.iconColor);
    push();
    fill('#fae');
    strokeWeight(3);
    stroke(51);
    if (style == "Crossbody Bag"){
      ellipse(x.value + 6, y.value + 6, 13, 13);
    }
    else if(style == "Shoulder Bag"){
      rect(x.value, y.value, 10, 15);
    }
    else if(style == "Handbag"){
      rect(x.value, y.value, 13, 13);
    }
    else if(style == "Crossbody Bag, Shoulder Bag"){
      rect(x.value, y.value, 10, 15, 2);
    }
    else if(style == "Shoulder Bag, Handbag"){
      ellipse(x.value + 6, y.value + 6, 12, 16);
    }
    else if(style == "Crossbody Bag, Handbag"){
      rect(x.value, y.value, 13, 13, 3);
    }
    else if(style == "Crossbody Bag, Shoulder Bag, Handbag"){
      rect(x.value, y.value, 13, 13, 6);
    }
  //  else{
  //  console.log('unmatched!!!');
  //}
    pop();
    
  };
  
  this.setNearest = function(nearest){
    nearestDot = nearest;
  };
  
  this.getDistance = function(){
    return dist(mouseX, mouseY, x.value, y.value);
  };
  
  this.getIndex = function(){
    return index;
  };
 
  this.display = function(){
    this.displayDot();
    
    
    if (this.mouseHover() && nearestDot){
      cursor(HAND);
      this.displayBagInfo();
      this.displayBagImg();
    }

    
  };
  
  this.mouseHover = function(){
    var mouseDistance = dist(mouseX, mouseY, x.value, y.value);
    if (mouseDistance <= dotMouseRadius){
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
      fill(bagNameColor);
      text(name, bagNameX, bagNameY);
      text(brand, bagNameX, bagNameY + bagNameSize);
      pop();
  };
  
  this.displayBagImg = function(){
  //image(bagImgs[name], bagInfoImgX, bagInfoImgY, bagInfoImgWidth, bagInfoImgWidth, 0, 0, bagSourceImgWidth, bagSourceImgHeight); 
  var bagInfoImgWidth = bagImgs[name].width * 0.3;
  var bagInfoImgHeight = bagImgs[name].height * 0.3;
  image(bagImgs[name], bagImgLeftBottomX, bagImgLeftBottomY - bagInfoImgHeight, bagInfoImgWidth, bagInfoImgHeight);
  };
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setX = function(newX) {
    // use setTarget() instead of x= so that it will animate
    // if this is the first time it's being set, create the SoftNum
    if (x == null) {
      x = new SoftNum(newX, 0.5, 0.1);
    } else {
      x.setTarget(newX);
    }
  };

  this.setY = function(newY) {
    // use setTarget() instead of x= so that it will animate
    // if this is the first time it's being set, create the SoftNum
    if (y == null) {
      y = new SoftNum(newY, 0.5, 0.1);
    } else {
     y.setTarget(newY);
    }
  };
 this.getPrice = function(){
  return price;
};
 this.getVolumn = function(){
  return volumn;
};
  
  // this sets the actual value for this data point
  
  // function to get the data point's value so it can be sorted

  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setX(startX);
  this.setY(startY);
}
