import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Chart from "./Chart";
import Conversion from "../components/Chat/Conversion";
import Message from "../components/Chat/message";
import { connectSocket, socket } from "../socket";
import { Cookies } from "react-cookie";
import {
  SelectConversation,
  showSnackBar,
  CallNotifcation,
  ShowVideo,
  ShowAudio,
} from "../redux/app";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import {
  FetchDirectConversion,
  UpdateCurrentMessage,
} from "../redux/silice/conversions";
import { incomingCall } from "../redux/silice/videocall";

const GeneralApp = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const disptach = useDispatch();
  const soundAngery = new Howl({
    src: ["/ error-warning-login-denied-132113.mp3"],
  });
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
      const sound = new Howl({
        src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
      });
      sound.play();
      disptach(showSnackBar({ open: true, message: data?.message }));
    });
    socket?.on("new_friend_request", (data) => {
      const sound = new Howl({
        src: ["/mixkit-happy-bells-notification-937.wav"],
      });
      sound.play();
    });

    socket?.on("friend_request_accepted", (data) => {
      const sound = new Howl({
        src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
      });
      sound.play();
      disptach(showSnackBar({ open: true, message: data?.message }));
    });

    socket?.on("start_chat", (data) => {
      disptach(SelectConversation(data._id));
    });
    socket?.emit("get_direct_conversions", { token }, (data, userId) => {
      disptach(FetchDirectConversion(data, userId));
    });

    socket?.on("new_message", (data) => {
      if (token != data.token) {
        const sound = new Howl({
          src: ["/mixkit-happy-bells-notification-937.wav"],
        });
        sound.play();
      }

      disptach(UpdateCurrentMessage(data));
      socket?.emit("get_direct_conversions", { token }, (data, userId) => {
        disptach(FetchDirectConversion(data, userId));
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
    //! user notifcation about call
    socket.on("busy_another_call", ({ message }) => {
      soundAngery.play();
      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });

    socket.on("user_offline", ({ message }) => {
      soundAngery.play();

      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });
    socket.on("call_denied", ({ message }) => {
      disptach(ShowVideo(false));
      disptach(ShowAudio(false));
      disptach(incomingCall(false));
      soundAngery.play();
      disptach(CallNotifcation({ ShowCallNotifcation: true, message }));
    });

    return () => {
      socket?.off("friend_request_accepted");
      socket?.off("start_chat");
      socket?.off("new_friend_request");
      socket?.off("friend_request_sent");
      socket?.off("get_direct_conversions");
      socket?.off("new_message");
    };
  }, [socket]);

  return (
    <Box>
      <Stack direction={"row"} sx={{ position: "fixed", left: "100px" }}>
        <Chart />
      </Stack>
      <Stack direction={"row"}>
        <Stack
          direction={"column"}
          sx={{ marginLeft: "460px", marginTop: "110px" }}
        >
          <Conversion />
          <Box>
            <Message />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GeneralApp;
