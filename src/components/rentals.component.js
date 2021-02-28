import React, { Component } from "react";
import RentalDataService from "../services/rental.service";
import { Link } from "react-router-dom";
import FilterIcon  from '../assets/filter.svg';
import CarDataService from "../services/car.service";
import CustomerDataService from "../services/customer.service";

export default class Rentals extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onChangeSearchKey = this.onChangeSearchKey.bind(this);
        this.getRentals = this.getRentals.bind(this);
        this.getCars = this.getCars.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.refreshRentals = this.refreshRentals.bind(this);
        this.setActiveRental = this.setActiveRental.bind(this);
        this.searchRental = this.searchRental.bind(this);
        this.onChangeShowSearch = this.onChangeShowSearch.bind(this);
        this.sortRentals = this.sortRentals.bind(this);
        this.onChangeSortOrder = this.onChangeSortOrder.bind(this);

        this.state = {
            rentals: [],
            cars: [],
            customers: [],
            currentRental: null,
            currentIndex: -1,
            searchValue: "",
            searchKey: "",
            showSearch: false,
            sortOrder: false,
            arrow: "-"
        };
    }

    componentDidMount() {
        this.getRentals();
    }
    

    onChangeShowSearch() {
        this.getCars();
        this.getCustomers();
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


    getRentals() {
        RentalDataService.getAll()
            .then(response => {
                for(let element in response.data){
                    if(response.data[element].customer!= null){
                   response.data[element].customerDisplay = `${response.data[element].customer.name} ${response.data[element].customer.surname}`;
                    } else {
                        response.data[element].customerDisplay = 'Missing Customer'
                    }
                }
               
                this.setState({
                    rentals: response.data
                    
                });
                console.log('getRentals successfully called from rentals.component');
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCars() {
        CarDataService.getAll()
            .then(response => {
                this.setState({
                    cars: response.data
                });
                console.log('Get cars success in rentals component')
            })
            .catch(e => {
                console.log(e);
            });
        console.log('this.state.cars')
    }

    getCustomers() {
        CustomerDataService.getAll()
            .then(response => {
                this.setState({
                    customers: response.data
                });
                console.log('Get customers success in rentals component')
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshRentals() {
        this.getRentals();
        this.setState({
            currentRental: null,
            currentIndex: -1
        });
    }

    setActiveRental(rental, index) {
        this.setState({
            currentRental: rental,
            currentIndex: index
        });
    }
    sortRentals(e) {
       this.onChangeSortOrder();

        if(this.state.sortOrder){
            
            const sorted = this.state.rentals.sort((a,b) => a[e.target.value].toLowerCase().localeCompare(b[e.target.value].toLowerCase()));
            this.setState({
                rentals: sorted,
                arrow: "↓"
            })
        
        } else {

            const sorted = this.state.rentals.sort((a,b) => b[e.target.value].toLowerCase().localeCompare(a[e.target.value].toLowerCase()));
            this.setState({
                rentals: sorted,
                arrow: "↑"
            })

        }
        
           
    }

    searchRental() {
        const query = {
            searchKey: this.state.searchKey,
            searchValue: this.state.searchValue
        };
        RentalDataService.search(query)
            .then(response => {
                this.setState({
                    rentals: response.data
                });
                console.log('rental searched');
            })
            .catch(e => {
                console.log(e);
            });

        
    }

    render() {
        const { rentals, currentIndex, showSearch, cars, customers } = this.state;


        return (
            <div className="outer-container">
                {/* _______________________________ TOP SEARCH BUTTONS __________________ */}
                
                <div className="navbar-container">
                
                    <button
                        type="button"
                        className="btn btn-light top-menu-buttons"
                        onClick={this.onChangeShowSearch}
                    >
                        <img src={FilterIcon} alt="filter rentals"/>
                    </button>

                    <Link 
                        to={"/rentaleditor"}
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
                                    <option value="car">Car</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>

                            
                                
                            <div className="entry">
                                <label htmlFor="searchKey">Search Value</label>
                                <select 
                                    id="searchKey"
                                    className="form-control"
                                    value={this.state.searchKey}
                                    onChange={this.onChangeSearchValue}>
                                        <option value={null} hidden>Select a Value</option>

                                    { this.state.searchKey=== 'car' ? cars.map(car =>
                                        <option value={car._id} key={car._id}>{car.maker} {car.model}</option>
                                    ) : (
                                        customers.map(customer =>
                                        <option value={customer._id} key={customer._id}>{customer.name} {customer.surname}</option>
                                        )
                                    )}
                                 

                                </select>
                            </div>

                            

                          
                        
                    
                </div>
                <div className="filter-button-container">
                <button
                            className="filter-button btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchRental}
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

                                <th> Customer
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="customerId" 
                                        onClick={this.sortRentals}
                                    >
                                    {this.state.arrow}
                                    </button> 
                                </th>
                                
                                <th> Start Date 
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="startDate" 
                                        onClick={this.sortRentals}
                                    > 
                                    {this.state.arrow} 
                                    </button>  
                                </th>

                                <th> End Date
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="endDate" 
                                        onClick={this.sortRentals}
                                    >
                                    {this.state.arrow}
                                    </button> 
                                </th>
                                
                            </tr>
                        </thead>

                        
                        {       
                            (rentals.length > 0) && 

                                rentals.map((rental, index) => { 

                                    return (

                                    <tbody key={index}>

                                        <tr
                                            onClick={() => this.setActiveRental(rental, index)}
                                            key={rental.price}
                                            /* className={index === currentIndex ? "selected-table-element" : ""}
 */
                                        >
                                            <td> {rentals.indexOf(rental) +1 } </td>
                                            <td> {rental.customerDisplay} </td>
                                            <td> {rental.startDate} </td>
                                            <td> {rental.endDate}
                                             {index === currentIndex ? (
                                                
                                                    <Link
                                                        to={`/rentals/${rental._id}`}
                                                        className="edit-popup"
                                                    >
                                                        <button className="btn btn-light btn-outline">
                                                            Edit
                                                        </button>
                                                        
                                                    </Link>): ""}
                                            </td>
                                            
                                        
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