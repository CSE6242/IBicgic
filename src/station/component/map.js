import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MyMap extends Component {
    constructor() {
        super();
        this.state={
            lat: 40.731253,
            lng: -73.996139,
            zoom: 13
        }
    }

    render() {
        return (
            <div className="map">
                <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
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

export default MyMap;