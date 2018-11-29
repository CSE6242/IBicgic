import React, { Component } from 'react';
import MyMap from './component/map';
import Legend from './component/legend';
import data from './component/cluster_data';

import './cluster.scss';

class ClusterContainer extends Component {
    constructor() {
        super();
        this.state={
            cluster: data
        };
    }

    render() {
        return (
            <div className="cluster-container">
                <MyMap data={this.state.cluster} />
                <Legend />
            </div>
        )
    }
}

export default ClusterContainer;