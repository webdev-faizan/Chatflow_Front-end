import React, { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";
import Contact from "../components/Chat/Contact";
import SharedMessages from "../components/Chat/SharedMessages";
import { useSelector } from "react-redux";
import StartMessages from "../components/Chat/StarMessages";
import { connectSocket, socket } from "../socket";
import { Cookies } from "react-cookie";
import { showSnackBar } from "../redux/app";
import { useDispatch } from "react-redux";

export const GeneralApp = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const disptach = useDispatch();
  const sideBar = useSelector((state) => state.app.sideBar);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, [sideBar.type]);

  useEffect(() => {
    if (token && token != undefined && token !== null) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#load";
          window.location.reload();
        }
      };
      window.onload();
    }
    if (!socket) {
      connectSocket();
    }
    socket?.on("friend_request_sent", (data) => {
      disptach(showSnackBar({ open: true, message: data?.message }));
    });
    socket?.on("new_friend_request", (data) => {
      alert('new friend request')
      console.log({ newFriendRequst: "newFriendRequst", data });
    });
   
    socket?.on("friend_request_accepted", (data) => {
      disptach(showSnackBar({ open: true, message: data?.message }));
    });
   
    return () => {
      socket?.off("friend_request_accepted");
      socket?.off("new_friend_request");
      socket?.off("friend_request_sent");
    };
  }, [socket]);

  return (
    <div>
      <Stack direction={"row"} sx={{ position: "fixed", left: "130px" }}>
        <Chart />
      </Stack>

      <Stack direction={"row"}>
        <Stack direction={"column"} sx={{ marginLeft: "370px" }}>
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
