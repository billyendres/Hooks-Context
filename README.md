# Refactored From Class Based State Management To Use Hooks & Context API

### User.js Example of how to replace lifecycle methods ie. componentDidMount with useEffect Hook.

Destructure all props rather than run props.example

### App.js has several examples of replacing state = {} with useState with [ ], booleans or defined values.

### Setup a context folder to store context creator, reducers, types and state files

### Originally in App.js. Functions added to types file in context folder.

### Users.js uses githubContext provider to supply state, destructures as compared to Search.js eg ' githubContext.searchUsers(text);

'

```javascript
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

```
