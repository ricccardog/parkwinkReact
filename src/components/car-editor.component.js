import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class CarEditor extends Component {
    constructor(props) {
        super(props);
        this.onChangeMaker = this.onChangeMaker.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
        this.saveCar = this.saveCar.bind(this);
        this.newCar = this.newCar.bind(this);

        this.state = {
            _id: null,
            maker: "",
            model: "",
            price: 0,
            creationDate: new Date('1950-01-01')
        };
    }

    onChangeMaker(e) {
        this.setState({
            maker: e.target.value
        });
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeCreationDate(e) {
        this.setState({
            creationDate: e.target.value
        });
    }

    saveCar() {
        var data = {
            maker: this.state.maker,
            model: this.state.model,
            price: this.state.price,
            creationDate: this.state.creationDate
        };

        CarDataService.create(data)
            .then(response => {
                this.setState({
                _id: response.data._id,
                maker: response.data.maker,
                model: response.data.model,
                price: response.data.price,
                creationDate: response.data.creationDate,

                submitted: true
            });
            console.log('Car Saved in car-editor');
        });
    }

    newCar() {
        console.log('New Car called in car-editor')
        this.setState({
            _id: null,
            maker: "",
            model: "",
            price: 0,
            creationDate:  new Date('1950-01-01'),

            submitted: false
        });
    }

    render(){
        return (
            <div> {/* constainer div */}

            {this.state.submitted ? (

                <div>
                    <h4>Car Submitted</h4>
                    <button onClick={this.newCar}>
                        Add Car
                    </button>
                </div>
            
            ) : (

                <div>
                    <div className="form-group">
                        <label htmlFor="maker">Maker</label>
                        <input  
                            type="text"
                            className="form-control"
                            id="maker"
                            required
                            value={this.state.maker}
                            onChange={this.onChangeMaker}
                            name="maker"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input  
                            type="text"
                            className="form-control"
                            id="model"
                            required
                            value={this.state.model}
                            onChange={this.onChangeModel}
                            name="model"
                        />
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
                        <label htmlFor="creationDate">Creation Date</label>
                        <input  
                            type="date"
                            className="form-control"
                            id="creationDate"
                            required
                            value={this.state.creationDate}
                            onChange={this.onChangeCreationDate}
                            name="creationDate"
                        />
                    </div>

                    <button onClick={this.saveCar} className="btn btn-success">
                        Submit
                    </button>
                </div>
                
            ) }

            </div>
        );
    }
}