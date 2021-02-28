import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarDataService from "../services/car.service";

export default class CarDetail extends Component {
    constructor(props) {
        super(props);
        this.onChangeMaker = this.onChangeMaker.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
        this.getCar = this.getCar.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);

        this.state = {
            currentCar: {
                _id: null,
                maker: "",
                model: "",
                price: 0,
                creationDate: new Date()
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCar(this.props.match.params.id);
    }

    onChangeMaker(e) {
        const maker = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCar: {
                    ...prevState.currentCar,
                    maker: maker
                }
            };
        });
    }

    onChangeModel(e) {
        const model = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCar: {
                    ...prevState.currentCar,
                    model: model
                }
            };
        });
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCar: {
                    ...prevState.currentCar,
                    price: price
                }
            };
        });
    }

    onChangeCreationDate(e) {
        const creationDate = e.target.value;

        this.setState(function(prevState) {
            return {
                currentCar: {
                    ...prevState.currentCar,
                    creationDate: creationDate
                }
            };
        });
    }

    getCar(_id) {
        CarDataService.get(_id)
            .then(response => { 
                this.setState({
                    currentCar: response.data
                });
                console.log('get car done');
            })
             .catch(e => {
                console.log(e);
            });
    }

    updateCar() {
        if(window.confirm(`Are you sure you want to update this car?`)){
        CarDataService.update(
            this.state.currentCar._id,
            this.state.currentCar
        )
            .then(response => {
                console.log('Car updated in car-detail')
                window.alert('Car successfully updated!')
            })
            .catch( e => {
                console.log(e);
            });
        }else{
            console.log('No update confirmation received from user')
        }
    }

    deleteCar() {
        if(window.confirm(`Are you sure you want to delete this car?`)){
        CarDataService.delete(this.state.currentCar._id)
            .then(response => {
                console.log('Car deleted in car-detail')
                this.props.history.push('/cars')
                window.alert('Car successfully deleted!')
            });
        } else {
            console.log('No deletion confirmation received from user')
        }
    }

    render() {
        const { currentCar } = this.state;

        return(

            <div> {/* outer div */}

                {currentCar ? (

                    <div className="edit-form">
                        
                        <h4><strong>{currentCar.maker} {currentCar.model}</strong> details </h4>
                        
                        <form>
                            
                            <div className="form-group">
                                <label htmlFor="maker" className="label">Maker</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="maker"
                                    value={currentCar.maker}
                                    onChange={this.onChangeMaker}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="model" className="label">Model</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    value={currentCar.model}
                                    onChange={this.onChangeModel}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price" className="label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={currentCar.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="creationDate" className="label">Creation Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="creationDate"
                                    value={currentCar.creationDate}
                                    onChange={this.onChangeCreationDate}
                                />
                            </div>
                        </form>
                        <div className="detail-view-footer">
                            <Link
                                to="/cars"
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
                                onClick={this.deleteCar}
                            >
                                Delete
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success detail-buttons"
                                onClick={this.updateCar}
                            >
                                Update
                            </button>
                            
                        </div>
                    </div>

                ) : (
                    <div>
                        <br />
                        <p>Click on a Car</p>
                    </div>

                )}

            </div>
        );
    }
}