import io, { connect } from "socket.io-client";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

let socket;
const token = cookie.get("auth");

const connectSocket = () => {
  socket = io("http://localhost:5000", {
    query: `user_token=${token}`,
  });
};

export { connectSocket, socket,token };
