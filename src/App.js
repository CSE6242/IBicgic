import React, { Component } from 'react';

import Header from './shared/header/header';
import Main from './shared/main/main';

import ChartContainer from './chart/container';

import './App.scss';


class App extends Component {
    constructor() {
        super();
        this.state={
            route: [
                { nav: "overview", component: ChartContainer}, 
                { nav: "activity", component: ChartContainer}, 
                { nav: "daily_trip", component: ChartContainer}, 
                { nav: "station_analysis", component: ChartContainer}, 
                { nav: "clustering", component: ChartContainer}, 
                { nav: "prediction", component: ChartContainer}
            ]
        }
    } 

    navbarToggle() {
        let link = document.querySelector(this);
        link.style.className="active";
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
