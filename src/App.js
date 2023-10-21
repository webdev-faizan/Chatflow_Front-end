import { faker } from "@faker-js/faker";
import Chart from "./chat/Chart";
import {
  Box,
  Stack,
  IconButton,
  Divider,
  Switch,
  Avatar,
  AppBar,
} from "@mui/material";
import GeneralApp from "./chat/GeneralApp";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Privacy from "./pages/setting/Privacy";
import RouterComponent from "./routes/RouterComponent";
// import Setting from "./pages/setting/Setting";
// import Setting from "./pages/setting/notification";
import Index from "./layout/Dashboard/index";

function App() {
  return (
    <>
      {/* <GeneralApp /> */}

      <Box sx={{position:"fixed",left:0}}>
        <Index />
      </Box>
      <Box sx={{marginLeft:"130px"}}>
        <RouterComponent />
      </Box>
      {/* <Picker data={data} /> */}
    </>
  );
}

export default App;
