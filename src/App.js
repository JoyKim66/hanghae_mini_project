import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import { history } from "./redux/configStore";
import Header from "./Header"
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
