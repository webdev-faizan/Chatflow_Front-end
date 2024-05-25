import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import React, { createContext, useRef } from "react";
import Chat from "../pages/Chat";
import SideNav from "../components/SideNav";
import Videocall from "../components/videocalling/p2p/Videocall";
import SnackbarCallInfo from "../components/SnackbarCallInfo";
import Audiocall from "../components/audiocall/p2p/Audiocall";
import NotFoundPage from "../components/NotFoundPage";
import Index from "../pages/Index";
export const P2PCallContext = createContext();
const IndexRoutes = () => {
  const videocallRef = useRef();
  const audiocallRef = useRef();
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
      <Box sx={{ position: "absolute", left: 0, top: 0 }}>
        <SideNav />
      </Box>
      <P2PCallContext.Provider value={{ requestCall }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/c" element={<Chat />} />
          <Route path="/c/:id" element={<Chat />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </P2PCallContext.Provider>
      <SnackbarCallInfo />
    </>
  );
};

export default IndexRoutes;
