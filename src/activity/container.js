import React, { Component } from 'react';
import HeatMap from './component/map';
import axios from 'axios';
import './activity.scss';

class ActivityContainer extends Component {

    componentDidMount() {
        axios.get('https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/two_res/select-all?select_num_of_rows=2')
            .then((res) => {
            })
    }
    render() {
        return (
            <div className="container">
                <HeatMap />
            </div>
        );
    }
}

export default ActivityContainer;