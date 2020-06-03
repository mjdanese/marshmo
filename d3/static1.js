const heightValue = 400;
const widthValue = 600;
const margin = {top: 30, right: 10, bottom: 30, left: 10}

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
length = 20

// X Scale
var x = d3.scaleLinear()
    .domain([0, length]) // input
    .range([margin.left, widthValue - margin.right]); // output
// Y Scale
var y = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([margin.top, heightValue - margin.bottom]); // output

function createLine(i) {
// Initialize line
return svg
  .append('g')
  .append("path")
  .attr("class","rangePath")
  .datum(random1D(length))
  .attr("d", d3.line()
    .x(function(d,i) { return x(i) })
    .y(function(d,i) {
        return (heightValue-margin.bottom) // position at bottom
               + ( -1*Math.sin(i/((length-1)/Math.PI))*(y(d)/20)  )
      })
    .curve(d3.curveBasis))
  .style("fill", d3.rgb(255/i,i*20,255,0.95))
  .transition()
  .duration(0)

}

function startNoise(lines) {
  for (l = 0; l < numLines.length; l++) {

    line = lines[l];
    line
      .on("start", function update() {d3.select(this)
          .datum(random1D(length))
          .transition()
          .delay(400)
          .duration(600)
          .ease(d3.easeExpOut)
          .attr("d", d3.line()
              .x(function(d,i) { return x(i) })
              .y(function(d,i) {
                  return (heightValue-margin.bottom) // position at bottom
                         + ( -20*Math.sin(i/((length-1)/Math.PI))*(y(d)/20)  )
                })
              .curve(d3.curveBasis))
          .on("start", update)});
  }
}

function updateAmplitude(lines, amplitude) {
  console.log('hi')
  d3.selectAll("rangePath")
    .attr("fill", "black")
}

numLines = d3.range(0,14)
lines = []

for (i = 0; i < numLines.length; i++) {
  line = createLine(i);
  lines.push(line)
}

startNoise(lines=lines)

// start
d3.select("#amplitudeButton").on("click", function() {
  updateAmplitude(lines=lines, amplitude=40)
})
