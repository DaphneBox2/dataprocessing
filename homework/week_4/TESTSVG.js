d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);
    var colors = ['#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];
    var id_nr = ['kleur1', 'kleur2', 'kleur3', 'kleur4', 'kleur5', 'kleur6'];
    var place = [1, 2, 3, 4, 5, 6];
    var legenda_rects = [1000, 10000, 100000, "unknown"];

    var svg = d3.select("svg");

	d3.selectAll("rect")
        .remove("rect");

    svg.append("rect")
        .attr("id", "canvas")
        .attr("x", "1.8")
        .attr("y", "1.8")
        .attr("class", "st0")
        .attr("width", "175.1")
        .attr("height", "291.4")

    for(var i = 1; i < (colors.length + 1); i++){
        svg.append("rect")
            .attr("id", ("kleur" + i))
            .attr("x", "13")
            .attr("y", (43.4 * (i - 1) + 20))
            .attr("class", "st1")
            .attr("width", "21")
            .attr("height", "29");   
    }

    for(var j = 1; j < (colors.length + 1); j++){
        svg.append("rect")
            .attr("id", ("tekst" + j))
            .attr("x", "46.5")
            .attr("y", (43.4 * (j - 1) + 20))
            .attr("class", "st2")
            .attr("width", "119.1")
            .attr("height", "29");   
    }

    for(var k = 1; k < (colors.length + 1); k++){
        svg.append("text")
            .attr("id", ("tekst" + k))
            .attr("x", "46.5")
            .attr("y", (43.4 * (k - 1) + 20))
            .attr("class", "st2")
            .attr("width", "119.1")
            .attr("height", "29")
            .style("font-size", 5);  
    }
    
    
    svg.append("text")
	.attr("color", "black")
	.attr("x", 50)
	.attr("y", 10)
    .style("font-size", 10)
	.text("Legenda");

    // d3.select("#st1")
    //     .attr("style", colors[0]);

    for(var l = 1; l < colors.length + 1; l++){
        var kleur_no = 'kleur' + l;
        console.log(kleur_no)
        d3.select("#" + kleur_no)
            .style("fill", colors[l - 1]);
    }
    // d3.select('#kleur1')
    // 	.style("fill", colors[0]);

    // d3.select('#kleur2')
    // 	.style("fill", colors[1]);

    // d3.select('#kleur3')
    // 	.style("fill", colors[2]);	

    // d3.select('#kleur4')
    //     .style("fill", colors[3]);

    // d3.select('#kleur5')
    //     .style("fill", colors[4]);

    // d3.select('#kleur6')
    //     .style("fill", colors[5]);
    
    
    			    
});
console.log("hello");