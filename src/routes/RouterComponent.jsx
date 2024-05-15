import { Route, Routes } from "react-router-dom";
import SettingRoute from "./settingRoute/SettingRoute";
import { Box } from "@mui/material";
import React, { createContext, useRef } from "react";
import GeneralApp from "../chat/GeneralApp";
import Group from "../pages/group/Group";
import Callhistory from "../pages/call/Callhistory";
import Profile from "../pages/Profile";
import Index from "../layout/Dashboard/SideNav";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Videocall from "../components/videocalling/p2p/Videocall";
import SnackbarCallInfo from "../components/SnackbarCallInfo";
import Audiocall from "../components/audiocall/p2p/Audiocall";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import EmailVerification from "../pages/auth/EmailVerification";
export const P2PCallContext = createContext();

const RouterComponent = () => {
  const videocallRef = useRef();
  const audiocallRef = useRef();
  const isLoginPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup";
  const indexComponent = isLoginPage ? null : (
    <Box sx={{ position: "fixed", left: 0 }}>
      <Index />
    </Box>
  );
  const requestCall = (callRequestType) => {
    if (callRequestType === "VIDEO_CALL") {
      videocallRef.current.requestVideoToCallUser();
    } else if (callRequestType === "AUDIO_CALL") {
      audiocallRef.current.requesAudioToCallUser();
    }
  };

  return (
    <>
      <Videocall ref={videocallRef} />
      <Audiocall ref={audiocallRef} />
      <P2PCallContext.Provider value={{ requestCall }}>
        {indexComponent}
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/new-password" element={<NewPassword />}></Route>
          <Route
            path="/verify-email"
            element={<EmailVerification />}
          ></Route>
          <Route path="/c/:id" element={<GeneralApp />}></Route>
          <Route path="/c" element={<GeneralApp />}></Route>
          <Route path="/group" element={<Group />}></Route>
          <Route path="/Callhistory" element={<Callhistory />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {SettingRoute.map((ele) => {
            const { Component, path } = ele;
            return <Route path={path} element={Component} />;
          })}
        </Routes>
      </P2PCallContext.Provider>
      <SnackbarCallInfo />
    </>
  );
};

export default RouterComponent;
