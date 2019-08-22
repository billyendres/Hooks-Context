import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.css";
import axios from "axios";
import Header from "./layout/Header";
import Users from "./users/Users";
import Search from "./users/Search";
import Alert from "./layout/Alert";
import About from "./pages/About";
import User from "./users/User";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Search for users by name
  //Passed through props from search.js
  const searchUsers = async text => {
    //Loading Spinner
    setLoading(true);
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(response.data.items);
    setLoading(false);
  };

  //Get a single user
  const getUser = async username => {
    //Loading Spinner
    setLoading(true);
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(response.data);
    setLoading(false);
  };

  //get users repo
  const getUserRepo = async username => {
    //Loading Spinner
    setLoading(false);
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(response.data);
    setRepos(response.data);
    setLoading(false);
  };

  //
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //
  const showAlert = (msg, type) => {
    setAlert(msg, type);
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Header title="Github Finder" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepo={getUserRepo}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
