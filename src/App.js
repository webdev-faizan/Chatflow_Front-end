import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterComponent from "./routes/RouterComponent";
import DirectionSnackbar from "./components/Snackbar";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Box sx={{ marginLeft: "130px" }}> */}
      <RouterComponent />
      {/* </Box> */}
      <DirectionSnackbar />
    </>
  );
}

export default App;
