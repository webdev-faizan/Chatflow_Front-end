import React, { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";

import Index from "../layout/Dashboard";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";
import Contact from "../components/Chat/Contact";
import SharedMessages from "../components/Chat/SharedMessages";
import { useSelector, useDispatch } from "react-redux";
import StartMessages from "../components/Chat/StarMessages";

const GeneralApp = () => {
  const sideBar = useSelector((state) => state.app.sideBar);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, [sideBar.type]);
  return (
    <div>
      <Stack direction={"row"} sx={{ position: "fixed", left: "130px" }}>
        <Chart />
      </Stack>
      
      <Stack direction={"row"}>
        <Stack direction={"column"} 
        sx={{ marginLeft: "370px" }}>
          <Conversion />
          <Box sx={{ marginY: "80px" }} padding="20px" overflow={"scroll"}>
            <Message />
          </Box>
        </Stack>


        <Box
          sx={{
            width: "320px",
            height: "100vh",
            display: `${sideBar.open ? "block" : "none"}`,
          }}
        >
          <Box
            ref={ref}
            id="scrll"
            sx={{
              width: "inherit",
              height: "100%",
              "border-radius": " 0px 0px 30px 0px",
              background: "#F8FAFF",
              "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "5px",
              overflow: "scroll",
              position: "fixed",
              right: 0,
            }}
          >
            {(() => {
              switch (sideBar.type) {
                case "CONTACT":
                  return <Contact />;
                case "SHARED": {
                  return <SharedMessages />;
                }
                case "STARRED":
                  return <StartMessages />;
                default:
                  return null;
              }
            })()}
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export default GeneralApp;
