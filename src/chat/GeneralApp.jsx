import React from "react";
import { Box, Stack } from "@mui/material";

import Index from "../layout/Dashboard";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";

const GeneralApp = () => {
  return (
    <div>
      <Stack direction={"row"} sx={{ position: "fixed", left: "0" }}>
        <Index />
        <Chart />
      </Stack>
      <Stack direction={"column"} sx={{ marginLeft: "500px" }}>
        <Conversion />
        <Box sx={{ marginTop: "80px" }} padding="20px">
          <Message />
        </Box>
      </Stack>
    </div>
  );
};

export default GeneralApp;
