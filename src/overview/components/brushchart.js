import React, { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';

class BrushChart extends Component {

    createChart() {
        let chart = dc.barChart('.brush-chart');
        let ndx = crossfilter(this.props.data);
        let dimension = ndx.dimension((d) => { return +d.Run });
        let date_group = dimension.group().reduceSum(function(d) {return d.Speed});
        chart.width(760)
            .height(480)
            .x(d3.scaleLinear().domain([1, 10]))
            .brushOn(false)
            .dimension(dimension)
            .group(date_group);
        chart.render();

    }

    componentDidMount() {
        this.createChart();
    }

    render() {
        return (
            <div className='brush-chart'>
            </div>
        )
    }
}

export default BrushChart;
