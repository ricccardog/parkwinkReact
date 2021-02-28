import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomerDataService from "../services/customer.service";

export default class CustomerDetail extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDrivingLicense = this.onChangeDrivingLicense.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);

        this.state = {
            currentCustomer: {
                _id: null,
                name: "",
                surname: "",
                email: "",
                drivingLicense: 0,
                birthDate: new Date()
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCustomer(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    name: name
                }
            };
        });
    }

    onChangeSurname(e) {
        const surname = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    surname: surname
                }
            };
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    email: email
                }
            };
        });
    }
    onChangeDrivingLicense(e) {
        const drivingLicense = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    drivingLicense: drivingLicense
                }
            };
        });
    }

    onChangeBirthDate(e) {
        const birthDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    birthDate: birthDate
                }
            };
        });
    }

    getCustomer(_id) {
        CustomerDataService.get(_id)
            .then(response => { 
                this.setState({
                    currentCustomer: response.data
                });
                console.log('get Customer done');
            })
             .catch(e => {
                console.log(e);
            });
    }

    updateCustomer() {
        if(window.confirm(`Are you sure you want to update this customer?`)){
        CustomerDataService.update(
            this.state.currentCustomer._id,
            this.state.currentCustomer
        )
            .then(response => {
                console.log('Customer updated in Customer-detail')
                window.alert('Customer successfully updated!')
            })
            .catch( e => {
                console.log(e);
            });
        }else{
            console.log('No update confirmation received from user')
        }
    }

    deleteCustomer() {
        if(window.confirm(`Are you sure you want to delete this customer?`)){
        CustomerDataService.delete(this.state.currentCustomer._id)
            .then(response => {
                console.log('Customer deleted in customer-detail')
                this.props.history.push('/customers')
                window.alert('Customer successfully deleted!')
            });
        } else {
            console.log('No deletion confirmation received from user')
        }
    }

    render() {
        const { currentCustomer } = this.state;

        return(

            <div> {/* outer div */}

                {currentCustomer ? (

                    <div className="edit-form">
                        
                        <h4><strong>{currentCustomer.name} {currentCustomer.surname}</strong> details </h4>
                        
                        <form>
                            
                            <div className="form-group">
                                <label htmlFor="name" className="label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentCustomer.name}
                                    onChange={this.onChangeName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="surname" className="label">Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    value={currentCustomer.surname}
                                    onChange={this.onChangeSurname}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="label">E-mail</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={currentCustomer.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="drivingLicense" className="label">Driving License</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="drivingLicense"
                                    value={currentCustomer.drivingLicense}
                                    onChange={this.onChangeDrivingLicense}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="birthDate" className="label">Birth Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthDate"
                                    value={currentCustomer.birthDate}
                                    onChange={this.onChangebirthDate}
                                />
                            </div>
                        </form>
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
                            <button
                                className="btn btn-danger detail-buttons"
                                onClick={this.deleteCustomer}
                            >
                                Delete Customer
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success detail-buttons"
                                onClick={this.updateCustomer}
                            >
                                Update Customer
                            </button>
                            
                        </div>
                    </div>

                ) : (
                    <div>
                        <br />
                        <p>Click on a Customer</p>
                    </div>

                )}

            </div>
        );
    }
}