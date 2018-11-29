import React, { Component } from 'react';
import './overview.scss';

import BrushChart from './components/brushchart';
import RowChart from './components/rowchart';
import PieChart from './components/piechart';
import BarChart from './components/barchart';

class ChartContainer extends Component {

    render() {
        return (
			<div className="container-wrap">
				<BrushChart />
				<RowChart />
				<BarChart />
				<PieChart />
			</div>
		)
    }
}

export default ChartContainer;
