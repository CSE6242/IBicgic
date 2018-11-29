import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../assets/images/logo.png';

class Header extends Component {
    constructor() {
        super();
        this.state={
            index: 0
        };
    }

    handleClick(i) {
        this.setState({
            index: i
        });
    }

    render() { 
        return (
            <header className="header">
                <div className="navbar-header">
                    <p className="navbar-title">
                        <img src={logo} alt="logo"></img>
                        IBicgic
                    </p>
                </div>
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        {
                            this.props.menu.map((item, i) => {
                                return (
                                    <Link to={"/"+item.nav} className={this.state.index === i ? "nav-link active" : "nav-link"} 
                                        onClick={() => this.handleClick(i)} key={i}>
                                        <li className="nav-item">
                                            {item.nav}
                                        </li>
                                    </Link>
                                )
                            })
                        }  
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;