import React, { Component } from "react";
import CarDataService from "../services/car.service";
import { Link } from "react-router-dom";
import FilterIcon  from '../assets/filter.svg';

export default class Cars extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onChangeSearchKey = this.onChangeSearchKey.bind(this);
        this.getCars = this.getCars.bind(this);
        this.refreshCars = this.refreshCars.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.searchCar = this.searchCar.bind(this);
        this.onChangeShowSearch = this.onChangeShowSearch.bind(this);
        this.sortCars = this.sortCars.bind(this);
        this.onChangeSortOrder = this.onChangeSortOrder.bind(this);

        this.state = {
            cars: [],
            currentCar: null,
            currentIndex: -1,
            searchValue: "",
            searchKey: "",
            showSearch: false,
            sortOrder: false,
            sortValue: '',
            arrow: "-"
        };
    }

    componentDidMount() {
        this.getCars();
    }

    onChangeShowSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        })
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

    onChangeSortOrder() {
        const sortOrder = !this.state.sortOrder;
        
        this.setState({
            sortOrder: sortOrder
        })
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
    sortCars(e) {
       this.onChangeSortOrder();

        if(this.state.sortOrder){
            
            const sorted = this.state.cars.sort((a,b) => a[e.target.value].toLowerCase().localeCompare(b[e.target.value].toLowerCase()));
            this.setState({
                cars: sorted,
                sortValue: e.target.value,
                arrow: "↓"
            })
        
        } else {

            const sorted = this.state.cars.sort((a,b) => b[e.target.value].toLowerCase().localeCompare(a[e.target.value].toLowerCase()));
            this.setState({
                cars: sorted,
                sortValue: e.target.value,
                arrow: "↑"
            })

        }
        
           
    }

    searchCar() {
        const query = {
            searchKey: this.state.searchKey,
            searchValue: this.state.searchValue
        };
        CarDataService.search(query)
            .then(response => {
                this.setState({
                    cars: response.data
                });
                console.log('car searched');
            })
            .catch(e => {
                console.log(e);
            });

        
    }

    render() {
        const { searchValue, cars, currentIndex, showSearch } = this.state;


        return (
            <div className="outer-container">
                {/* _______________________________ TOP SEARCH BUTTONS __________________ */}
                
                <div className="navbar-container">
                
                    <button
                        type="button"
                        className="btn btn-light top-menu-buttons"
                        onClick={this.onChangeShowSearch}
                    >
                        <img src={FilterIcon} alt="filter cars"/>
                    </button>

                    <Link 
                        to={"/careditor"}
                    >
                        <button
                            type="button"
                            className="btn btn-primary top-menu-buttons"
                        >
                            <strong>+ Add</strong>
                        </button>
                    </Link>

                   

                </div>
                
                <div className="search-menu-container">
                { showSearch ? 
                
                (
                <div>
                 <div className="filter-inputs">
                    
                            <div className="entry">
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
                            </div>

                            <div className="entry">
                                <label htmlFor="searchValue">Search Value</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Value"
                                    value={searchValue}
                                    onChange={this.onChangeSearchValue}
                                />
                            </div>

                    
                        
                    
                </div>
                <div className="filter-button-container">
                <button
                            className="filter-button btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchCar}
                        >
                            Filter
                        </button>
                    
                </div>
                </div>
                
                ) : (

                <span></span>

                )
                
                }
                </div>

                <div>
                <div className="main-list-container">
  
                   


                    <div className="table-container">
                    <table className="table table-hover table-striped">

                        <thead>
                            <tr>
                                <th> # </th>
                                
                                <th> Maker 
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="maker" 
                                        onClick={this.sortCars}
                                    > 
                                    {this.state.sortValue === "maker" ? this.state.arrow : ' - '} 
                                    </button>  
                                </th>

                                <th> Model 
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="model" 
                                        onClick={this.sortCars}
                                    >
                                    {this.state.sortValue === "model" ? this.state.arrow : ' - '}
                                    </button> 
                                </th>
                            </tr>
                        </thead>

                        
                        {       
                            (cars.length > 0) && 

                                cars.map((car, index) => { 

                                    return (

                                    <tbody key={index}>

                                        <tr
                                            onClick={() => this.setActiveCar(car, index)}
                                            key={car.maker}
                                            /* className={index === currentIndex ? "selected-table-element" : ""}
 */
                                        >
                                            <td> {cars.indexOf(car) +1 } </td>
                                            <td> {car.maker} </td>
                                            <td> {car.model} {index === currentIndex ? (
                                                
                                                    <Link
                                                        to={`/cars/${car._id}`}
                                                        className="edit-popup"
                                                    >
                                                        <button className="btn btn-light btn-outline">
                                                            Edit
                                                        </button>
                                                        
                                                    </Link>): ""}</td>
                                            
                                        
                                        </tr>
                                    
                                    </tbody>
                            
                                    )
                                }
                            
                            ) 
                        
                        }
                           
                        
                        
                    </table> 
                    </div>
                    
                </div>

                
            </div>
            </div>
        );
    }
}