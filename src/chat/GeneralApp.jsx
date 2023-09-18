import React from "react";
import {
  Box,
  Stack,
  IconButton,
  Divider,
  Switch,
  Avatar,
  AppBar,
} from "@mui/material";
import Index from "../layout/Dashboard";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";

const GeneralApp = () => {
  return (
    <div>
      <Stack direction={"row"}>
        <Index />
        <Chart />
        <Conversion />
      </Stack>
    </div>
  );
};

export default GeneralApp;
