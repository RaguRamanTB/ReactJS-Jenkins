import React, { Component } from "react";
import PersonDataService from "../services/person.service";
import { Link } from "react-router-dom";

export default class PersonsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrievePersons = this.retrievePersons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePerson = this.setActivePerson.bind(this);
    this.removeAllPersons = this.removeAllPersons.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      persons: [],
      currentPerson: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrievePersons();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrievePersons() {
    PersonDataService.getAll()
      .then((response) => {
        this.setState({
          persons: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePersons();
    this.setState({
      currentPerson: null,
      currentIndex: -1,
    });
  }

  setActivePerson(person, index) {
    this.setState({
      currentPerson: person,
      currentIndex: index,
    });
  }

  removeAllPersons() {
    PersonDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    PersonDataService.findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          persons: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, persons, currentPerson, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>People List</h4>

          <ul className="list-group">
            {persons &&
              persons.map((person, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePerson(person, index)}
                  key={index}
                >
                  {person.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPersons}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPerson ? (
            <div>
              <h4>Person Selected</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentPerson.name}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentPerson.address}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentPerson.phone}
              </div>

              <Link
                to={"/persons/" + currentPerson.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Person</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
