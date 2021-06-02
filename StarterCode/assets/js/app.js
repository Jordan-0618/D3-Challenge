// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 700;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create svg wrapper

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append svg group that holds chart and sets margins

var chartGroup = svg.append("g")
    .attr("transfrom", `translate(${margin.left}, ${margin.top})`);

//read csv

d3.csv("assets/data/data.csv").then(function(censusData) {
    console.log(censusData);

    //Parse data

    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log(data);
    });

    // create scale function

    const xScale = d3.scaleLinear()
        .domain([8, d3.max(censusData, d => d.poverty)])
        .range([0, width])
        .nice();

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.healthcare)])
        .range([height, 0])
        .nice();

    // axes functions

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    //append axes to chart 

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis)

    //create scatterplot and circles

    chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "12")
        .attr("stroke-width", "1")
        .classed("stateCircle", true)
        .attr("opacity", 0.5);

    // add circle text

    chartGroup.append("g")
        .selectAll("text")
        .data(censusData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .classed(".stateText", true)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "12px")
        .style("font-weight", "bold")
        .attr("alignment-baseline", "central");

    //add axes labels

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 14})`)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .style("font-weight", "bold")
        .text("In Poverty (%)");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("class", "axisText")
        .attr("fill", "black")
        .attr("font-size", "14px")
        .style("font-weight", "bold")
        .text("Lacks Healthcare (%)");



}).catch(function (error) {
    console.log(error);
});