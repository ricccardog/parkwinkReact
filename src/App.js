import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Cars from "./components/cars.component";
import CarDetail from "./components/car-detail.component";
import CarEditor from "./components/car-editor.component";

class App extends Component {
  render() {
    return (
      <div> {/* outer container */}

        <nav className="topNavBar">
        
          <h4>
          <a href="/" className="home-link">
            ParkWink
          </a>
          </h4>
          
          <h4>
          <Link to={"/cars"} className="content-link">
           Cars
          </Link>
          </h4>
          
        </nav>

        <div>
          <Switch>
            <Route exact path={["/", "/cars"]} component={Cars} />
            <Route exact path="/careditor" component={CarEditor} />
            <Route path="/cars/:id" component={CarDetail} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
