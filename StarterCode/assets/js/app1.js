//Student Jorge Alberto Muñozcano Castro
//D3 Challenge
//1)Define svg margins for the graph
var svgWidth = 1000;
var svgHeight = 600;
var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
};
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;
// 2) Create an svg variable, append an SVG into the index so it can hold the chart 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
//3) Create a second variable that, so it can append it int a left top margin
var ResearchChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
// 4) Use d3 to Import data from the data csv file, and parse the instructions into the function
d3.csv("assets/data/data.csv")
    .then(function(researchdata) {
    researchdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
//5) Established x and y into linear scale functions.
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(researchdata, d => d.poverty)])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(researchdata, d => d.healthcare)])
        .range([height, 0]);
// 6) Established axis functions using the linear variables created before.
    var BAxis = d3.axisBottom(xLinearScale);
    var LAxis = d3.axisLeft(yLinearScale);
    ResearchChart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(BAxis);
    ResearchChart.append("g")
        .call(LAxis);
// 7) Create a variable that extract the states data into the chart in circles.
    var stategroup = ResearchChart.selectAll("circle")
        .data(researchdata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".4");
//8) Create variable that helps fill the circles with State Abreviation.
    var statetext = ResearchChart.selectAll()
        .data(researchdata)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .text(d => (d.abbr));
// 9) Initialize tool tip with all the previouse data.
    var ToolTip = d3.select("scatter")
        .append("div")
        .attr("class", "tooltip")
        .style("color", "white")
        .html(function(d) {
            return (`${d.state}<hr>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`)
        });
//10) Use a "mouseover" event to display tool tip.
    stategroup.on("mouseover", function(d) {
        ToolTip.style("fill", "green")
    })
//12) Use a "mouseout" event to stop displaying tool tip.   
        //.on("mouseout", function() {
            //toolTip.style("display", "none");
        //});        
//13) Create  your axes labels.
    ResearchChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare(%)");
    ResearchChart.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("class", "axisText")
        .text("In Poverty(%)");
    });






















































































































































































































































































































































