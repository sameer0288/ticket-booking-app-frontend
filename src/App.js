import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer position="top-left" autoClose={5000} hideProgressBar />
    </div>
  );
}

export default App;
