import React from "react";

import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from "./redux/configStore";
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
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Main} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/write" exact component={Write} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
