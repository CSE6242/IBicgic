import React, {Component} from 'react';

class Legend extends Component {
    render() {
        return (
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color" id="legend-color1">
                    </div>
                    <div><span>Cluster1</span></div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" id="legend-color2">
                    </div>
                    <div className="legend-text"><span>Cluster2</span></div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" id="legend-color3">
                    </div>
                    <div><span>Cluster3</span></div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" id="legend-color4">
                    </div>
                    <div><span>Cluster4</span></div>
                </div>
            </div>
        )
    }
}

export default Legend;