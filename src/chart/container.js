import React, { Component } from 'react';
import * as d3 from 'd3';

import './container.scss';

class BarChartContainer extends Component {

    constructor(props) {
	super (props);
    }

    componentDidMount() {
	d3.select("body").append("svg").attr("width","960").attr("height","500");
	var svg = d3.select("svg"),
	    margin = {top: 20, right: 20, bottom: 110, left: 40},
	    margin2 = {top: 430, right: 20, bottom: 30, left: 40},
	    width = +svg.attr("width") - margin.left - margin.right,
	    height = +svg.attr("height") - margin.top - margin.bottom,
	    height2 = +svg.attr("height") - margin2.top - margin2.bottom;

	var x = d3.scaleTime().range([0, width]),
	    x2 = d3.scaleTime().range([0, width]),
	    y = d3.scaleLinear().range([height, 0]),
	    y2 = d3.scaleLinear().range([height2, 0]);

	var xAxis = d3.axisBottom(x),
	    xAxis2 = d3.axisBottom(x2),
	    yAxis = d3.axisLeft(y);

	var parseDate = d3.timeParse("%b %Y");

	var brush = d3.brushX()
	    .extent([[0, 0], [width, height2]])
	    .on("brush end", brushed);

	var zoom = d3.zoom()
	    .scaleExtent([1, Infinity])
	    .translateExtent([[0, 0], [width, height]])
	    .extent([[0, 0], [width, height]])
	    .on("zoom", zoomed);

	this.area = d3.area()
	    .curve(d3.curveMonotoneX)
	    .x(function(d) { return x(d.date); })
	    .y0(height)
	    .y1(function(d) { return y(d.price); });

	let area = this.area;
	var area2 = d3.area()
	    .curve(d3.curveMonotoneX)
	    .x(function(d) { return x2(d.date); })
	    .y0(height2)
	    .y1(function(d) { return y2(d.price); });

	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	    .append("rect")
	    .attr("width", width)
	    .attr("height", height);

	this.focus = svg.append("g")
	    .attr("class", "focus")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	let focus = this.focus;
	var context = svg.append("g")
	    .attr("class", "context")
	    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

	let parsed_data = d3.csvParse(this.props.data, function (d) { d.date = parseDate(d.date); d.price = +d.price; return d; });
	function brushed() {
	    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
	    var s = d3.event.selection || x2.range();
	    x.domain(s.map(x2.invert, x2));
	    focus.select(".area").attr("d", area);
	    focus.select(".axis--x").call(xAxis);
	    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
				     .scale(width / (s[1] - s[0]))
				     .translate(-s[0], 0));
	}

	function zoomed() {
	    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
	    var t = d3.event.transform;
	    x.domain(t.rescaleX(x2).domain());
	    focus.select(".area").attr("d", area);
	    focus.select(".axis--x").call(xAxis);
	    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
	}

	function f(data) {
	    console.log("tt");
	    console.log(data);
	    x.domain(d3.extent(data, function(d) { return d.date; }));
	    y.domain([0, d3.max(data, function(d) { return d.price; })]);
	    x2.domain(x.domain());
	    y2.domain(y.domain());

	    focus.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

	    focus.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	    focus.append("g")
		.attr("class", "axis axis--y")
		.call(yAxis);

	    context.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area2);

	    context.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxis2);

	    context.append("g")
		.attr("class", "brush")
		.call(brush)
		.call(brush.move, x.range());

	    svg.append("rect")
		.attr("class", "zoom")
		.attr("width", width)
		.attr("height", height)
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(zoom);
	};

	f(parsed_data);

    }
    
    render() {
	if (this.focus !== undefined)
	{
	    let parsed_data = d3.csvParse(this.props.data, function (d) { d.date = d3.timeParse("%b %Y")(d.date); d.price = +d.price; return d; });
	    console.log(parsed_data);
	    this.focus.select("path")
		.datum(parsed_data)
		.attr("class", "area")
		.attr("d", this.area);

  	    this.focus.select("path").datum(this.props.data);
	}
	console.log("yyy");
        return (
            <div>Hello world chart !!</div>
        );
    }
}

class ChartContainer extends Component {

    constructor(props) {
	super (props);
	let origin_data = "date,price\nJan 2000,1394.46\nFeb 2000,1366.42\nMar 2000,1498.58\nApr 2000,1452.43\nMay 2000,1420.6\nJun 2000,1454.6\nJul 2000,1430.83\nAug 2000,1517.68\nSep 2000,1436.51\nOct 2000,1429.4\nNov 2000,1314.95\nDec 2000,1320.28\nJan 2001,1366.01\nFeb 2001,1239.94\nMar 2001,1160.33\nApr 2001,1249.46\nMay 2001,1255.82\nJun 2001,1224.38\nJul 2001,1211.23\nAug 2001,1133.58\nSep 2001,1040.94\nOct 2001,1059.78\nNov 2001,1139.45\nDec 2001,1148.08\nJan 2002,1130.2\nFeb 2002,1106.73\nMar 2002,1147.39\nApr 2002,1076.92\nMay 2002,1067.14\nJun 2002,989.82\nJul 2002,911.62\nAug 2002,916.07\nSep 2002,815.28\nOct 2002,885.76\nNov 2002,936.31\nDec 2002,879.82\nJan 2003,855.7\nFeb 2003,841.15\nMar 2003,848.18\nApr 2003,916.92\nMay 2003,963.59\nJun 2003,974.5\nJul 2003,990.31\nAug 2003,1008.01\nSep 2003,995.97\nOct 2003,1050.71\nNov 2003,1058.2\nDec 2003,1111.92\nJan 2004,1131.13\nFeb 2004,1144.94\nMar 2004,1126.21\nApr 2004,1107.3\nMay 2004,1120.68\nJun 2004,1140.84\nJul 2004,1101.72\nAug 2004,1104.24\nSep 2004,1114.58\nOct 2004,1130.2\nNov 2004,1173.82\nDec 2004,1211.92\nJan 2005,1181.27\nFeb 2005,1203.6\nMar 2005,1180.59\nApr 2005,1156.85\nMay 2005,1191.5\nJun 2005,1191.33\nJul 2005,1234.18\nAug 2005,1220.33\nSep 2005,1228.81\nOct 2005,1207.01\nNov 2005,1249.48\nDec 2005,1248.29\nJan 2006,1280.08\nFeb 2006,1280.66\nMar 2006,1294.87\nApr 2006,1310.61\nMay 2006,1270.09\nJun 2006,1270.2\nJul 2006,1276.66\nAug 2006,1303.82\nSep 2006,1335.85\nOct 2006,1377.94\nNov 2006,1400.63\nDec 2006,1418.3\nJan 2007,1438.24\nFeb 2007,1406.82\nMar 2007,1420.86\nApr 2007,1482.37\nMay 2007,1530.62\nJun 2007,1503.35\nJul 2007,1455.27\nAug 2007,1473.99\nSep 2007,1526.75\nOct 2007,1549.38\nNov 2007,1481.14\nDec 2007,1468.36\nJan 2008,1378.55\nFeb 2008,1330.63\nMar 2008,1322.7\nApr 2008,1385.59\nMay 2008,1400.38\nJun 2008,1280\nJul 2008,1267.38\nAug 2008,1282.83\nSep 2008,1166.36\nOct 2008,968.75\nNov 2008,896.24\nDec 2008,903.25\nJan 2009,825.88\nFeb 2009,735.09\nMar 2009,797.87\nApr 2009,872.81\nMay 2009,919.14\nJun 2009,919.32\nJul 2009,987.48\nAug 2009,1020.62\nSep 2009,1057.08\nOct 2009,1036.19\nNov 2009,1095.63\nDec 2009,1115.1\nJan 2010,1073.87\nFeb 2010,1104.49\nMar 2010,1140.45\n";
	this.state = {
	    date: new Date(),
	    data: origin_data,
	    origin_data: origin_data};
    }

    componentDidMount() {
	this.timerID = setInterval(
	    () => this.tick(),
	    2000
	);
    }
    
    tick() {
	this.setState(state => {return {
	    date: new Date(),
	    data: state.origin_data.split('\n').slice(0, Math.floor(Math.random()*123)).join("\n")
	};});
	
    }
    componentWillUnmount() {
	clearInterval(this.timerID);
    }

    render() {
        return (
            <div>Hello world chart !!
              <BarChartContainer data={this.state.data}/>
              It is now {this.state.date.toLocaleTimeString()}.
            </div>
        );
    }
}

export default ChartContainer;

/*

*/