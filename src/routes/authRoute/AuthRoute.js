import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AuthRoute;
