import React, { Component } from 'react';
import * as d3 from 'd3';


import { PieChart } from './components/piechart.js';
import './container.scss';

class ChartContainer extends Component {

    constructor(props) {
	super (props);
	this.state = {data: d3.range(20).map(function(d) { return {"y": d3.randomUniform(1)() }; })};
    }

    componentDidMount() {
	this.timerID = setInterval(
	    () => this.tick(),
	    5000
	);
    }

    tick() {
	this.setState({data: d3.range(20).map(function(d) { return {"y": d3.randomUniform(1)() }; })});
    }

    componentWillUnmount() {
	clearInterval(this.timerID);
    }

    render() {
        return (
            <div>Hello world chart !!
              <PieChart data={this.state.data}/>
            </div>
        );
    }
}

export default ChartContainer;
