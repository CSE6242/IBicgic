import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';

export class PieChart extends Component {

    constructor(props){
        super(props);
	this.id = props.id;
    }

    update(data)
    {
	let chart = dc.pieChart(this.id);
	let ndx = crossfilter(this.props.data);
	let runDimension  = ndx.dimension(function(d) {return d.userType;});
	let speedSumGroup = runDimension.group().reduceSum(function(d) {return d["sum(tripDuration)"];});

	chart
	    .width(768)
	    .height(480)
	    .slicesCap(4)
	    .innerRadius(100)
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .legend(dc.legend())
	    .on('pretransition', function(chart) {
		chart.selectAll('text.pie-slice').text(function(d) {
		    return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
		});
	    });
	chart.render();
    }
    
    render () {
	this.update(this.props.data);
	return null;
    }
}

export class PieChartUrlUserType extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }

    update(data)
    {
	console.log("this.id is " + this.id);
	console.log(data);
	let chart = dc.pieChart(this.id);
	let ndx = crossfilter(data);
	let runDimension  = ndx.dimension(function(d) {return d.userType;});
	let speedSumGroup = runDimension.group().reduceSum(function(d) {return d["sumtrip"];});

	chart
	    .width(768)
	    .height(480)
	    .slicesCap(6)
	    .innerRadius(100)
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .legend(dc.legend())
	    .on('pretransition', function(chart) {
		chart.selectAll('text.pie-slice').text(function(d) {
		    return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
		});
	    });
	chart.render();
    }

    render () {
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }    
}

export class PieChartUrlUserAge extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }

    update(data)
    {
	console.log("this.id is " + this.id);
	console.log(data);
	let chart = dc.pieChart(this.id);
	let ndx = crossfilter(data);
	let runDimension  = ndx.dimension(function(d) {return d.age;});
	let speedSumGroup = runDimension.group().reduceSum(function(d) {return d["countUTP"];});

	chart
	    .width(768)
	    .height(480)
	    .slicesCap(10)
	    .innerRadius(100)
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .legend(dc.legend())
	    .on('pretransition', function(chart) {
		chart.selectAll('text.pie-slice').text(function(d) {
		    return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
		});
	    });
	chart.render();
    }

    render () {
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }    
}

export class PieChartUrlUserGender extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }

    update(data)
    {
	console.log("this.id is " + this.id);
	console.log(data);
	let chart = dc.pieChart(this.id);
	let ndx = crossfilter(data);
	let runDimension  = ndx.dimension(function(d) {return d.gender===1?"Male":"Female";});
	let speedSumGroup = runDimension.group().reduceSum(function(d) {return d["sumtrip"];});

	chart
	    .width(768)
	    .height(480)
	    .slicesCap(10)
	    .innerRadius(100)
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .legend(dc.legend())
	    .on('pretransition', function(chart) {
		chart.selectAll('text.pie-slice').text(function(d) {
		    return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
		});
	    });
	chart.render();
    }

    render () {
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }    
}



export default PieChart;
