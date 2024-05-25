import { useLayoutEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const cookie = new Cookies();
    if (cookie.get("auth") && cookie.get("auth") != undefined) {
      navigate("/c");
    } else {
      navigate("/login");
    }
  });
};
export default Index;
