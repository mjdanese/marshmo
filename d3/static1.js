const heightValue = 400;
const widthValue = 600;
const margin = {top: 30, right: 10, bottom: 30, left: 10}
const curveSmoothing = 1

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
length = 40

// X Scale
var x = d3.scaleLinear()
    .domain([0, length]) // input
    .range([margin.left, widthValue - margin.right]); // output
// Y Scale
var y = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([margin.top, heightValue - margin.bottom]); // output


function pushLines(l){
  d3.selectAll(".rangePath")
    .each(function(d,i){
      transF = d3.select(this)
        .attr("transform", "translate(0 "+ -l*5 +")")
    })
}

function createLine(l) {
// Initialize line
return svg
  .append('g')
  .append("path")
  .attr("class","rangePath")
  .datum(random1D(length))
  .style("fill", d3.rgb(l*14,500/l,255))
  .style("stroke", "black")
  .style("stroke-width", "0.5px")
  .attr("transform", "translate(0 0)")
  .transition()
  .on("start", function update(d,i) {
    d3.select(this)
      .datum(random1D(length))
      .transition()
      .delay(150)
      .duration(300)
      .attr("d", d3.line()
        .x(function(d,i) { return x(i) })
        .y(function(d,i) {

            distCenter = Math.abs(x(i) - (widthValue/2))
            varCenter = Math.max(((widthValue/2) - 120 - distCenter)/120,0.2)

            return (
              heightValue*(2/3)) // position at bottom
              + (l*10) + ( -7*varCenter*Math.sin(i/((length-1)/Math.PI))*(y(d)/20)  )
          })
        .curve(d3.curveBundle.beta(curveSmoothing)))
        .on("start", update)
  })

}


function removeLine(l) {

}

numLines = d3.range(0,13)
lines = []

iteration = {"i":4}
line = createLine(0);
line = createLine(1);
line = createLine(2);
line = createLine(3);
line = createLine(4);
pushLines(4)

// start
d3.select("#addButton").on("click", function() {
  if (iteration['i']<20){
    i = iteration['i']+=1
    createLine(i)
    pushLines(i)
    d3.select('#subButton').transition().duration(500).style("opacity",1)

  } else {
    d3.select(this).transition().duration(500).style("opacity",0)
  }
})

d3.select("#subButton").on("click", function() {
  if (iteration['i']>0){
    i = iteration['i']-=1
    pushLines(i)
    d3.select("g:last-child").remove()
    d3.select('#addButton').transition().duration(500).style("opacity",1)

  } else {
    d3.select(this).transition().duration(500).style("opacity",0)
  }
})
