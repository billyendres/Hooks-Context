import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
//import necessary functions
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

//actions makes a request to github, gets a response and dispatches to reducer
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);
  //search users
  //Passed through props from search.js
  const searchUsers = async text => {
    //Loading Spinner
    setLoading();
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //Dispatch responsible for putting into state and dispatching to any components that need access
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    });
  };

  //get user
  //Get a single user
  const getUser = async username => {
    //Loading Spinner
    setLoading();
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: response.data
    });
  };

  //get users repo
  const getUserRepo = async username => {
    //Loading Spinner
    setLoading();
    const response = await axios.get(
      //added env.local to with client id/secret so as to not exceed get req limits
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: response.data
    });
  };

  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //MAKES STATE AVAILABLE TO ENTIRE APP
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepo
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
