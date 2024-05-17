import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import DirectionSnackbar from "./components/Snackbar";

function App() {
  return (
    <>
      <ToastContainer />
      <DirectionSnackbar />
      <Routes />
    </>
  );
}

export default App;
