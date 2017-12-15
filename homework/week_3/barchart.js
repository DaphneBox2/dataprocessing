// Daphne Box
// 10455701

// import {d3} from "d3";

// most of the ideas for the bar graph come from https://bost.ocks.org/mike/bar/

var margin = {top: 100, right: 30, bottom: 30, left: 30};
var width = 800 - margin.left - margin.right;
var height = 700 - margin.top - margin. bottom;
var x = d3.scale.ordinal().domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]).rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);
var body = d3.select("body");
var svg = body.append("svg");
var chart_element = svg.attr("class", "chart").style("column");
var chart = d3.select(".chart").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var data = d3.json("weather1998.json", function(error, data) {
	x.domain(data.map(function(d) {return d.month;}));
	y.domain([0, d3.max(data, function(d) { return d.rain; })]);
	var bar_width = width / data.length;

	chart.append("text").attr("class", "rain").style("opacity", 0)
	var bar = chart.selectAll("g");
	console.log(data.rain);
	var bar_update = bar.data(data);
	var bar_enter = bar_update.enter().append("g").attr("transform", function(d, i) { return "translate(" + (margin.left + x(d.month)) + ", 0)"; });
	var rect = bar_enter.append("rect")
		.attr("y", function(d) {console.log(d.rain); console.log(y); console.log(y(d.rain)); return y(d.rain)})
		.attr("height", function(d) {return height - y(d.rain);})
		.attr("width", bar_width - 1)
		.on("mouseover", function(d){d3.select(this).style("fill", "red"); 
			d3.select(".rain").attr("x", function(){return x(d.month) + ((bar_width / 2) + margin.left)}).attr("y", function(){return y(d.rain)}).text(function(){return d.rain}).style("opacity", 1);})
		.on("mouseout", function(d){d3.select(this).style("fill", "steelBlue"); 
			d3.select(".rain").style("opacity", 0);});
		
	var x_axis = d3.svg.axis().scale(x).orient("bottom");
	var x_labels = chart.append("g").attr("class", "x axis").attr("transform", "translate(30," + height + ")").call(x_axis);	
	
	var y_axis = d3.svg.axis().scale(y).orient("left")//.ticks(60).tickSize(12);
	chart.append("g").attr("class", "y axis").attr("transform", "translate(30,0)").call(y_axis);
	
});

