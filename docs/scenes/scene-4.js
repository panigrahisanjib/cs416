var datasetScene4 = [
  // Year 1980
  { year: 1980, label: "China", population: 987437000 },
  { year: 1980, label: "India", population: 716492000 },
  { year: 1980, label: "United States", population: 227225000 },
  { year: 1980, label: "Indonesia", population: 147447836 },
  { year: 1980, label: "Brazil", population: 121919229 },
  { year: 1980, label: "Pakistan", population: 84402000 },
  { year: 1980, label: "Bangladesh", population: 103764241 },
  { year: 1980, label: "Nigeria", population: 73409863 },
  { year: 1980, label: "Russia", population: 261824000 },
  { year: 1980, label: "Japan", population: 118293000 },

  // Year 1990
  { year: 1990, label: "China", population: 1154605771 },
  { year: 1990, label: "India", population: 873277798 },
  { year: 1990, label: "United States", population: 252120309 },
  { year: 1990, label: "Indonesia", population: 199278123 },
  { year: 1990, label: "Brazil", population: 163963965 },
  { year: 1990, label: "Russia", population: 147433452 },
  { year: 1990, label: "Pakistan", population: 125169558 },
  { year: 1990, label: "Bangladesh", population: 113704579 },
  { year: 1990, label: "Nigeria", population: 88191351 },
  { year: 1990, label: "Japan", population: 123537000 },

  // Year 2000
  { year: 2000, label: "China", population: 1230075000 },
  { year: 2000, label: "India", population: 1006302000 },
  { year: 2000, label: "United States", population: 281421906 },
  { year: 2000, label: "Indonesia", population: 211513823 },
  { year: 2000, label: "Brazil", population: 176029560 },
  { year: 2000, label: "Russia", population: 146757517 },
  { year: 2000, label: "Pakistan", population: 152040958 },
  { year: 2000, label: "Bangladesh", population: 129592275 },
  { year: 2000, label: "Nigeria", population: 111506579 },
  { year: 2000, label: "Japan", population: 126843000 },

  // Year 2010
  { year: 2010, label: "China", population: 1334500000 },
  { year: 2010, label: "India", population: 1189172906 },
  { year: 2010, label: "United States", population: 309011475 },
  { year: 2010, label: "Indonesia", population: 239871739 },
  { year: 2010, label: "Brazil", population: 192376496 },
  { year: 2010, label: "Russia", population: 143974059 },
  { year: 2010, label: "Pakistan", population: 170330000 },
  { year: 2010, label: "Bangladesh", population: 151616777 },
  { year: 2010, label: "Nigeria", population: 158423180 },
  { year: 2010, label: "Japan", population: 127433494 },

  // Add more data points for each year and country if needed...

  // Year 2016
  { year: 2016, label: "China", population: 1386412256 },
  { year: 2016, label: "India", population: 1306687000 },
  { year: 2016, label: "United States", population: 323015995 },
  { year: 2016, label: "Indonesia", population: 260581100 },
  { year: 2016, label: "Brazil", population: 207353391 },
  { year: 2016, label: "Pakistan", population: 193203476 },
  { year: 2016, label: "Bangladesh", population: 162951560 },
  { year: 2016, label: "Nigeria", population: 185989640 },
  { year: 2016, label: "Russia", population: 146599183 },
  { year: 2016, label: "Japan", population: 126994511 },
];

// Group data by country and calculate the population difference
function groupByCountry(data) {
  var map = new Map();
  data.forEach(function (d) {
    var key = d.label;
    if (!map.has(key)) {
      map.set(key, { label: d.label, population1980: 0, population2016: 0 });
    }
    var entry = map.get(key);
    entry["population" + d.year] = d.population;
    map.set(key, entry);
  });
  return Array.from(map.values());
}

var aggregatedDataScene4 = groupByCountry(datasetScene4);

var diameterScene4 = 500;
var colorScene4 = d3.scaleOrdinal(d3.schemeCategory20);

var bubbleScene4 = d3.pack()
  .size([diameterScene4, diameterScene4])
  .padding(1.5)
  (d3.hierarchy({ children: aggregatedDataScene4 })
  .sum(function(d) { return d.population2016; }));

var svgScene4 = d3.select("#scene4")
  .append("svg")
  .attr("width", diameterScene4)
  .attr("height", diameterScene4)
  .attr("class", "bubble");

var nodeScene4 = svgScene4.selectAll(".node")
  .data(bubbleScene4.descendants())
  .enter()
  .filter(function(d) {
    return !d.children;
  })
  .append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

nodeScene4.append("title")
  .text(function(d) {
    return d.data.label + "\nPopulation in 1980: " + d.data.population1980 +
      "\nPopulation in 2016: " + d.data.population2016 +
      "\nPopulation Difference: " + (d.data.population2016 - d.data.population1980);
  });

nodeScene4.append("circle")
  .attr("r", function(d) {
    return d.r;
  })
  .style("fill", function(d,i) {
    return colorScene4(i);
  });

nodeScene4.append("text")
  .attr("dy", ".2em")
  .style("text-anchor", "middle")
  .text(function(d) {
    return d.data.label.substring(0, d.r / 3);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", function(d){
    return d.r / 5;
  })
  .attr("fill", "white");

nodeScene4.append("text")
  .attr("dy", "1.3em")
  .style("text-anchor", "middle")
  .text(function(d) {
    return "Population Diff: " + (d.data.population2016 - d.data.population1980);
  })
  .attr("font-family", "Gill Sans", "Gill Sans MT")
  .attr("font-size", function(d){
    return d.r / 5;
  })
  .attr("fill", "white");

d3.select(self.frameElement)
  .style("height", diameterScene4 + "px");
