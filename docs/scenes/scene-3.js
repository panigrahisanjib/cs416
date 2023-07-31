var datasetScene3 = [
    { label: "China", population: 1334500000 },
    { label: "India", population: 1189172906 },
    { label: "United States", population: 309011475 },
    { label: "Indonesia", population: 239871739 },
    { label: "Brazil", population: 192376496 },
    { label: "Russia", population: 143974059 },
    { label: "Pakistan", population: 170330000 },
    { label: "Bangladesh", population: 151616777 },
    { label: "Japan", population: 127433494 },
    { label: "Nigeria", population: 158423180 },
    // Add more data points for 2010
];

var diameterScene3 = 500;
var colorScene3 = d3.scaleOrdinal(d3.schemeCategory20);

var bubbleScene3 = d3.pack(datasetScene3)
    .size([diameterScene3, diameterScene3])
    .padding(1.5);

var svgScene3 = d3.select("#scene3")
    .append("svg")
    .attr("width", diameterScene3)
    .attr("height", diameterScene3)
    .attr("class", "bubble");

var nodesScene3 = d3.hierarchy({ children: datasetScene3 })
    .sum(function(d) { return d.population; });

var nodeScene3 = svgScene3.selectAll(".node")
    .data(bubbleScene3(nodesScene3).descendants())
    .enter()
    .filter(function(d) {
        return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

nodeScene3.append("title")
    .text(function(d) {
        return d.data.label + ": " + d.data.population;
    });

nodeScene3.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d, i) {
        return colorScene3(i);
    });

nodeScene3.append("text")
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

nodeScene3.append("text")
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
    .style("height", diameterScene3 + "px");

var maxPopulationScene3 = d3.max(datasetScene3, function(d) {
    return d.population;
});

// Find the country with the highest population
var maxCountryScene3 = datasetScene3.find(function(d) {
    return d.population === maxPopulationScene3;
});

// Add the annotation
nodeScene3.filter(function(d) {
    return d.data.label === maxCountryScene3.label;
}).append("text")
    .attr("dy", -15)
    .style("text-anchor", "middle")
    .text("Highest Population")
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
        return d.r / 5;
    })
    .attr("fill", "#FF0000");
