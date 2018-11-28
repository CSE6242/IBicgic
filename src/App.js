import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { VertBarChart } from './VertBarChart.js';
import { MyDoughnutChart } from './DoughnutChart.js';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.state.barChartData = {
      labels: (function(){let a = []; for(let i=0;i<20;i=i+2) a.push(i); return a;})(),
      datasets: [
	{
          label: "# of orders",
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1,
          data: (function(){let a = []; for(let i=0;i<120;i=i+2) a.push(100*(130-i)); return a;})()
        }
      ]
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

    tick() {
      let color = {
        "red": "rgb(255, 99, 132)",
        "orange": "rgb(255, 159, 64)",
        "yellow": "rgb(255, 205, 86)",
        "green": "rgb(75, 192, 192)",
        "blue": "rgb(54, 162, 235)",
        "purple": "rgb(153, 102, 255)",
        "grey": "rgb(201, 203, 207)"
      };
      this.setState(s=>({
        date: new Date(),
        barChartData: {
          labels: (function(){let a = []; for(let i=0;i<Math.floor(Math.random()*50+20);i=i+2) a.push(Math.floor(Math.random()*i)); return a;})(),
          datasets: [
            {
              label: "# of orders",
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              borderColor: 'rgba(0, 255, 0, 1)',
              borderWidth: 1,
              data: (function(){let a = []; for(let i=0;i<120;i=i+2) a.push(Math.floor(Math.random()*100*(130-i))); return a;})()
            }
          ]
        },
        doughnutChartData: { 
          datasets: [{
            data: [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
            ],
             backgroundColor: [
               color.red,
               color.orange,
               color.yellow,
               color.green,
               color.blue,
             ],
           label: 'Dataset 1'
         }],
         labels: [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue' ]
        }
      }));
    }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <VertBarChart chartData={this.state.barChartData} showPercent={true} />
        <MyDoughnutChart chartData={this.state.doughnutChartData} showPercent={true} />
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class App extends Component {

    render() {
	return (<Clock/>);
    }
}

export default App;
