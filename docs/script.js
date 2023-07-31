// Static data for demonstration
const data = [
  { year: 2000, country: 'USA', population: 282162411 },
  { year: 2000, country: 'China', population: 1272915272 },
  { year: 2000, country: 'India', population: 1053050910 },
  { year: 2010, country: 'USA', population: 309011469 },
  { year: 2010, country: 'China', population: 1347350000 },
  { year: 2010, country: 'India', population: 1230984504 },
  { year: 2020, country: 'USA', population: 331002651 },
  { year: 2020, country: 'China', population: 1439323776 },
  { year: 2020, country: 'India', population: 1366417754 },
  // Add more data for other countries and years
];

// Extract unique countries from the data
const countries = [...new Set(data.map(d => d.country))];

// Global variables for controlling the slideshow
let currentCountryIndex = 0;

// Function to render the chart for a specific country
function renderCountryChart(country) {
  // Filter data for the selected country
  const countryData = data.filter(d => d.country === country);

  // Clear previous visualization, if any
  d3.select('#visualization-container').html('');

  // Set up chart dimensions
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select('#visualization-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define scales
  const xScale = d3.scaleBand()
    .domain(countryData.map(d => d.year))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(countryData, d => d.population)])
    .range([height, 0]);

  // Draw bars
  svg.selectAll('.bar')
    .data(countryData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.year))
    .attr('y', d => yScale(d.population))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.population))
    .attr('fill', 'steelblue');

  // Add axis labels
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .text(`Population Trend in ${country}`);
}

// Function to handle navigation to the next country
function goToNextCountry() {
  currentCountryIndex += 1;
  if (currentCountryIndex >= countries.length) {
    currentCountryIndex = countries.length - 1;
  }
  const currentCountry = countries[currentCountryIndex];
  renderCountryChart(currentCountry);
}

// Function to handle navigation to the previous country
function goToPrevCountry() {
  currentCountryIndex -= 1;
  if (currentCountryIndex < 0) {
    currentCountryIndex = 0;
  }
  const currentCountry = countries[currentCountryIndex];
  renderCountryChart(currentCountry);
}

// Add event listeners to the buttons
d3.select('#next-btn').on('click', goToNextCountry);
d3.select('#prev-btn').on('click', goToPrevCountry);

// Call the function to render the initial chart for the first country
const initialCountry = countries[currentCountryIndex];
renderCountryChart(initialCountry);
