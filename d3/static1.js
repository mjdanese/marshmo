const heightValue = 400;
const widthValue = 600;
const margin = {top: 20, right: 10, bottom: 20, left: 10}

// Create SVG and padding for the chart
const svg = d3
  .select("#static1")
  .append("svg")
  .attr("viewBox", `0 0 ${widthValue} ${heightValue}`)

// Function to randomize data
function random1D(len) {
  data=[];

  d3.range(len).map(function(){
    data.push(Math.random())
  });

  return data;
}

// Initialize at set length
length = 50
data = random1D(length)
console.log(data)

// X Scale
var x = d3.scaleLinear()
    .domain([0, length]) // input
    .range([margin.left, widthValue - margin.right]); // output
// Y Scale
var y = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([margin.top, heightValue - margin.bottom]); // output

// Define the line
var valueline = d3.line()
  .x(function(d,i) { return x(i) })
  .y(function(d) { return y(d) })
  .curve(d3.curveMonotoneX);

// Define update
function update() {
  d3.select("#staticPath1")
    .transition()
    .delay(100)
    .ease(d3.easeExpOut)
    .duration(1000)
    .attr("d", valueline(random1D(length)))
    .on("start", update)
}

// Initialize line
line = svg
  .append('g')
  .append("path")
  .attr("id","staticPath1")
  .datum(data)
  .attr("d", d3.line()
    .x(function(d,i) { return x(i) })
    .y(heightValue/2)
    .curve(d3.curveMonotoneX)
  )
  .attr("stroke", "black")
  .style("stroke-width", 2)
  .style("fill", "none")
  .transition()
  .duration(1000)
  .ease(d3.easeExpOut)
  .attr("d", valueline)
  .on("start", update())
