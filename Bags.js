var canvasWidth = 1250;
var canvasHeight = 800;


var total = 130;
var bagPoints = [];
var page = 'home';


function preload(){
  bagInfo = loadTable("data/luxurybag_raw_data.csv", "csv", 'header');
  
}

function drawMenu(){
  
  
  

}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
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
    points.push(new BagPoint(i, x_start, y_start, brand, name, style, price, bagColor, skinType, volume));
  }
}


function draw() {

}
