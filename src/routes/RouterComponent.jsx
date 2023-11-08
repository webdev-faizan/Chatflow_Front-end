import { Route, Routes, useNavigate } from "react-router-dom";
import SettingRoute from "./settingRoute/SettingRoute";
import { Box } from "@mui/material";
import React from "react";
import GeneralApp from "../chat/GeneralApp";
import Group from "../pages/group/Group";
import Callhistory from "../pages/call/Callhistory";
import Profile from "../pages/Profile";
import Index from "../layout/Dashboard";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

const RouterComponent = () => {
  const navigate = useNavigate();

  const isLoginPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup";

  // Conditionally render Index component
  const indexComponent = isLoginPage ? null : (
    <Box sx={{ position: "fixed", left: 0 }}>
      <Index />
    </Box>
  );

  return (
    <>
      {indexComponent}

      <Routes>
        {/* auth routes */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* index route */}
        <Route path="/" element={<GeneralApp />}></Route>
        <Route path="/group" element={<Group />}></Route>
        <Route path="/Callhistory" element={<Callhistory />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {SettingRoute.map((ele) => {
          const { Component, path } = ele;
          return <Route path={path} element={Component} />;
        })}
      </Routes>
    </>
  );
};

export default RouterComponent;
