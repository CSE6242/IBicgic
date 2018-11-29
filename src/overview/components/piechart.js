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
	    .attr("height", height + margin.top + margin.bottom);

	svg.append("g").attr("class","piehere")
	    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	let dataset = this.props.data;
	// 2. Use the margin convention practice 
	// The number of datapoints
	let n = dataset.length;

	this.update(this.props.data);
    }

    update(data)
    {
	let color = d3.scaleOrdinal(d3.schemeCategory10);
        let arc = d3.arc().outerRadius(100).innerRadius(0);
        let pie = d3.pie().sort(null);
	let chart = d3.select(".piehere");
        let update = chart.selectAll('.arc').data(pie(data));
	console.log(data);
        update.enter().append('path')
              .attr('class', 'arc')
              .attr('d', arc)
              .attr("fill", (d, i) => {
                return color(i + 1 + "");
              })
              .each((d) => { this._current = d; });
        update.transition().duration(500)
              .attrTween('d', (d) => {
                  let a = d3.interpolate(this._current, d);
                  this._current = a(0);
                  return (t) => {
                      return arc(a(t));
                  };
              });
        update.exit().remove();

	let sum=0;
	for (var i = 0; i < data.length; sum += data[i++]);
	let normalized_data = data.map(v => Math.round(v*100 / sum));
        let texts = chart.selectAll('text').data(pie(normalized_data));
        texts.exit().remove();
        texts.enter().append('text')
                     .text(d => Math.round(d.value) + '%')
                     .attr('fill', '#eee')
                     .attr('transform', d => `translate(${arc.centroid(d)})`)
                     .style('text-anchor', 'end');
        texts.transition().duration(500).text(d => Math.round(d.value) + '%').attr('transform', d => `translate(${arc.centroid(d)})`).style('text-anchor', 'end');;
    }
    
    render () {
	this.update(this.props.data);
	return null;
    }
}

export default PieChart;