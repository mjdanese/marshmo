const heightValue = 600;
const widthValue = 600;
const margin = {top: 30, right: 10, bottom: 30, left: 10}
const curveSmoothing = 1
const maxLines = 30
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
// C Scale
var c = d3.scaleLinear()
    .domain([0,maxLines-2])
    .range([d3.rgb(255,0,255),d3.rgb(0,255,255)])
// line Scale for transition length
var lineScale = d3.scaleLinear()
    .domain([0,maxLines])
    .range([300,1000])


function pushLines(l){
  d3.selectAll(".rangePath")
    .each(function(d,i){
      transF = d3.select(this)
        .attr("transform", "translate(0 "+ -l*3 +")")
    })
}

function createLine(l) {
// Initialize line
return svg
  .append('g')
  .append("path")
  .attr("class","rangePath")
  .datum(random1D(length))
  .style("fill", function(d,i){ return c(l); })
  .style("stroke", "black")
  .style("stroke-width", "0.04px")
  .style("opacity", 0)
  .transition()
  .on("start", function update(d,i) {
    d3.select(this)
      .datum(random1D(length))
      .transition()
      .delay(function(d,i){ return lineScale(l) })
      .duration(function(d,i){ return lineScale(l) })
      .style("opacity", 1)
      .attr("d", d3.line()
        .x(function(d,i) { return x(i) })
        .y(function(d,i) {

            distCenter = Math.abs(x(i) - (widthValue/2))
            varCenter = Math.max(((widthValue/2) - 150*(l/(maxLines*(3/4))) - distCenter)/150,0.2)

            return (
              heightValue*(1/2)) // position at bottom
              + (l*12) + ( -4*varCenter*Math.sin(i/((length-1)/Math.PI))*(y(d)/20) )
          })
        .curve(d3.curveBundle.beta(curveSmoothing)))
        .on("start", update)
  })

}

initialLoops = d3.range(0,23)
for (i=0; i<initialLoops.length; i++){

createLine(i)

}

iteration = {"i":22}
pushLines(22)

// start
d3.select("#addButton").on("click", function() {
  if (iteration['i']<maxLines){
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
