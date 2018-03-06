$('#button2').hide();
var margin = { top: 50, right: 300, bottom: 50, left: 75 },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;
/*
//slider 
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
var value = slider.value;
// Update the current slider value (each time you drag the slider handle)
// jquery
*/
var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "full_time_enrollment",
     yCat = "tuition",
     rCat = "endowment_per_FTE",
     colorCat = "name";
    
/*
d3.json("data_main.json", function(data) {
  data.forEach(function(d) {
    d.full_time_enrollment = +d.full_time_enrollment;
    d.tuition = +d.tuition;
    d.endowment_per_FTE = +d.endowment_per_FTE;
  });
  */
  


  var xMax = d3.max(data, function(d) { return d[xCat]; }),
      xMin = d3.min(data, function(d) { return d[xCat]; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }),
      yMin = d3.min(data, function(d) { return d[yCat]; }),
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);
console.log(data);
console.log(xMax);
// test
/*
var d1=data;
console.log(d1[20]);
console.log(d1[23].tuition);
var result = [];

  for (var key in data) {
       if (data.hasOwnProperty(key)) {
            if ((d1[key].tuition) >= 35000) {
            result.push(d1[key]);
        }

          }
    }
console.log(result);
*/
//test end
var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();
/*jquery slider
var svg = d3.select('#root').append('svg')
.attr('width', 400)
.attr('height', 400);

var circ = svg.append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 20);

function fillCircle(red) {
  circ.style("fill", d3.rgb(red, 0, 0));
}

// Initial values on page load
fillCircle(100);

var sliderScale = d3.scale.linear()
  .domain([0, 255]) // Red component goes from 0 to 255
  .range([0, 200]) // Width of slider is 200 px
  .clamp(true);

var slider = svg.append("g")
  .attr("class", "slider")
  .attr("transform", "translate(" + 13 + "," + 200 + ")");

slider.append("line")
  .attr("class", "track")
  .attr("x1", sliderScale.range()[0])
  .attr("x2", sliderScale.range()[1])
  .select(function() {
    return this.parentNode;
  })
  .append("line")
  .attr("x1", sliderScale.range()[0])
  .attr("x2", sliderScale.range()[1])
  .attr("class", "track-inset")
  .select(function() {
    return this.parentNode;
  })
  .append("line")
  .attr("x1", sliderScale.range()[0])
  .attr("x2", sliderScale.range()[1])
  .attr("class", "track-overlay")
  .call(d3.drag()
    .on("start.interrupt", function() {
      slider.interrupt();
    })
    .on("start.drag", function() {
      changeRed(sliderScale.invert(d3.event.x));
    }));

var handle = slider.insert("circle", ".track-overlay")
  .attr("class", "handle")
  .attr("r", 9);

function changeRed(h) {
  handle.attr("cx", sliderScale(h));
  fillCircle(h);
}
*/
//ends
  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat] +"<br>" + rCat + ": " + d[rCat] + "<br>" + colorCat + ": " + d[colorCat] + "<br>"  ;
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      .attr("r", function (d) { return Math.sqrt(d[rCat] / 3000); })
      .attr("transform", transform)
      .style("fill", function(d) { return color(d[rCat]); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

/*
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .classed("legend", true)
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("circle")
      .attr("r", 3.5)
      .attr("cx", width + 20)
      .attr("fill", color);

  legend.append("text")
      .attr("x", width + 26)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
*/
  d3.select("input").on("click", change);

  function change() {
    xCat = "applicants_total";
    xMax = d3.max(data, function(d) { return d[xCat]; });
    xMin = d3.min(data, function(d) { return d[xCat]; });

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg = d3.select("#scatter").transition();

    svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);
	
    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
  }

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  $("#button").click(function(){
	$('#header').html('The plot for <i>Tuition</i> versus <i>Applicants Total</i> with <i>Endownment per FTE</i> as the circle radius');   
	$('#button').hide();
	$('#button2').show();
  });
  
  $('#button2').click(function(){
	  location.reload();
  });
  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
  
  
//});
