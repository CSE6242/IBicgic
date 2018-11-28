import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class Main extends Component {
    render() { 
        return (
            <main className="main-container">
            <Switch>
                {
                    this.props.route.map((item, i) => {
                        return (
                            <Route path={"/"+item.nav} component={item.component} key={i}></Route>
                        )
                    })
                }
            </Switch>
            </main>            
        );
    }
}

export default Main;