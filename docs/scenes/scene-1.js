var datasetScene1 = [
    { label: "China", population: 1154605771 },
    { label: "India", population: 873277798 },
    { label: "United States", population: 252120309 },
    { label: "Indonesia", population: 199278123 },
    { label: "Brazil", population: 163963965 },
    { label: "Russia", population: 147433452 },
    { label: "Pakistan", population: 125169558 },
    { label: "Bangladesh", population: 113704579 },
    { label: "Japan", population: 123537000 },
    { label: "Nigeria", population: 88191351 },
    // Add more data points for 1990
  ];
  
  var diameter = 500;
  var color = d3.scaleOrdinal(d3.schemeCategory20);
  
  var bubble = d3.pack(datasetScene1)
    .size([diameter, diameter])
    .padding(1.5);
  
  var svg = d3.select("#scene1")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
  
  var nodes = d3.hierarchy({ children: datasetScene1 })
    .sum(function(d) { return d.population; });
  
  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
      return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  
  node.append("title")
    .text(function(d) {
      return d.data.label + ": " + d.data.population;
    });
  
  node.append("circle")
    .attr("r", function(d) {
      return d.r;
    })
    .style("fill", function(d,i) {
      return color(i);
    });
  
  node.append("text")
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
  
  node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.population;
    })
    .attr("font-family", "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
      return d.r / 5;
    })
    .attr("fill", "white");
  
  d3.select(self.frameElement)
    .style("height", diameter + "px");
  

    var maxPopulation = d3.max(datasetScene1, function(d) {
        return d.population;
      });
      
      // Find the country with the highest population
      var maxCountry = datasetScene1.find(function(d) {
        return d.population === maxPopulation;
      });
      
      // Add the annotation
      node.filter(function(d) {
        return d.data.label === maxCountry.label;
      }).append("text")
        .attr("dy", -15)
        .style("text-anchor", "middle")
        .text("Highest Population")
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
          return d.r / 5;
        })
        .attr("fill", "#FF0000"); 