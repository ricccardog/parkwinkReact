import React, { Component } from "react";
import { Link } from 'react-router-dom';
import RentalDataService from "../services/rental.service";
import CarDataService from '../services/car.service';
import CustomerDataService from '../services/customer.service';

export default class RentalEditor extends Component {
    constructor(props) {
        super(props);
        this.onChangeCar = this.onChangeCar.bind(this);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.getCars = this.getCars.bind(this);
        this.saveRental = this.saveRental.bind(this);
        this.newRental = this.newRental.bind(this);

        this.state = {
            _id: null,
            car: "",
            customer: "",
            price: 0,
            startDate: new Date().toLocaleDateString('en-Ca'),
            endDate: new Date().toLocaleDateString('en-Ca'),
            cars: [],
            customers: []
        };
    }

    componentDidMount() {
        this.getCars();
        this.getCustomers();
    }

    onChangeCar(e) {
        this.setState({
            car: e.target.value
        });
    }

    onChangeCustomer(e) {
        this.setState({
            customer: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
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

    saveRental() {
        var data = {
            car: this.state.car,
            customer: this.state.customer,
            price: this.state.price,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };

        RentalDataService.create(data)
            .then(response => {
                this.setState({
                _id: response.data._id,
                car: response.data.car,
                customer: response.data.customer,
                price: response.data.price,
                startDate: response.data.startDate,
                endDate: response.data.endDate,

                submitted: true
            });
            console.log('Rental Saved in Rental-editor');
        });
    }

    newRental() {
        console.log('New Rental called in Rental-editor')
        this.setState({
            _id: null,
            car: "",
            customer: "",
            price: 0,
            startDate:  new Date(),
            endDate: new Date(),

            submitted: false
        });
    }

    render(){
        const { cars, customers } = this.state;
        return (
            <div> {/* constainer div */}


            <div className="edit-form">
            <h4> Add a Rental </h4>
            {this.state.submitted ? (

                <div>
                    <h4>Rental Submitted!</h4>
                    <button className="btn btn-success" onClick={this.newRental}>
                        Add Rental
                    </button>
                </div>
            
            ) : (

                <div>
                   <div className="form-group">
                                <label htmlFor="customer" className="label">Customer</label>

                                <select 
                                    className="form-control"
                                    value={this.state.customer}
                                    onChange={this.onChangeCustomer}
                                >
                                    {customers.map(customer => 
                                        <option value={customer._id} key={customer._id}>{customer.name} {customer.surname}</option>
                                        )}

                                </select>
                        
                            </div>


                            <div className="form-group">
                                <label htmlFor="car" className="label">Car</label>

                                <select 
                                    className="form-control"
                                    value={this.state.car}
                                    onChange={this.onChangeCar}
                                >
                                    {cars.map(car => 
                                        <option value={car._id} key={car._id}>{car.maker} {car.model}</option>
                                        )}

                                </select>
                            
                            

                            </div>

                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input  
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            name="price"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input  
                            type="date"
                            className="form-control"
                            id="startDate"
                            required
                            value={this.state.startDate}
                            onChange={this.onChangeStartDate}
                            name="startDate"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input  
                            type="date"
                            className="form-control"
                            id="endDate"
                            required
                            value={this.state.endDate}
                            onChange={this.onChangeEndDate}
                            name="endDate"
                        />
                    </div>

                    <div className="detail-view-footer">
                        <button onClick={this.saveRental} className="btn btn-success">
                            Submit
                        </button>

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
                    </div>
                </div>
                
            ) }
            </div>
            </div>
        );
    }
}