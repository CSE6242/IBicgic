import React, { Component } from 'react';
import * as d3 from 'd3';

export class PieChart extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

	// 1. Add the SVG to the page and employ #2
	var svg = d3.select("body").append("svg").attr("class","piechartsvg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let dataset = this.props.data;
	// 2. Use the margin convention practice 
	// The number of datapoints
	let n = dataset.length;

	// 5. X scale will use the index of our data
	svg.append("g").attr("class", "xaxis");
	svg.append("g").attr("class", "yaxis");
	svg.append("path").attr("class","path").attr("style", "fill:none;stroke:red");

	this.update(this.props.data);
    }

    update(data)
    {
	let n = data.length;

	var margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

	let svg = d3.select(".piechartsvg");

	var xScale = d3.scaleLinear()
	    .domain([0, n-1]) // input
	    .range([0, width]); // output

	// 6. Y scale will use the randomly generate number 
	var yScale = d3.scaleLinear()
	    .domain([0, 1]) // input 
	    .range([height, 0]); // output 

	// 7. d3's line generator
	var line = d3.line()
	    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
	    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
	    .curve(d3.curveMonotoneX); // apply smoothing to the line

	let xaxis = d3.select(".xaxis");
	xaxis.attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

	let yaxis = d3.select(".yaxis");
	yaxis.call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

	let path = d3.selectAll(".path").data([data]); // 10. Binds data to the line
	path.enter().append("path")
	    .attr("class", "path") // Assign a class for styling
	    .attr("d", line); // 11. Calls the line generator 
	path.transition().attr("d", line); // 11. Calls the line generator
	path.exit().remove();

	// 12. Appends a circle for each datapoint 
	let dots = svg.selectAll(".dot")
	    .data(data);
	dots
	    .enter().append("circle") // Uses the enter().append() method
	    .attr("class", "dot") // Assign a class for styling
	    .attr("cx", function(d, i) { return xScale(i) + margin.left; })
	    .attr("cy", function(d) { return yScale(d.y) + margin.left;})
	    .attr("r", 5);
	dots.transition()
	    .attr("cx", function(d, i) { return xScale(i) + margin.left; })
	    .attr("cy", function(d) { return yScale(d.y) + margin.top; });
	dots.exit().remove();

    }
    
    render () {
	this.update(this.props.data);
	return null;
    }
}

export default PieChart;