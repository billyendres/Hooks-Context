import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GithubState from "../context/github/GithubState";
import AlertState from "../context/alert/AlertState";

import "./styles/index.css";
import Header from "./layout/Header";
import Users from "./users/Users";
import Search from "./users/Search";
import Alert from "./layout/Alert";
import About from "./pages/About";
import User from "./users/User";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Header title="Github Finder" />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
