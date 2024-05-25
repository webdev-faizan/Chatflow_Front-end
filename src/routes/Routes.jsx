import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import IndexRoutes from "./IndexRoutes";
import { Cookies } from "react-cookie";

const Routes = () => {
  const cookie = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(cookie.get("auth") && cookie.get("auth") !== " undefined")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!cookie.get("auth")) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [location.pathname, cookie.get("auth")]);

  return <>{isAuthenticated ? <IndexRoutes /> : <AuthRoutes />}</>;
};
export default Routes;
// else if (location.pathname === "/") {
//   isAuthenticated ? navigate("/c") : navigate("/login");
// }
