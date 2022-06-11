import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header"
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Detail from "./Detail";
import Write from "./Write";
import  "./App.css"


function App() {
  return (
    <div className="App">
      <Header />
        <Switch>
          <Route path="/" exact>
            <Main/>
          </Route>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/signup" exact >
            <Signup/>
          </Route>
          <Route path="/detail"exact>
            <Detail/>
          </Route>
          <Route path="/write"exact>
            <Write/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
