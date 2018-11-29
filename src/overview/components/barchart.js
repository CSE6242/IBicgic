import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';

class BarChart extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }
    
    update(data) {
	if (data==undefined)
	    return;
	console.log(data);
        let chart = dc.barChart(this.id);
	var dateFormatSpecifier = '%Y-%m-%d';
	var dateFormat = d3.timeFormat(dateFormatSpecifier);
	var dateFormatParser = d3.timeParse(dateFormatSpecifier);
	data.forEach(function (d) {
            d.dd = dateFormatParser(d.datedata);
            d.day = d3.timeDay(d.dd);
	});

	var ndx                 = crossfilter(data),
	    runDimension        = ndx.dimension(function(d) {return +d.gender;}),
	    speedSumGroup       = runDimension.group().reduceSum(function(d) {return d.sumtrip;});
	chart
	    .width(768)
	    .height(480)
        //.x(d3.scaleLinear().domain(d3.extent(data.map(function(d){return d.gender;}))))
	    .x(d3.scaleLinear().domain([1,3]))
	    .brushOn(false)
	    .yAxisLabel("This is the Y Axis!")
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .on('renderlet', function(chart) {
		chart.selectAll('rect').on("click", function(d) {
		    console.log("click!", d);
		});
	    });
	chart.render();
    }
    render(){
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }

}


export class RowChart extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }
    
    update(data) {
	if (data==undefined)
	    return;
	console.log(data);
        let chart = dc.rowChart(this.id);
	var dateFormatSpecifier = '%Y-%m-%d';
	var dateFormat = d3.timeFormat(dateFormatSpecifier);
	var dateFormatParser = d3.timeParse(dateFormatSpecifier);
	data.forEach(function (d) {
            d.dd = dateFormatParser(d.datedata);
            d.day = d3.timeDay(d.dd);
	});

	var ndx                 = crossfilter(data),
	    runDimension        = ndx.dimension(function(d) {return +d.gender;}),
	    speedSumGroup       = runDimension.group().reduceSum(function(d) {return d.sumtrip;});
	chart
	    .width(768)
	    .height(480)
        //.x(d3.scaleLinear().domain(d3.extent(data.map(function(d){return d.gender;}))))
	    .x(d3.scaleLinear().domain([1,3]))
	    .elasticX(true)
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .on('renderlet', function(chart) {
		chart.selectAll('rect').on("click", function(d) {
		    console.log("click!", d);
		});
	    });
	chart.render();
    }
    render(){
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }

}

export default BarChart;