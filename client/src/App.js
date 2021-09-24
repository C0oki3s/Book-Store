import "./App.css";
import GetUsers from "./components/Admin/GetUsers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Admin/Nav";
import GetBooks from "./components/Admin/GetBooks";
import Card from "./components/Client/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Card} />
      </Router>
      <Router>
        <Switch>
          <Route path="/admin" exact component={Nav} />
          <Route path="/admin/getusers" component={GetUsers} />
          <Route path="/admin/getbooks" component={GetBooks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
