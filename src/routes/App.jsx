import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Nav />
      <BackBtn />
      <Outlet />
    </div>
  );
}

export default App;
