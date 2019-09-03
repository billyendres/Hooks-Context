import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GithubState from "../context/github/GithubState";
import AlertState from "../context/alert/AlertState";

import "./styles/index.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Alert from "./layout/Alert";
import About from "./pages/About";
import User from "./users/User";
import NotFound from "./pages/NotFound";

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
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
