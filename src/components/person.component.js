import React, { Component } from "react";
import PersonDataService from "../services/person.service";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.getPerson = this.getPerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);

    this.state = {
      currentPerson: {
        id: null,
        name: "",
        address: "",
        phone: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPerson(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPerson: {
          ...prevState.currentPerson,
          name: name,
        },
      };
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState((prevState) => ({
      currentPerson: {
        ...prevState.currentPerson,
        address: address,
      },
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;

    this.setState((prevState) => ({
      currentPerson: {
        ...prevState.currentPerson,
        phone: phone,
      },
    }));
  }

  getPerson(id) {
    PersonDataService.get(id)
      .then((response) => {
        this.setState({
          currentPerson: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePerson() {
    PersonDataService.update(
      this.state.currentPerson.id,
      this.state.currentPerson
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The person details were updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletePerson() {
    PersonDataService.delete(this.state.currentPerson.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/persons");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPerson } = this.state;

    return (
      <div>
        {currentPerson ? (
          <div className="edit-form">
            <h4>Person Details</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentPerson.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentPerson.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  value={currentPerson.phone}
                  onChange={this.onChangePhone}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePerson}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePerson}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Person</p>
          </div>
        )}
      </div>
    );
  }
}
