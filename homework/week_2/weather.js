/*
Daphne Box
10455701
*/
var file = "KNMI_20170101 (1).txt"

function load_data(file){
  console.log("start");

  var raw_file = new XMLHttpRequest();
  raw_file.open("GET", file, false);
  var all_text;
  raw_file.onreadystatechange = function (){

    if(raw_file.readyState === 4){

      if(raw_file.status === 200){

        all_text = raw_file.responseText;
        console.log("succes!");
      }
    }
  }
  raw_file.send(null);
  return all_text;
}

console.log("hello");
function createTransform(domain, range){
    
    // function calculates a transform formula to go from values to pixels
    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
    var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
    return alpha * x + beta;
    }
}

function rotate_transform(month, x, x_2, y, y_2, y_3){
  
  // function to create the x-axis with tilted month names and small marks
  var month;
  var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var x;
  var x_2;
  var y;
  var y_2;
  var y_3;

  // draws lines at axis
  ctx.moveTo(x, y);
  ctx.lineTo(x, y_2);
  ctx.stroke();

  // writes the rotated text and turns it back
  ctx.font = "12px Arial";
  ctx.translate(x_2, y_3);
  ctx.rotate((-45) * Math.PI / 180);
  ctx.fillText(month_names[month], 0, 0);
  ctx.rotate((45) * Math.PI / 180);
  ctx.translate(-x_2, -y_3);
}

// format the raw data to a workable format
var rawdata = load_data(file);
console.log(rawdata);
var data = rawdata.split('\n');
data.splice(0, 12);
data.splice(366, 3);
console.log(data);
console.log(data.length);
var column = [[]];
for(var i = 0; i < data.length; i++){
  console.log(data[i]);
  column[i] = data[i].split(',');
  console.log(column[i]);
  //column[i][1].split('260,');
  column[i].shift();
  console.log(column[i]);
}

// format date so JavaScript recognizes it as such
var date = [];
var date_string;
var dash = '-';
for(var k = 0; k < column.length; k++){
  date_pre = [column[k][0].slice(0, 4), dash, column[k][0].slice(4)].join('');
  date_string = [date_pre.slice(0, 7), dash, date_pre.slice(7)].join('');
  console.log(date_string); 
  date[k] = new Date(date_string);
  console.log(date[k]);
}

// makes a canvas from: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
var canvas = document.getElementById('my_canvas');
var ctx = canvas.getContext('2d');

// calculate min and max value
var min = 0;
var max = 0;
for(var l = 0; l < column.length; l++){
  console.log(column[l][1]);
  if(column[l][1] < min){
    min = column[l][1];
  }
  else if(column[l][1]> max){
    max = column[l][1];
  }
  console.log(min);
  console.log(max);
}

// converts the min and max value to degrees instead of a 10x bigger value
var min_real = min / 10;
var max_real = max / 10;

// calculations for drawing graph
var domain_y = [min_real, max_real];
var range_y = [544, 0];
var domain_x = [date[0].getTime(), date[365].getTime()];
var range_x = [50, 1000];
var y = 0;
var x = 0;
var formula_y = createTransform(domain_y, range_y);
var formula_x = createTransform(domain_x, range_x);
ctx.moveTo(50, 544);

for(var m = 0; m < column.length; m++){
  pre_y = column[m][1];
  y = pre_y / 10;
  x = date[m].getTime();
  console.log(x);
  console.log(formula_y(y));
  console.log(formula_x(x));
  ctx.lineTo(formula_x(x), formula_y(y));
  ctx.stroke();
  ctx.moveTo(formula_x(x), formula_y(y));
}
ctx.lineTo(formula_x(x), formula_y(y));
ctx.stroke();

// draw x and y axis
ctx.moveTo(50, formula_y(Math.round(max_real)));
ctx.lineTo(50, formula_y(Math.round(min_real)));
ctx.stroke();
ctx.moveTo(50, formula_y(0));
ctx.lineTo(1000, formula_y(0));
ctx.stroke();

// values for the y axis
var temp = -1;
for(var n = 0; n < Math.round(max_real) + 1; n++){
  console.log(formula_y(temp));
  ctx.moveTo(45, formula_y(temp));
  ctx.lineTo(50, formula_y(temp));
  ctx.stroke();
  ctx.font = "12px Arial";
  if(temp > -1 && temp < 10){
    ctx.fillText(" " + temp, 30, formula_y(temp));
  }
  else{
    ctx.fillText(temp, 30, formula_y(temp));
  }
  temp++;
}

// values for the x axis
var temporary_month;
var month;
var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
for(var o = 0; o < date.length; o++){
  month = date[o].getMonth();
  var x = (formula_x(date[o]));
  var x_2 = (formula_x(date[o]) + 5);
  var y = (formula_y(0));
  var y_2 = formula_y(-0.5);
  var y_3 = formula_y(-4);
  if(temporary_month === undefined){
    temporary_month = month;
    rotate_transform(month, x, x_2, y, y_2, y_3);
  } 
  else if(temporary_month !== month){
    temporary_month = month;
    rotate_transform(month, x, x_2, y, y_2, y_3);
  }
}

// unit of x-axis
ctx.font = "14px Arial";
ctx.fillText('Time in month', 500, formula_y(-6));

// unit of y-axis
ctx.font = "14px Arial";
ctx.translate(15, formula_y(20));
ctx.rotate((-90) * Math.PI / 180);
ctx.fillText('Temperature in (C)', 0, 0);
ctx.rotate((90) * Math.PI / 180);
ctx.translate(-15, -(formula_y(20)));

// graph title
ctx.font = "21px Arial";
ctx.fillText('Temperature in de Bild 2016', 700, formula_y(32));

