// Daphne Box
// 10455701
window.onload = function(){
// make queue for loading data
queue()
	.defer(d3.csv, 'population.csv')
	.defer(d3.csv, 'national.csv');

// make world map
var basic = new Datamap({
  element: document.getElementById("basic")
});
}