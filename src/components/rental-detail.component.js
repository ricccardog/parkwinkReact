import React, { Component } from "react";
import { Link } from "react-router-dom";
import RentalDataService from "../services/rental.service";
import CarDataService from '../services/car.service';
import CustomerDataService from '../services/customer.service';

export default class RentalDetail extends Component {
    constructor(props) {
        super(props);
        this.onChangeCar = this.onChangeCar.bind(this);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this); 
        this.getCars = this.getCars.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.getRental = this.getRental.bind(this);
        this.updateRental = this.updateRental.bind(this);
        this.deleteRental = this.deleteRental.bind(this);

        this.state = {
            cars: [],
            customers: [],
            currentRental: {
                _id: null,
                car: "",
                customer: "",
                price: 0,
                startDate: new Date().toLocaleDateString('en-Ca'),
                endDate: new Date().toLocaleDateString('en-Ca')
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getRental(this.props.match.params.id);
        this.getCustomers();
        this.getCars();
    }

    onChangeCar(e) {
        const car = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRental: {
                    ...prevState.currentRental,
                    car: car
                }
            };
        });
    }

    onChangeCustomer(e) {
        const customer = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRental: {
                    ...prevState.currentRental,
                    customer: customer
                }
            };
        });
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRental: {
                    ...prevState.currentRental,
                    price: price
                }
            };
        });
    }

    onChangeStartDate(e) {
        const startDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRental: {
                    ...prevState.currentRental,
                    startDate: startDate
                }
            };
        });
    }

    onChangeEndDate(e) {
        const endDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentRental: {
                    ...prevState.currentRental,
                    endDate: endDate
                }
            };
        });
    } 

    getRental(_id) {
        RentalDataService.get(_id)
            .then(response => { 
                if(response.data.car === null) response.data.car = 'Missing Car';
                if(response.data.customer === null) response.data.customer = 'MIssing Customer';
                this.setState({
                    currentRental: response.data
                });
                console.log('get Rental done');
                
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

    updateRental() {
        if(window.confirm(`Are you sure you want to update this Rental?`)){
        RentalDataService.update(
            this.state.currentRental._id,
            this.state.currentRental
        )
            .then(response => {
                console.log('Rental updated in Rental-detail')
                window.alert('Rental successfully updated!')
            })
            .catch( e => {
                console.log(e);
            });
        }else{
            console.log('No update confirmation received from user')
        }
    }

    deleteRental() {
        if(window.confirm(`Are you sure you want to delete this Rental?`)){
        RentalDataService.delete(this.state.currentRental._id)
            .then(response => {
                console.log('Rental deleted in Rental-detail')
                this.props.history.push('/rentals')
                window.alert('Rental successfully deleted!')
            });
        } else {
            console.log('No deletion confirmation received from user')
        }
    }

    render() {
        const { currentRental, cars, customers } = this.state;

        return(

            <div> {/* outer div */}

                {currentRental ? (

                    <div className="edit-form">
                        
                        <h4><strong>Rental</strong> details </h4>
                        
                        <form>
                            
                            
                            <div className="form-group">
                                <label htmlFor="customer" className="label">Customer</label>

                                <select 
                                    className="form-control"
                                    value={currentRental.customer}
                                    onChange={this.onChangeCustomer}
                                >
                                    <option hidden> {currentRental.customer ? (`${currentRental.customer.name} ${currentRental.customer.surname}`) : "Pick a Car"}</option>
                                    {customers.map(customer => 
                                        <option value={customer._id} key={customer._id}>{customer.name}{customer.surname}</option>
                                        )}

                                </select>
                        
                            </div>


                            <div className="form-group">
                                <label htmlFor="car" className="label">Car</label>

                                <select 
                                    className="form-control"
                                    value={currentRental.car}
                                    onChange={this.onChangeCar}
                                >
                                    <option hidden> {currentRental.car ? `${currentRental.car.maker} ${currentRental.car.model}` : "Pick a Car"}</option>
                                    {cars.map(car => 
                                        <option value={car._id} key={car._id}>{car.maker}{car.model}</option>
                                        )}

                                </select>
                            
                            

                            </div>



                            <div className="form-group">
                                <label htmlFor="price" className="label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={currentRental.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate" className="label">Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    value={currentRental.startDate}
                                    onChange={this.onChangeStartDate}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate" className="label">End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    value={currentRental.endDate}
                                    onChange={this.onChangeEndDate}
                                />
                            </div>
                        </form>
                        <div className="detail-view-footer">
                            <Link
                                to="/rentals"
                            >
                                <button
                                    type="button"
                                    className="btn btn-secondary detail-back-button"
                                >
                                Back    
                                </button>
                            </Link>
                            <button
                                className="btn btn-danger detail-buttons"
                                onClick={this.deleteRental}
                            >
                                Delete
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success detail-buttons"
                                onClick={this.updateRental}
                            >
                                Update
                            </button>
                            
                        </div>
                    </div>

                ) : (
                    <div>
                        <br />
                        <p>Click on a Rental</p>
                    </div>

                )}

            </div>
        );
    }
}