var datasetScene2 = [
    { label: "China", population: 1230075000 },
    { label: "India", population: 1006302000 },
    { label: "United States", population: 281421906 },
    { label: "Indonesia", population: 211513823 },
    { label: "Brazil", population: 176029560 },
    { label: "Russia", population: 146757517 },
    { label: "Pakistan", population: 152040958 },
    { label: "Bangladesh", population: 129592275 },
    { label: "Japan", population: 126843000 },
    { label: "Nigeria", population: 111506579 },
    // Add more data points for 2000
];

var diameterScene2 = 500;
var colorScene2 = d3.scaleOrdinal(d3.schemeCategory20);

var bubbleScene2 = d3.pack(datasetScene2)
    .size([diameterScene2, diameterScene2])
    .padding(1.5);

var svgScene2 = d3.select("#scene2")
    .append("svg")
    .attr("width", diameterScene2)
    .attr("height", diameterScene2)
    .attr("class", "bubble");

var nodesScene2 = d3.hierarchy({ children: datasetScene2 })
    .sum(function(d) { return d.population; });

var nodeScene2 = svgScene2.selectAll(".node")
    .data(bubbleScene2(nodesScene2).descendants())
    .enter()
    .filter(function(d) {
        return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

nodeScene2.append("title")
    .text(function(d) {
        return d.data.label + ": " + d.data.population;
    });

nodeScene2.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d, i) {
        return colorScene2(i);
    });

nodeScene2.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.label.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
        return d.r / 5;
    })
    .attr("fill", "white");

nodeScene2.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.population;
    })
    .attr("font-family", "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d) {
        return d.r / 5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameterScene2 + "px");

var maxPopulationScene2 = d3.max(datasetScene2, function(d) {
    return d.population;
});

// Find the country with the highest population
var maxCountryScene2 = datasetScene2.find(function(d) {
    return d.population === maxPopulationScene2;
});

// Add the annotation
nodeScene2.filter(function(d) {
    return d.data.label === maxCountryScene2.label;
}).append("text")
    .attr("dy", -15)
    .style("text-anchor", "middle")
    .text("Highest Population")
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
        return d.r / 5;
    })
    .attr("fill", "#FF0000");
