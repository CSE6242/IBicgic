import React, { Component } from 'react';

import Header from './shared/header/header';
import Main from './shared/main/main';

import ChartContainer from './overview/container';
import ActivityContainer from './activity/container';
import TripContainer from './trip/container';
import StationContainer from './station/container';
import ClusterContainer from './cluster/container';
import PredictionContainer from './prediction/container';

import './App.scss';


class App extends Component {
    constructor() {
        super();
        this.state={
            route: [
                { nav: "overview", component: ChartContainer}, 
                { nav: "activity", component: ActivityContainer}, 
                { nav: "daily_trip", component: TripContainer}, 
                { nav: "station_analysis", component: StationContainer}, 
                { nav: "clustering", component: ClusterContainer}, 
                { nav: "prediction", component: PredictionContainer}
            ]
        }
    } 

    render() {   
        return (
            <div className="App">
                <Header menu={this.state.route} />
                <Main route={this.state.route} />
            </div>
        );
    }
}

export default App;
