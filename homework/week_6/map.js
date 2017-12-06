// Daphne Box
// 10455701

// import {d3} from "d3";

window.onload = function() {
	// specify specific margins of the graph
	//var margin = {top: 50, right: 45, bottom: 50, left: 30};

	// specify width and heigth of the graph
	//var width = 800 - margin.left - margin.right;
	//var height = 700 - margin.top - margin. bottom;

	// make the formulas for the x and y transformation of the 
	//var x = d3.scale.linear().range([0, width]);
	//var y = d3.scale.linear().range([height, 0]);
	
	//var svg = d3.select("svg");
	//var chart_part = svg.attr("width", width+ margin.left + margin.right)
	//	.attr("height", height + margin.top + margin.bottom);
	//var chart = svg.append("g")
	//	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	//var chart_element = chart.attr("class", "chart")
	//	.style("map");
		
	// get specifics for map
	//var projection = d3.geo.kavrayskiy7()()
	//	.scale(1000)
	//	.translate([width / 2, height /2]);
		
	//var map = d3.geo.path()
	//	.projection(projection);
		
	//d3.select('#map')
	//	.call(map.draw, map);
		
	// make queue for loading data
	//queue()
	//	.defer(d3.csv, 'complete.csv')
	//	.defer(d3.csv, 'national.csv')
	//	.await(make_my_map);
		
	//make the map
	//function make_my_map(error, countries){
		// throw error if something went wrong while loading the data
	//	if(error) throw error;
		
	//	svg.append('map')
	//		.datum(topojson.feature(world, countries))
	//		.attr('d', map)
	//		.attr('class', 'country')
	var width = 900;
	var height = 600;

	var projection = d3.geo.mercator();
	var graticule = d3.geo.graticule();
	var svg = d3.select("svg")
		.attr("width", width)
		.attr("height", height);
	var path = d3.geo.path()
		.projection(projection);
	console.log(path);
	var g = svg.append("g")
		.attr("id", "canvas");
	
	d3.json("https://raw.githubusercontent.com/cszang/dendrobox/master/data/world-110m2.json", 
		function make_my_map (error, topology) {
		// throw error if something went wrong while loading the data
		if(error) throw error;
		var countries = topojson.feature(topology, topology.objects.countries).features,
			neighbors = topojson.neighbors(topology.objects.countries.geometries);
		console.log(topojson.feature(topology, topology.objects.countries).features);
		console.log(topojson.feature(topology, topology.objects.countries.geometries))
		g.selectAll("path")
			.data(countries)
		.enter()
			.append("path")
			.attr("d", path)
			.attr("stroke", "black")
			.attr("fill", "none");
			
		g.insert("path", ".graticule")
		  .datum(topojson.mesh(topology, topology.objects.countries, function(a, b) { return a !== b; }))
		  .attr("class", "boundary")
		  .attr("d", path)
		  .attr("fill", "none");
	});
	
	// make queue for loading data
	queue()
		.defer(d3.csv, 'complete.csv')
		.defer(d3.csv, 'national.csv');
	
}
			



