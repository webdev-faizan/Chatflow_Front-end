import { Route, Routes } from "react-router-dom";
import SettingRoute from "./settingRoute/SettingRoute";

import React from "react";
import GeneralApp from "../chat/GeneralApp";
import Group from "../pages/group/Group";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<GeneralApp />}></Route>
      <Route path="/group" element={<Group />}></Route>
      {SettingRoute.map((ele) => {
        const { Component, path } = ele;
        return <Route path={path} element={Component} />;
      })}
    </Routes>
  );
};

export default RouterComponent;
