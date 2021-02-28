import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Cars from "./components/cars.component";
import CarDetail from "./components/car-detail.component";
import CarEditor from "./components/car-editor.component";
import CarIcon from "./assets/car.svg";
import CustomerIcon from './assets/customer.svg';
import CustomerEditor from './components/customer-editor.component';
import CustomerDetail from './components/customer-detail.component';
import Customers from './components/customers.component';

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

        </nav>
          
        <div className="sidebar">
             
          <img src={CarIcon} className="icon" alt="car icon"/>
          <Link to={"/cars"}>
           Cars
          </Link>

          <img src={CustomerIcon} className="icon" alt="customer icon"/>
          <Link to={'/customers'}>
            Customers
          </Link>

        </div> 

        <div>
          <Switch>
            <Route exact path={["/", "/cars"]} component={Cars} />
            <Route exact path="/careditor" component={CarEditor} />
            <Route path="/cars/:id" component={CarDetail} />
            <Route exact path="/customers" component={Customers}/>
            <Route exact path="/customereditor" component={CustomerEditor}/>
            <Route path="/customers/:id" component={CustomerDetail}/>
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
