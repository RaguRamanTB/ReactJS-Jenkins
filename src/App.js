import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Switch, Route } from "react-router-dom";
import PersonsList from "./components/person-list.component";
import AddPerson from "./components/add-person.component";
import Person from "./components/person.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/persons" className="navbar-brand">
            People Details
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/persons"} className="nav-link">
                Persons
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/persons"]} component={PersonsList} />
            <Route exact path="/add" component={AddPerson} />
            <Route path="/persons/:id" component={Person} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
