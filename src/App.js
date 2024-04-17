import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import List from "./Components/List/List";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />}></Route>
          <Route path="/list" element={<List />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
