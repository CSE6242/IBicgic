import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';

class MoveChart extends Component {
    constructor(props){
        super(props);
	this.id1 = props.id1;
	this.id2 = props.id2;
    }
    
    update(data) {
	if (data==undefined)
	    return;
	console.log(data);

	var dateFormatSpecifier = '%Y-%m-%d';
	var dateFormat = d3.timeFormat(dateFormatSpecifier);
	var dateFormatParser = d3.timeParse(dateFormatSpecifier);
	data.forEach(function (d) {
            d.dd = dateFormatParser(d.datedata);
            d.day = d3.timeDay(d.dd);
	});

	var ndx = crossfilter(data);
	var all = ndx.groupAll();

	console.log(this.id1+"---"+this.id2);
	let moveChart =   dc.barChart(this.id1);
	let volumeChart = dc.lineChart(this.id2);
	var moveDay = ndx.dimension(function (d) {
            return d.day;
	});
	var volumeByDayGroup = moveDay.group().reduceSum(function (d) {
            return d.count;
	});

	moveChart
            .width(990)
            .height(200)
            .transitionDuration(200)
            .margins({top: 30, right: 50, bottom: 25, left: 40})
            .dimension(moveDay)
            .mouseZoomable(true)
            .rangeChart(volumeChart)
            .x(d3.scaleTime().domain([new Date(2016, 10, 1), new Date(2017, 3, 31)]))
            .round(d3.timeDay.round)
            .xUnits(d3.timeDay)
            .elasticY(true)
            .renderHorizontalGridLines(true)
            .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
            .brushOn(false)
            .group(volumeByDayGroup, '# rides')
	;

	volumeChart.width(990)
	    .renderArea(true)
            .height(40)
            .margins({top: 0, right: 50, bottom: 20, left: 40})
            .dimension(moveDay)
            .group(volumeByDayGroup)
            .mouseZoomable(true)//        .centerBar(true)
             // .gap(1)
            .x(d3.scaleTime().domain([new Date(2016, 10, 1), new Date(2017, 3, 31)]))
            .round(d3.timeDay.round)
            //.alwaysUseRounding(true)
            .xUnits(d3.timeDay);

	dc.renderAll();

    }
    render(){
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }

}

export default MoveChart;