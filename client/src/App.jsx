import "./app.scss";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import AddList from "./pages/addList/AddList";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  // const [username, setUsername] = useState("");
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   setUsername(user.username);

  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/movies">
          <Home type="movies" />
        </Route>
        <Route path="/series">
          <Home type="series" />
        </Route>
        <Route path="/watch">
          <Watch />
        </Route>
        <Route path="/addList">{user ? <AddList /> : <></>}</Route>
      </Switch>
    </Router>
  );
};

export default App;
