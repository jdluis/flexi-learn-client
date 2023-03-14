import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import BackBtn from "../components/BackBtn";

function App() {
  return (
    <div className="App">
      <Nav />
      <BackBtn />
      <Outlet />
    </div>
  );
}

export default App;
