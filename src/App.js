import React from "react";

import "./App.css"
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';

import { history } from "./redux/configStore";
import Header from "./Header"
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Detail from "./Detail";
import Write from "./Write";
import Error from "./Error";


function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
      <Header />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Main} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/write" exact component={Write} />
        <Route path="/write/:id" exact component={Write} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/error" exact component={Error} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
