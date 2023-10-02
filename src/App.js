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
function App() {
  return (
    <>
      <GeneralApp />
    </>
  );
}

export default App;
