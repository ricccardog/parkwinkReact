import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from 'react-router-dom';

export default class CustomerEditor extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDrivingLicense = this.onChangeDrivingLicense.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
        this.newCustomer = this.newCustomer.bind(this);

        this.state = {
            _id: null,
            name: "",
            surname: "",
            email: "",
            drivingLicense: 0,
            birthDate: new Date('1950-01-01')
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeDrivingLicense(e) {
        this.setState({
            drivingLicense: e.target.value
        });
    }

    onChangeBirthDate(e) {
        this.setState({
            birthDate: e.target.value
        });
    }

    saveCustomer() {
        var data = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            drivingLicense: this.state.drivingLicense,
            birthDate: this.state.birthDate
        };

        CustomerDataService.create(data)
            .then(response => {
                this.setState({
                _id: response.data._id,
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                drivingLicense: response.data.drivingLicense,
                birthDate: response.data.birthDate,

                submitted: true
            });
            console.log('Customer Saved in customer-editor');
        });
    }

    newCustomer() {
        console.log('New Customer called in customer-editor')
        this.setState({
            _id: null,
            name: "",
            surname: "",
            email: "",
            drivingLicense: 0,
            birthDate:  new Date('1950-01-01'),

            submitted: false
        });
    }

    render(){
        return (
            <div> {/* constainer div */}
            <div className="edit-form">
            <h4>Add a Customer</h4>
            {this.state.submitted ? (

                <div>
                    <h4>Customer Submitted</h4>
                    <button className="btn btn-success" onClick={this.newCustomer}>
                        Add Customer
                    </button>
                </div>
            
            ) : (

                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input  
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input  
                            type="text"
                            className="form-control"
                            id="surname"
                            required
                            value={this.state.surname}
                            onChange={this.onChangeSurname}
                            name="surname"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input  
                            type="text"
                            className="form-control"
                            id="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="drivingLicense">Driving License</label>
                        <input  
                            type="number"
                            className="form-control"
                            id="drivingLicense"
                            required
                            value={this.state.drivingLicense}
                            onChange={this.onChangeDrivingLicense}
                            name="drivingLicense"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">Birth Date</label>
                        <input  
                            type="date"
                            className="form-control"
                            id="birthDate"
                            required
                            value={this.state.birthDate}
                            onChange={this.onChangeBirthDate}
                            name="birthDate"
                        />
                    </div>

                    <div className="detail-view-footer">
                    <Link
                        to="/customers"
                    >
                        <button
                            type="button"
                            className="btn btn-secondary detail-back-button"
                        >
                        Back    
                        </button>
                    </Link>

                    <button onClick={this.saveCustomer} className="btn btn-success">
                        Submit
                    </button>
                    </div>
                </div>
                
            ) }
            </div>
            </div>
        );
    }
}