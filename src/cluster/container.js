import React, { Component } from 'react';
import MyMap from './component/map';
import Legend from './component/legend';
import data from './component/cluster_data';

import './cluster.scss';

class ClusterContainer extends Component {
    constructor() {
        super();
        this.state={
            cluster: data,
            legend: [
                {
                    id: 1, color: { background: '#01aced' }, active: true
                },
                {
                    id: 2, color: { background: '#d95350' }, active: true
                }, 
                {
                    id: 3, color: { background: '#eea032' }, active: true
                },
                {
                    id: 4, color: { background: '#5db75c' }, active: true
                }
            ]
        };
    }

    changeState(id, active) {
        let legend = this.state.legend;
        legend[id-1].active = active;
        this.setState({
            legend: legend
        })
    }

    render() {
        return (
            <div className="container">
                <MyMap data={this.state.cluster} legend={this.state.legend} />
                <Legend legend={this.state.legend} changeState = { (id, active) => {this.changeState(id, active)} }/>
            </div>
        )
    }
}

export default ClusterContainer;