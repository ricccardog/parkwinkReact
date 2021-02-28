import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";
import FilterIcon  from '../assets/filter.svg';

export default class Customers extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onChangeSearchKey = this.onChangeSearchKey.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.refreshCustomers = this.refreshCustomers.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.searchCustomer = this.searchCustomer.bind(this);
        this.onChangeShowSearch = this.onChangeShowSearch.bind(this);
        this.sortCustomers = this.sortCustomers.bind(this);
        this.onChangeSortOrder = this.onChangeSortOrder.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            searchValue: "",
            searchKey: "",
            showSearch: false,
            sortOrder: false,
            arrow: "-"
        };
    }

    componentDidMount() {
        this.getCustomers();
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


    getCustomers() {
        CustomerDataService.getAll()
            .then(response => {
                this.setState({
                    customers: response.data
                });
                console.log('getCustomers successfully called from Customers.component');
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshCustomers() {
        this.getCustomers();
        this.setState({
            currentCustomer: null,
            currentIndex: -1
        });
    }

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentIndex: index
        });
    }
    sortCustomers(e) {
       this.onChangeSortOrder();

        if(this.state.sortOrder){
            
            const sorted = this.state.customers.sort((a,b) => a[e.target.value].toLowerCase().localeCompare(b[e.target.value].toLowerCase()));
            this.setState({
                customers: sorted,
                arrow: "↓"
            })
        
        } else {

            const sorted = this.state.customers.sort((a,b) => b[e.target.value].toLowerCase().localeCompare(a[e.target.value].toLowerCase()));
            this.setState({
                customers: sorted,
                arrow: "↑"
            })

        }
        
           
    }

    searchCustomer() {
        const query = {
            searchKey: this.state.searchKey,
            searchValue: this.state.searchValue
        };
        CustomerDataService.search(query)
            .then(response => {
                this.setState({
                    customers: response.data
                });
                console.log('customer searched');
            })
            .catch(e => {
                console.log(e);
            });

        
    }

    render() {
        const { searchValue, customers, currentIndex, showSearch } = this.state;


        return (
            <div className="outer-container">
                {/* _______________________________ TOP SEARCH BUTTONS __________________ */}
                
                <div className="navbar-container">
                
                    <button
                        type="button"
                        className="btn btn-light top-menu-buttons"
                        onClick={this.onChangeShowSearch}
                    >
                        <img src={FilterIcon} alt="filter customers"/>
                    </button>

                    <Link 
                        to={"/customereditor"}
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
                                    <option value="name">Name</option>
                                    <option value="surname">Surname</option>
                                    <option value="email">E-mail</option>
                                    <option value="drivingLicense">Driving License</option>
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
                            onClick={this.searchcustomer}
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
                                
                                <th> Name 
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="name" 
                                        onClick={this.sortCustomers}
                                    > 
                                    {this.state.arrow} 
                                    </button>  
                                </th>

                                <th> Surname 
                                    <button 
                                        className="btn btn-light arrow-button" 
                                        value="surname" 
                                        onClick={this.sortCustomers}
                                    >
                                    {this.state.arrow}
                                    </button> 
                                </th>
                            </tr>
                        </thead>

                        
                        {       
                            (customers.length > 0) && 

                                customers.map((customer, index) => { 

                                    return (

                                    <tbody key={index}>

                                        <tr
                                            onClick={() => this.setActiveCustomer(customer, index)}
                                            key={customer.surname}
                                            /* className={index === currentIndex ? "selected-table-element" : ""}
 */
                                        >
                                            <td> {customers.indexOf(customer) +1 } </td>
                                            <td> {customer.name} </td>
                                            <td> {customer.surname} {index === currentIndex ? (
                                                
                                                    <Link
                                                        to={`/customers/${customer._id}`}
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