import React, { useContext } from "react";
//Output user item
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);
  // const { loading, users } = githubContext;

  if (githubContext.loading) return <Spinner />;
  return (
    <div style={userStyle}>
      {githubContext.users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
