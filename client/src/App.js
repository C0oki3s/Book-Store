import "./App.css";
import GetUsers from "./components/Admin/GetUsers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import GetBooks from "./components/Admin/GetBooks";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={Home} />
          <Route path="/admin/getusers" component={GetUsers} />
          <Route path="/admin/getbooks" component={GetBooks} />
        </Switch>
      </Router>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default App;
