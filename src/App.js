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

    this.doughnutClicked = this.doughnutClicked.bind(this);
  }
  doughnutClicked(e,item) {
    console.log(this.state.date);

      this.setState((state) => {
	  console.log("here");
	  console.log(state.barChartData.datasets);
	  return {
          barChartData: {
              labels: state.barChartData.labels,
              datasets: [
		  {
		      label: "# of orders",
		      backgroundColor_index: state.barChartData.datasets[0].backgroundColor_index,
		      backgroundColor: state.barChartData.datasets[0].backgroundColor,
		      borderColor: 'rgba(0, 255, 0, 1)',
		      borderWidth: 1,
		      //data: state.barChartData.datasets[0].data
		      data: state.barChartData.datasets[0].data.map(function(elem,ind){if (state.barChartData.datasets[0].backgroundColor_index[ind] == item[0]._index) return elem*2;else return elem;})
		  }
              ]
          }
	  };
      }
      );
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

    tick() {
      let colorList = [ 'red', 'orange', 'yellow', 'green', 'blue' ];
      let backgroundColor_index = (function(){let a = []; for(let i=0;i<120;i=i+2) a.push(Math.floor(Math.random()*5)); return a;})();
      let backgroundColor = backgroundColor_index.map(function(x){return colorList[x];});

      this.setState(s=>({
        date: new Date(),
        barChartData: {
          labels: (function(){let a = []; for(let i=0;i<Math.floor(Math.random()*50+20);i=i+2) a.push(Math.floor(Math.random()*i)); return a;})(),
          datasets: [
            {
              label: "# of orders",
              backgroundColor_index: backgroundColor_index,
              backgroundColor: backgroundColor,
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
               "red",
               "orange",
               "yellow",
               "green",
               "blue",
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
        <MyDoughnutChart chartData={this.state.doughnutChartData} showPercent={true} f={this.doughnutClicked} />
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
