import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';

export class PieChartUrl extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
	this.config = props.config;
	if (!this.config.slicesCap)
	    this.config.slicesCap = 20;
    }

    update(data)
    {
	if (data === undefined) return;
	console.log("this.id is " + this.id);
	console.log(data);
	let chart = dc.pieChart(this.id);
	let ndx = crossfilter(data);
	let config = this.config;
	let runDimension  = ndx.dimension(config.key);
	let speedSumGroup = runDimension.group().reduceSum(config.value);
	let f = config.key_text_modifier;
	if (f === undefined) f = function(i){return i;};
	chart
	    .width(768)
	    .height(480)
	    .slicesCap(config.slicesCap)
	    .innerRadius(100)
	    .emptyTitle("empty")
	    .dimension(runDimension)
	    .group(speedSumGroup)
	    .legend(dc.legend())
	    .on('pretransition', function(chart) {
	    	chart.selectAll('text.pie-slice').text(function(d) {
		    console.log("click!", d, "my id is ", this.id);
		    return f(d.data.key) + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
	    	});
	    })
	;
	chart.render();
    }

    render () {
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }
}

// export class PieChartUrl extends Component {
//     constructor(props){
//         super(props);
// 	this.id = props.id;
// 	this.config = props.config;
// 	if (!this.config.slicesCap)
// 	    this.config.slicesCap = 20;
// 	this.state = {};
//     }

//     update (d) {
// 	this.setState({data:d});
//     }

//     render () {
// 	axios.get(this.props.dataurl).then((res)=>{
// 	    this.update(res.data);
// 	});
// 	return (<PieChartUrlReal id={this.id} data={this.state.data} config={this.config}/>);
//     }    
// }

export default PieChartUrl;
