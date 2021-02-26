import logo from './logo.svg';
import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Cars from "./components/cars.component";
import CarDetail from "./components/car-detail.component";
import CarEditor from "./components/car-editor";

class App extends Component {
  render() {
    render (
      <div> {/* outer container */}

        <nav>

          <a href="/">
            ParkWink
          </a>
          
          <div>

            <li>
              <Link to={"/cars"}>
                Cars
              </Link>
            </li>

            <li>
              <Link to={"/careditor"}>
                Add Cars
              </Link>
            </li>
          
          </div>

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
