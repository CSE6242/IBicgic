import { Component } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import * as crossfilter from 'crossfilter';
import axios from 'axios';

class TablePopular extends Component {
    constructor(props){
        super(props);
	this.id = props.id;
    }
    update(data) {
	if (data === undefined)
	    return;
	console.log(data);
	let chart = dc.dataTable(this.id);
	var ndx = crossfilter(data),
	    exptDimension = ndx.dimension(function(d) {return d.startStationName;}),
	    grouping = function(x){return x.value;};
	chart
	    .width(768)
	    .height(480)
	    .dimension(exptDimension)
	    .group(grouping)
	    .showGroups(false)
	    .size(Infinity)
	    .columns(["startStationName", "Mostpopular"])
	    .sortBy(function (d) { return d.Mostpopular; })
	    .order(d3.descending);
	chart.render();
    }

    render(){ 
	axios.get(this.props.dataurl).then((res)=>{
	    this.update(res.data);
	});
	return null;
    }

}

export default TablePopular;