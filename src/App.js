import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { VertBarChart } from './VertBarChart.js';

class App extends Component {

  render() {
    let chartData = {
	    labels: (function(){let a = []; for(let i=0;i<120;i=i+2) a.push(i); return a;})(),
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

   let chartData2 = {
       labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
       datasets: [
	   {
	       label: "# of orders",
	       backgroundColor: 'rgba(255, 0, 0, 0.5)',
	       borderColor: 'rgba(0, 255, 0, 1)',
	       borderWidth: 1,
	       data: [70,10,20,30,40,50,60]
	   }
       ]
   };

    return (
      <div className="App">
        <VertBarChart chartData={chartData} showPercent={true} />
      </div>
    );


  }
}

export default App;
