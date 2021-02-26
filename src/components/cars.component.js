import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";

export default class Cars extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onChangeSearchKey = this.onChangeSearchKey.bind(this);
        this.getCars = this.getCars.bind(this);
        this.refreshCars = this.refreshCars.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.searchCar = this.searchCar.bind(this);

        this.state = {
            cars: [],
            currentCar: null,
            currentIndex: -1,
            searchValue: "",
            searchKey: ""
        };
    }

    componentDidMount() {
        this.getCars();
    }

    onChangeSearchKey(e) {
        const searchKey = e.target.value;

        this.setState({
            searchKey: searchKey
        });
    }

    onChangeSearchValue(e) {
        const searchValue = e.target.value;

        this.setState({
            searchValue: searchValue
        });
    }

    getCars() {
        CarDataService.getAll()
            .then(response => {
                this.setState({
                    cars: response.data
                });
                console.log('getCars successfully called from cars.component');
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshCars() {
        this.getCars();
        this.setState({
            currentCar: null,
            currentIndex: -1
        });
    }

    setActiveCar(car, index) {
        this.setState({
            currentCar: car,
            currentIndex: index
        });
    }

    searchCar() {
        CarDataService.search(this.state.searchKey, this.state.searchValue)
            .then(response => {
                console.log(`CAZZO DI RISPOSTA`, response)
                this.setState({
                    cars: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchValue, searchKey, cars, currentCar, currentIndex } = this.state;


        return (
            <div className="list row">
                 <div className="col-md-8">
                    <div className="input-group-mb-3">
                        
                        <label htmlFor="searchKey">Search Key</label>
                        <select 
                            id="searchKey"
                            className="form-control"
                            value={this.state.searchKey}
                            onChange={this.onChangeSearchKey}>
                            <option value={null} hidden>Search Field </option>
                            <option value="maker">Maker</option>
                            <option value="model">Model</option>
                        </select>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Value"
                            value={searchValue}
                            onChange={this.onChangeSearchValue}
                        />

                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchCar}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    
                    <h4>Cars List</h4>

                        <Link to={"/careditor"}>
                                Add Cars
                        </Link>

                    <ul className="list-group">
                        
                        {
                        (cars.length > 0) &&

                            cars.map((car, index) => (
                                <li
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveCar(car, index)}
                                    key={index}
                                >
                                    {car.maker} {car.model} {car.price}
                                    
                                <Link
                                to={`/cars/${car._id}`}
                                className="badge badge-warning"
                                >
                                Edit Car
                                </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                
            </div>
        );
    }
}