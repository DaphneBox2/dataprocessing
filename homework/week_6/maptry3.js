// Daphne Box
// 10455701
window.onload = function(){
// make queue for loading data


// make world map
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
	    "very_heavy_populated": "#988108"
	},

  data:{

  },

	done: function(basic){
		queue()
			.defer(d3.csv, 'population.csv')
			.defer(d3.csv, 'national.csv')
			.await(load_data);

		function load_data(population, believes){
			var colors = ["#F7E899", "#F9DA36", "#F9DA36", "#988108", "#685802", "#342C01"];
			population.forEach(function(d){
				if(d.population.Year == 2016 && d.population.Value =< 1200000000){
					country_value[0];
				}
				else if(d.population.Year == 2016 && d.population.Value =< 2400000000){
					country_value[1];
				}
				else if(d.population.Year == 2016 && d.population.Value =< 3600000000){
					country_value[2];
				}
				else if(d.population.Year == 2016 && d.population.Value =< 4800000000){
					country_value[3];
				}
				else if(d.population.Year == 2016 && d.population.Value =< 6000000000){
					country_value[4];
				}
				else if(d.population.Year == 2016 && d.population.Value >= 6000000000){
					country_value[5];
				}
			})
		}
 
});
}