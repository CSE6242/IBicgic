import React, { Component } from 'react';
import HeatMap from './component/map';
import axios from 'axios';

class ActivityContainer extends Component {

    componentDidMount() {
        axios.get('https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/two_res/select-all?select_num_of_rows=2')
            .then((res) => {
            })
    }
    render() {
        return (
            <HeatMap />
        );
    }
}

export default ActivityContainer;