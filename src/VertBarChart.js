import React, { Component } from 'react';
import logo from './logo.svg';
import { Bar } from 'react-chartjs-2';

export class VertBarChart extends Component {
    constructor(props){
	super(props);
	console.log(props);
	this.chartData = props.chartData;
	this.showPercent = props.showPercent;
	let sum = this.chartData["datasets"][0]["data"].reduce((a,b)=>(a+b));
	this.chartOptions = {
	    maintainAspectRatio: false,
	    tooltips: {
		enabled: true,
		callbacks: {
		    label: function(tooltipItem, data) {
			let t = ((tooltipItem.yLabel / sum * 100).toFixed(2));
			return data["datasets"][0]["label"] + ' ' + tooltipItem.yLabel + ((props.showPercent)?(' ' + t + '%'):'');
		    },
		    title: function(tooltipItems, data) {
			return tooltipItems[0].xLabel + '~' + (parseInt(tooltipItems[0].xLabel) + 1) + ' min' ;
		    }
		}
	    },
            scales: {
		yAxes: [{
                    ticks: {
			beginAtZero:true
                    }
		}]
            },
	    onClick: function(e, item){
		// console.log(e);
		// console.log(item);
		if (item.length > 0)
		    alert(item[0]._index + ' clicked');
	    }
	};
    }

    render() {
	console.log(this.showPercent);
	return (
		<div>
		<h2>Distribution of riding time</h2>
		<Bar data={this.chartData} width={200} height={350} options={this.chartOptions}/>
		</div>
	);
    }
}
