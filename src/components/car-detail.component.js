import React, { Component } from "react";
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
        CarDataService.update(
            this.state.currentCar._id,
            this.state.currentCar
        )
            .then(response => {
                console.log('Car updated in car-detail')
                this.setState({
                    message: "Car Updated Successfully"
                });
            })
            .catch( e => {
                console.log(e);
            });
    }

    deleteCar() {
        CarDataService.delete(this.state.currentCar._id)
            .then(response => {
                console.log('Car deleted in car-detail')
                this.props.history.push('/cars')
            });
    }

    render() {
        const { currentCar } = this.state;

        return(

            <div> {/* outer div */}

                {currentCar ? (

                    <div className="edit-form">
                        
                        <h4>Car</h4>
                        
                        <form>
                            
                            <div className="form-group">
                                <label htmlFor="maker">Maker</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="maker"
                                    value={currentCar.maker}
                                    onChange={this.onChangeMaker}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="model">Model</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    value={currentCar.model}
                                    onChange={this.onChangeModel}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={currentCar.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="creationDate">Creation Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="creationDate"
                                    value={currentCar.creationDate}
                                    onChange={this.onChangeCreationDate}
                                />
                            </div>
                        </form>
                            <button
                                className="badge badge-danger mr-2"
                                onClick={this.deleteCar}
                            >
                                Delete Car
                            </button>

                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={this.updateCar}
                            >
                                Update Car
                            </button>
                            <p>{this.state.message}</p>
                        
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