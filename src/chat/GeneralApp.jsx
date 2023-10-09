import React from "react";
import { Box, Stack } from "@mui/material";

import Index from "../layout/Dashboard";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";
import Contact from "../components/Chat/Contact";

const GeneralApp = () => {
  return (
    <div>
      <Stack direction={"row"} sx={{ position: "fixed", left: "0" }}>
        <Index />
        <Chart />
      </Stack>
      <Stack direction={"row"}>
        <Stack direction={"column"} sx={{ marginLeft: "500px" }}>
          <Conversion />
          <Box sx={{ marginY: "80px" }} padding="20px" overflow={"scroll"}>
            <Message />
          </Box>
        </Stack>
        <Contact />
      </Stack>
    </div>
  );
};

export default GeneralApp;
