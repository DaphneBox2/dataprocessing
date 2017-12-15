/*
Name: Daphne Box
Studentnumber: 10455701
Purpose of the file: Create map which shows number of inhabitants in the graph
References:
1. http://datamaps.github.io/
2. http://bl.ocks.org/mapsam/6090056
3. https://stackoverflow.com/questions/7196212/how-to-create-dictionary-and-add-key-value-pairs-dynamically
*/

var country_dict = [];
var dict = {};

window.onload = function(){
	var state = "";
	var year = 2010;
	make_map(year);
	make_chart(state,year);
	
}

function make_map(year){

	// load in the data
	queue()
		.defer(d3.csv, 'population.csv')
		.await(load_data);

	// hang data to correct tags for the map
	function load_data(error, population){

	if(year == ""){
		year = 2010;
	}

	// check for loading errors and throw if any occurs
	if(error) throw error;
		var country_color;
		var set_country;

	// determine colour code
	population.forEach(function(d){
		if(d.Year == year){
			if(d.Value <= 1000000){
				country_color = "very_light_populated";
			}
			else if(d.Value <= 10000000){
				country_color = "light_populated";
			}
			else if(d.Value <= 50000000){
				country_color = "middle_populated";
			}
			else if(d.Value <= 100000000){
				country_color = "heavy_populated";
			}
			else if(d.Value <= 500000000){
				country_color = "very_heavy_populated";
			}
			else if(d.Value >= 1000000000){
				country_color = "more";
			}
			set_country = ("" + d.Country_Code + "");

		// make array of dicts to get it in color linked to country dict
			country_dict.push({
				country: set_country,
				colored : country_color
			});
		}
	})

	// make dictionary to color the map
	country_dict.forEach(function(d){
		dict[d.country] = {"fillKey": d.colored}
	})

	// make the map
	var basic = new Datamap({
		scope: 'world',
		element: document.getElementById("basic"),
		projection: 'mercator',
		fills: {
		defaultFill: "#E5E4DF",
		"very_ligth_populated": "#F7E899",
		"light_populated": "#F9DA36",
		"middle_populated": "#F9DA36",
		"heavy_populated": "#F9DA36",
		"very_heavy_populated": "#988108",
		"more": "#342C01"
	},

		data: dict

	})
	basic.svg.selectAll(".datamaps-subunits")
		.on("click", function(){update_chart(year)});
	}

	make_legenda();
}	

function make_chart(state, year){
	
	// set up all margins, functions for axis and elements for the chart
	var margin = {top: 100, right: 30, bottom: 30, left: 30};
	var width = 800 - margin.left - margin.right;
	var height = 700 - margin.top - margin. bottom;
	var x = d3.scale.ordinal()
		.domain(["christianity", "judaism", "islam", "buddism", "hindoeism", "no_religion"])
		.rangeRoundBands([0, width], .1);
	var y = d3.scale.linear()
		.range([height, 0]);
	var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("class", "bar")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		

	// load the data
	queue()
		.defer(d3.csv, 'religions.csv')
		.defer(d3.csv, 'national.csv')
		.await(load_data);

	function load_data (error, religions, national) {

		// check for errors
		if(error) throw error;
		
		// select USA if no state is chosen
		if(state == ""){
			state = "United States of America";
		}

		// filter all data 
		var data = national.filter(function(d){return d.year == year && d.state == state;});

		// put data in json format
		var data_current = [];

		data.forEach(function(d){
			data_current.push({
				religion: "christianity",
				number: (d.christianity_percent * 100)
			},
			{
				religion: "judaism",
				number: (d.judaism_percent * 100)
			},
			{
				religion: "islam",
				number: (d.islam_percent * 100)
			},
			{
				religion: "buddism",
				number: (d.buddhism_percent * 100)

			},
			{
				religion: "hindoeism",
				number: (d.hinduism_percent * 100)
			},
			{
				religion: "no_religion",
				number: (d.noreligion_percent * 100)
			})
		})

		x.domain(data_current.map(function(d) {return d.religion;}));
		y.domain([0, 100]);
		var bar_width = width / religions.length;

		// make text tag for chart title
		chart.append("text")
			.attr("class", "state")
			.style("opacity", 0);
		var bar = chart.selectAll("g");
		var bar_update = bar.data(data_current);
		var bar_enter = bar_update.enter()
			.append("g")
			.attr("transform", function(d) { return "translate(" + (margin.left + x(d.religion)) + ", 0)"; });
		var rect = bar_enter.append("rect")
				.attr("y", function(d) {return y(d.number)})
				.attr("height", function(d) {return height - y(d.number);})
				.attr("width", bar_width - 1)
				.attr("fill", "blue")
				
		d3.select(".state")
			.attr("id", year)
			.attr("x", (width /2))
			.attr("y", (margin.top / 2))
			.style("opacity", 1)
			.style("font-size", "16px")
			.text("" + state + "and" + year + "");

		// make axis 
		var x_axis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		var x_labels = chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(43," + height + ")")
			.call(x_axis)
			.append("text")
				.attr("transform", "translate(" + (width / 2) + ", 20)")
				.text("religion");	
		
		var y_axis = d3.svg.axis()
			.scale(y)
			.orient("left");
		chart.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(43,0)")
			.attr()
			.call(y_axis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", -20)
				.attr("y", (-30))
				.text("percentage");
		
	}

}

// updates chart for country
function update_chart(year){
	var state = d3.select("strong")
		.html();
	d3.select(".bar")
		.remove();
	make_chart(state, year);
}

// updates chart for year
function update_chart_year(year){
	state = d3.select(".state")
		.html();
	d3.select(".bar")
		.remove();
	make_chart(state, year);
}

// updates map
function update_map(year){
	d3.select(".datamap")
		.remove();
	make_map(year);
}

// updates map and graph for year changes
function year_1960(){
	year = 1960;
	update_map(year);
	update_chart_year(year);
}

function year_2010(){
	year = 2010;
	update_map(year);
	update_chart_year(year);
}

function make_legenda(){
	// makes a legenda
	d3.select("#basic")
		.select("svg")
			.append("g")
			.attr("class", "legenda")
			.append("rect")
				.attr("id", "canvas")
				.attr("x", 1200)
				.attr("y", 600)
				.attr("class", "st0")
				.attr("width", "500")
				.attr("height", "400")
				.style("opacity", "0.1");

	// sets colors and text for legenda
	var colors = ["#F7E899", "#F9DA36", "#F9DA36", "#988108", "#685802", "#342C01"];
	var people = [1000000, 10000000, 25000000, 50000000, 100000000, 500000000];

	// make rectangles with colors for legenda
	for(var i = 1; i < (colors.length + 1); i++){
	d3.select("g", ".legenda")
	.append("rect")
		.attr("id", ("kleur"+(i)))
		.attr("x", 1200)
		.attr("y", (23.4 * (i - 1) + 500))
		.attr("class", "st1")
		.attr("width", "10")
		.attr("height", "15")
		.style("fill", colors[i - 1])
	.append("text")
		.attr("id", ("text" + i))
		.attr("x", 1000)
		.attr("y", (23.4 * (i - 1) + 560))
		.attr("class", "st2")
		.attr("width", "60")
		.attr("height", "15")
		.text("Country has less than " + people[i - 1] + " inhabitants");
	}
}