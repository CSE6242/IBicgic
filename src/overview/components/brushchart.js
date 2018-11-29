import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';


class BrushChart extends Component {

    constructor(props) {
	super(props);
    }
    update(data) {
	console.log("Updated");

	var dateFormatSpecifier = '%Y-%m-%d';
	var dateFormat = d3.timeFormat(dateFormatSpecifier);
	var dateFormatParser = d3.timeParse(dateFormatSpecifier);
	data.forEach(function (d) {
            d.dd = dateFormatParser(d.datedata);
	});
	console.log(data);	
        let chart = dc.barChart('.brush-chart');
        let ndx = crossfilter(data);
        let dimension = ndx.dimension((d) => { return d.dd; });
        let date_group = dimension.group().reduceSum(function(d) {return d["count"];});
        chart.width(760)
            .height(480)
            .x(d3.scaleTime().domain(d3.extent(data.map(function(d){return d.dd;}))))
            .brushOn(true)
            .dimension(dimension)
            .group(date_group);
        chart.render();
    }
    render () {
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }
}

export default BrushChart;
