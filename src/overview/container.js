import React, { Component } from 'react';
import BrushChart from './components/brushchart';
import axios from 'axios';

import './container.scss';

class ChartContainer extends Component {
	constructor() {
		super();
		this.state={
            data: []
		}
	}

	componentDidMount() {
        axios.get('https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/all-use?divide_by=day')
            .then((res) => {
				console.log(res.data);
            });
    }

    render() {
        return (
            <div className="brush-chart-container" data={this.state.data}>
              <BrushChart data={this.state.data}/>
            </div>
        );
    }
}

export default ChartContainer;
