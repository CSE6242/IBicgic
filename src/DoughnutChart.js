import React, { Component } from 'react';
import logo from './logo.svg';
import { Doughnut } from "react-chartjs-2";

export class MyDoughnutChart extends Component {

    constructor(props) {
	super(props);
    }

    render()
    {
	let f = this.props.f;
	this.chartOptions = {
	    responsive: true,
	    legend: {
		position: 'top'
	    },
	    title: {
		display: true,
		text: 'Chart.js Doughnut Chart'
	    },
            onClick: function(e, item){
              if (item[0] != undefined) {
                console.log(item[0]);
                // if (item.length > 0)
                //   alert(item[0]._index + ' clicked');
                f(e,item);
              }
            },
	    animation: {
		animateScale: true,
		animateRotate: true
	    }
	};
	return (<Doughnut data={this.props.chartData} options={this.chartOptions}/>);
    }

};