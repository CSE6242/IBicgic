import React, { Component } from 'react';
import BrushChart from './components/brushchart';
import {PieChartUrlUserType, PieChartUrlUserAge, PieChartUrlUserGender} from './components/piechart';
import TablePopular from './components/table';
import axios from 'axios';

import './container.scss';

class ChartContainer extends Component {
    constructor(props) {
	super(props);
	this.state={
            data: []
	};
    }

    componentDidMount() {
        axios.get('https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/all-use?divide_by=day')
            .then((res) => {
		console.log(res.data);
		this.setState({data: res.data});
            });
    }

    render() {
        return (
		<div className="brush-chart-container" data={this.state.data}>
                <div className='brush-chart' />
		<div className='pie-chart' id="usertype" />
		<div className='pie-chart' id="userage" />
		<div className='pie-chart' id="usergender" />
		<div className='table' id="tablepopular" />
 		<BrushChart data={this.state.data}/>
		<PieChartUrlUserType dataurl="https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/riding-count?startDate=2016-10-01&endDate=2017-01-01&type=usertype" id="#usertype"/>
		<PieChartUrlUserAge dataurl="https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/riding-count?startDate=2016-10-01&endDate=2017-01-01&type=age" id="#userage"/>
		<PieChartUrlUserGender dataurl="https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/riding-count?startDate=2016-10-01&endDate=2017-01-01&type=gender" id="#usergender"/>
		<TablePopular dataurl="https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/riding-count?startDate=2016-10-01&endDate=2017-01-01&type=hotstation" id="#tablepopular"/>
		</div>

        );
    }
}

export default ChartContainer;
