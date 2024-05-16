import { Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import EmailVerification from "../pages/auth/EmailVerification";
import NotFoundPage from "../components/NotFoundPage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
