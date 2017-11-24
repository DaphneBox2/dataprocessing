// Daphne Box
// 10455701

// import {d3} from "d3";

// most of the ideas for the bar graph come from https://bl.ocks.org/mbostock/3887118

window.onload = function() {
// specify color codes 
var colors = ['#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];
var world_parts = ["Americas", "Asia Pacific", "Europe", "Middle East and North Africa", "Post-communist", "Sub Saharan Africa", "No data"];

// specify specific margins of the graph
var margin = {top: 50, right: 45, bottom: 50, left: 30};

// specify width and heigth of the graph
var width = 800 - margin.left - margin.right;
var height = 700 - margin.top - margin. bottom;

// make the formulas for the x and y transformation of the 
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// go inside the body and make all the tags that are needed before data is loaded
var body = d3.select("body");
var svg = body.select("svg");
var chart_part = svg.attr("width", width+ margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);
var chart = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var chart_element = chart.attr("class", "chart")
	.style("scatter");

// load data
var data = d3.csv("happiness_scale2.1.csv", function(error, data) {
	
	// throw error if something went wrong while loading the data
	if(error) throw error;

	// remove data with missing variables
	var data_2 = [];
	for(var i = 0; i < data.length; i++){
		if(data[i].ecological_footprint != ""){
			data_2.push(data[i]);
		};
	};

	data_2.forEach(function(d){
		d.life_expectancy = +d.life_expectancy; 
		d.wellbeing = +d.wellbeing;
	});
	
	// calculate x and y coordinates for all data points
	x.domain(d3.extent(data_2, function(d) {console.log(d.life_expectancy); return d.life_expectancy;}))
		.nice();
	y.domain([0, d3.max(data_2, function(d) { return d.wellbeing;})])
		.nice();

	// create tag to represent and place the data points correctly and with corresponding color code
	var dot = chart.selectAll("g");
	var dot_update = dot.data(data_2);
	var dot_enter = dot_update.enter();
	var dot_place = dot_enter.append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) {return x(d.life_expectancy);})
		.attr("cy", function(d) {return y(d.wellbeing);})
		.style("fill", function(d){
			if (d.region == "Americas"){return colors[0];} 
			else if (d.region == "Asia Pacific"){return colors[1];} 
			else if (d.region == "Europe"){return colors[2];} 
			else if (d.region == "Middle East and North Africa"){return colors[3];} 
			else if (d.region == "Post-communist"){return colors[4];} 
			else if (d.region == "Sub Saharan Africa"){return colors[5];} 
			else{return colors[6];}
		});

	// create tooltip
	var tip = d3.tip()
		.attr("class", "tooltip")
		.offset([-15, 0])
		.html(function(d){
			return ("<g><rect id = country_rect></rect><p>country: " + d.country + "</p></g>");
		});

		svg.call(tip);

	// show name of country data comes from when mouse is on datapoint
	chart.selectAll(".dot")
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide);

	// make x-axis with scale
	var x_axis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(30," + height + ")")
		.call(x_axis);	
	
	chart.append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", height + 30)
		.style("text-anchor", "end")
		.text("Life expectancy (years)");

	// make y-axis with scale
	var y_axis = d3.svg.axis()
		.scale(y)
		.orient("left");
	
	chart.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(30,0)")
		.call(y_axis);
	
	chart.append("text")
		.attr("class", "label")
		.attr("x", 10)
		.attr("y", 40)
		.attr("transform", "rotate(270, 0, 40)")
		.style("text-anchor", "end")
		.text("Happiness grade");

	// place a legenda
	// make big square for legenda
	chart.append("g")
		.attr("class", "legenda")
		.append("rect")
	        .attr("id", "canvas")
	        .attr("x", 550)
	        .attr("y", 395)
	        .attr("class", "st0")
	        .attr("width", "250")
	        .attr("height", "150")
	        .style("opacity", "0.1");

    // make rectangles with colors for legenda
    for(var k = 1; k < (colors.length + 1); k++){
    	d3.select("g", "#legenda")
	        	.append("rect")
	            .attr("id", ("kleur" + k))
	            .attr("x", 550)
	            .attr("y", (23.4 * (k - 1) + 400))
	            .attr("class", "st1")
	            .attr("width", "10")
	            .attr("height", "15")
	            .style("fill", colors[k - 1]);
        };
   

    // make text element to describe input legenda and data
    for(var n = 1; n < (colors.length + 1); n++){
    	d3.select("g", "#legenda")
        	.append("text")
            .attr("id", ("text" + n))
            .attr("x", 580)
            .attr("y", (23.4 * (n - 1) + 410))
            .attr("class", "st2")
            .attr("width", "60")
            .attr("height", "15")
            .text(world_parts[n - 1]);
    };              
});
}