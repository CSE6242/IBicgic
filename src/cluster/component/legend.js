import React, {Component} from 'react';

class Legend extends Component {
    constructor() {
        super();
        this.state={
            textcolor: {
                color: '#8e9ab9'
            }
        }
    }

    handleClick(id) {
        let active = this.props.legend[id-1].active;
        this.props.changeState(id, !active);    
    }

    render() {
        return (
            <div className="legend">
                <ul className="legend-group">
                    {
                        this.props.legend.map((d, i) => {
                            return (
                                <li className={d.active === true ? "legend-item" : "legend-item hide"} onClick={this.handleClick.bind(this, d.id)} key={i}>
                                    <div className="legend-color" style={d.color}>
                                    </div>
                                    <span className="legend-text" style={this.state.textcolor}>Cluster{d.id}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Legend;