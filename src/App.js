import Index from "./layout/Dashboard";
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
function App() {
  return (
    <>
      <GeneralApp />
      {/* <Picker data={data} /> */}
    </>
  );
}

export default App;
