import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


class MyMap extends Component {
    constructor() {
        super();
        this.state={
            lat: 40.731253,
            lng: -73.996139,
            zoom: 13,
            radius: 10,
            color: ['#01aced', '#d95350', '#eea032', '#5db75c']
        }
    }

    componentDidMount() {
        let myMap = L.map('map').setView([this.state.lat, this.state.lng], this.state.zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access_token}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: '18',
            id: 'mapbox.dark',
            access_token: 'pk.eyJ1IjoicGFuZGFpY2UiLCJhIjoiY2pwMXFhMHhkMzJubzNwbzlzb2NzZTBrayJ9.cY3fFygLo3IzTHTdW9xyPw'
        }).addTo(myMap);
        this.props.data.map((d) => {
                let marker = L.circleMarker([d.startStationLatitude, d.startStationLongitude], {
                    radius: this.state.radius,
                    color: this.state.color[d.stationType],
                    weight: 2,
                    fillColor: this.state.color[d.stationType],
                    fillOpacity: 0.75
                }).addTo(myMap)
                .bindTooltip(`<strong>${d.startStationName}</strong>`, {
                    direction: 'top'
                })
                .on('mouseover', () => {
                    marker.setRadius(15);
                    marker.setStyle({
                        fillOpacity: 1
                    })
                })
                .on('mouseout', () => {
                    marker.setRadius(this.state.radius);
                    marker.setStyle({
                        fillOpacity: 0.75
                    })
                });
            return this;
        });
    }

    render() {
        return (
            <div id="map">
            </div>
        );
    }
}

export default MyMap;