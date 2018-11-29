import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import HeatMapLayer from 'react-leaflet-heatmap-layer';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import * as _ from 'lodash';

class HeatMap extends Component {
    constructor() {
        super();
        this.state={
            lat: 40.731253,
            lng: -73.996139,
            zoom: 13,
            data: []
        }
    }

    componentDidMount() {
        let hstart = 10;
        let self = this;
        setInterval(function() {
            axios.get(`https://163fqjo9o1.execute-api.us-east-1.amazonaws.com/NYbike/in-and-out?startDate=2017-03-01%20${hstart}:00:00&endDate=2017-03-01%20${hstart}:59:59&type=in_out`)
            .then((res) => {
                const raw_data = res.data;
                let new_data = [];
                _.each(raw_data, (d) => {
                    let item = [];
                    item.push(d.stationLatitude);
                    item.push(d.stationLongitude);
                    item.push(d.borrowAmount+d.returnAmount);
                    new_data.push(item);
                });
                self.setState({
                    data: new_data
                });
            });
            hstart = hstart + 1 === 24 ? 0 : hstart + 1;
        }, 3000)
    }

    render() {
        return (
            <div className="map">
                <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
                    <HeatMapLayer 
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={this.state.data}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])}
                    />
                    <TileLayer
                        url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGFuZGFpY2UiLCJhIjoiY2pwMXFhMHhkMzJubzNwbzlzb2NzZTBrayJ9.cY3fFygLo3IzTHTdW9xyPw'
                        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                        maxZoom='18'
                        id='mapbox.dark' />
                </Map>
            </div>
        );
    }
}

export default HeatMap;