import { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';

class BrushChart extends Component {

    createChart() {
        let chart = dc.barChart('.brush-chart');
        let ndx = crossfilter(this.props.data);
        let dimension = ndx.dimension((d) => { return +d.datedata; });
        let date_group = dimension.group().reduceSum(function(d) {return d["count"];});
        chart.width(760)
            .height(480)
            .x(d3.scaleLinear().domain([1, 31]))
            .brushOn(false)
            .dimension(dimension)
            .group(date_group);
        chart.render();
    }

    componentDidMount() {
        this.createChart();
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
        let ndx = crossfilter(this.props.data);
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

    render() {
	console.log("rendering");
	this.update(this.props.data);
	return null;
    }
}

export default BrushChart;
