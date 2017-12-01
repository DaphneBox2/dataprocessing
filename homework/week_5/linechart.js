// Daphne Box
// 10455701

// import {d3} from "d3";

// most of the ideas for the bar graph come from https://bl.ocks.org/mbostock/3887118

window.onload = function() {

	// specify specific margins of the graph
	var margin = {top: 50, right: 45, bottom: 50, left: 30};

	// specify width and heigth of the graph
	var width = 800 - margin.left - margin.right;
	var height = 700 - margin.top - margin. bottom;

	// make the formulas for the x and y transformation for the graph
	var x = d3.time.scale()
		.domain([new Date(2012, 0, 15), new Date(2012, 11, 15)])
		.range([0, width]);
	var y = d3.scale.linear()
		.range([height, 0]);

	// go inside the svg element and make all the tags that are needed before data is loaded
	var svg = d3.select("svg");
	var chart_part = svg.attr("width", width+ margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
	var chart = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var chart_element = chart.attr("class", "chart")
		.style("scatter");

	// load data
	var data = d3.json("weather_Kuopio_Amsterdam_2.json", function(error, data) {
		
		// throw error if something went wrong while loading the data
		if(error) throw error;

		// remove data with missing variables and make a dataset per country
		var data_1 = [];
		for(var i = 0; i < data.length; i++){
			if(data[i].months != "" && data[i].place == "Kuopio"){
				data_1.push(data[i]);
			};
		};

		var data_2 = [];
		for(var j = 0; j < data.length; j++){
			if(data[j].months != "" && data[j].place == "Amsterdam"){
				data_2.push(data[j]);
			};
		};

		// make a variable that can reformate the artificial_date variable and reformat the articficial_date variable to a date
		var format = d3.time.format("%d%m%Y").parse;
		data_1.forEach(function(d){
			d.artificial_date = format(d.artificial_date);
			d.upper_temperature =+ d.upper_temperature;
			d.lower_temperature =+ d.lower_temperature;
			d.average_temperature =+ d.average_temperature;
		});
	
		data_2.forEach(function(d){
			d.artificial_date = format(d.artificial_date);
			d.upper_temperature =+ d.upper_temperature;
			d.lower_temperature =+ d.lower_temperature;
			d.average_temperature =+ d.average_temperature;
		});
	
	
		// calculate the y coordinates for all data points
		y.domain([d3.min(data_1, function(d) {return d.lower_temperature;}), d3.max(data_2, function(d) { return d.upper_temperature;})])
			.nice();

		// make lines in graph
		var current_data;
		for(var i = 0; i < 1; i++){
			d3.select("#Amsterdam").on("click", function(){
			current_data = data_2;
			});
			d3.select("#Kuopio").on("click", function(){
				current_data = data_1;
			});
			if(i == 0){
				current_data = data_1;
			}
			if(i == 1){
				current_data = data_2;
			}
			var line_upper = d3.svg.line(current_data)
				.x(function(d) {return x(d.artificial_date)})
				.y(function(d) {return y(d.upper_temperature);});

			var line_lower = d3.svg.line(current_data)
				.x(function(d) {return x(d.artificial_date)})
				.y(function(d) {return y(d.lower_temperature);});

			var line_average = d3.svg.line(current_data)
			.x(function(d) {return x(d.artificial_date)})
			.y(function(d) {return y(d.average_temperature);});

			// create lines for the graph
				var line_chart = chart.append("path")
					.datum(current_data)
					.attr("class", "line")
					.attr("fill", "none")
					.attr("stroke", "red")
					.attr("stroke-linejoin", "round")
					.attr("stroke-linecap", "round")
					.attr("stroke-width", 1.5)
					.attr("d", line_upper);

				var line_chart = chart.append("path")
					.datum(current_data)
					.attr("class", "line")
					.attr("fill", "none")
					.attr("stroke", "blue")
					.attr("stroke-linejoin", "round")
					.attr("stroke-linecap", "round")
					.attr("stroke-width", 1.5)
					.attr("d", line_lower);

				var line_chart = chart.append("path")
					.datum(current_data)
					.attr("class", "line")
					.attr("fill", "none")
					.attr("stroke", "grey")
					.attr("stroke-linejoin", "round")
					.attr("stroke-linecap", "round")
					.attr("stroke-width", 1.5)
					.attr("d", line_average);
		};
	
		// make x-axis with scale
		var x_axis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		
		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(x_axis);	
		
		chart.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", height + 30)
			.style("text-anchor", "end")
			.text("Months");

		// make y-axis with scale
		var y_axis = d3.svg.axis()
			.scale(y)
			.orient("left");
		
		chart.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0,0)")
			.call(y_axis);
		
		chart.append("text")
			.attr("class", "label")
			.attr("x", 10)
			.attr("y", 40)
			.attr("transform", "rotate(270, 0, 40)")
			.style("text-anchor", "end")
			.text("Temperature");

		// create crosshair
		var crosshair = svg.select(".chart")
    		.append("line")
    		.attr("class", "crosshair")
    		.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", 0)
			.attr("y2", 0)
    		.attr("stroke", "purple");
		var crosshair_text = svg.select(".chart")
			.append("text")
			.attr("class", "crosshair_text")
			.attr("x1", 0)
			.attr("x2", 0)
			.attr("y1", 0)
			.attr("y2", 0)
			.style("font-size", "10px");
	    
		// Update crosshair and crosshairtext
	    svg.on("mousemove", function() {
		   	var mouse = d3.mouse(this);
		   	var x_mouse = mouse[0];

			d3.select(".crosshair")
				.attr("x1", x_mouse)
				.attr("x2", x_mouse)
				.attr("y1", height)
				.attr("y2", 0)
				.attr("stroke", "purple")
				
			d3.select(".crosshair_text")
				.attr("x1", x_mouse)
				.attr("x2", x_mouse)
				.attr("y1", height)
				.attr("y2", 0)
				.attr("stroke", "purple")
				.text(function(d){return x_mouse(d.upper_temperature), x_mouse(d.lower_temperature), x_mouse(d.average_temperature);});
		
    	});
	})
};
		