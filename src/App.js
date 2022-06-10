import { Routes, Route } from "react-router-dom";
import Header from "./Header"
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signup" exact element={<Signup/>} />
        </Routes>
    </div>
  );
}

export default App;
