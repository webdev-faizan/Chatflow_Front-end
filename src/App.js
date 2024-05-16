import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes/Routes";
import DirectionSnackbar from "./components/Snackbar";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Box sx={{ marginLeft: "130px" }}> */}
      <Routes />
      {/* </Box> */}
      <DirectionSnackbar />
    </>
  );
}

export default App;
