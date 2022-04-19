



function BagPoint(idx, startX, startY, brd, nm, stl, prc, bag_cl, sk_tp,vlm) {
  var index = idx;
  var name = nm;
  var brand = brd;
  var style = stl;
  var price = prc;
  var bagColor = bag_cl;
  //var iconColor = cl;
  var skinType = sk_tp;
  
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;


  // this handles updating any animated variables
  this.updatePos = function(){
    x.update();
    y.update();
  };

  this.displayDot = function(){
    // color the dots in gray, with no outline
    //fill(this.iconColor);
    fill(bagPointColor);
    push();
    fill('#fae');
    strokeWeight(3);
    stroke(51);
    if (this.style == "Crossbody Bag"){
      ellipse(x.value, y.value, 13, 13);
    }
    else if(this.style == "Shoulder Bag"){
      rect(x.value, y.value, 20, 30);
    }
    else if(this.style == "Handbag"){
      rect(x.value, y.value, 25, 25);
    }
    else if(this.style == "Crossbody Bag, Shoulder Bag"){
      rect(x.value, y.value, 20, 30, 5);
    }
    else if(this.style == "Shoulder Bag, Handbag"){
      ellipse(x.value, y.value, 12, 16);
    }
    else if(this.style == "Crossbody Bag, Handbag"){
      rect(x.value, y.value, 25, 25, 5);
    }
    else if(this.style == "Crossbody Bag, Shoulder Bag, Handbag"){
      rect(x.value, y.value, 25, 25, 7);
    }
    pop();
  };
  
  this.mouseHover = function(){
    if (dist(mouseX, mouseY, x.value, y.value) < dotMouseRadius){
      this.displayBagInfo();
      this.displayBagImg();
    }
  };
  
  this.displayBagInfo = function(){
      push();
      textAlign(CENTER);
      // draw the value of this data point (using 1 decimal point)
      textSize(bagNameSize);
      fill(bagNameColor);
      text(this.name, bagNameX, bagNameY);
      pop();
  };
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setX = function(newX) {
    // use setTarget() instead of x= so that it will animate
    // if this is the first time it's being set, create the SoftNum
    if (x == null) {
      x = new SoftNum(newX);
    } else {
      x.setTarget(newX);
    }
  };

  this.setY = function(newY) {
    // use setTarget() instead of x= so that it will animate
    // if this is the first time it's being set, create the SoftNum
    if (y == null) {
      y = new SoftNum(newY);
    } else {
     y.setTarget(newY);
    }
  };
  // this sets the actual value for this data point
  
  // function to get the data point's value so it can be sorted

  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setX(x);
  this.setY(y);
}
