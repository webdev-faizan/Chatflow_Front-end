import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { socket, token } from "../../../socket";
import { Howl } from "howler";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { PhoneDisconnect } from "phosphor-react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { Avatar, IconButton } from "@mui/material";
import RingingCall from "../../Ringingcall";
import { incomingCall } from "../../../redux/silice/videocall";
import {
  CallNotifcation,
  SetCallUserInfo,
  ShowAudio,
} from "../../../redux/app";

const Audiocall = forwardRef((props, ref) => {
  const [state, setState] = useState(false);
  const { sentMessageInfo, showAudio } = useSelector((state) => state.app);
  const {
    userInfo: { name, avatar: profile },
  } = useSelector((state) => state.conversions);
  const [isCallUser, setIsCallUser] = useState(false);
  const [isCallAccept, setIsAccept] = useState(false);
  const {
    userInfo: { fullname, avatar },
    callUserInfo: { Username, profileImage },
  } = useSelector((state) => state.app);
  const { incoming } = useSelector((state) => state.video);
  const connectionRef = useRef();
  const userAudio = useRef();
  const [id, setId] = useState();
  const [signal, setSignal] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const sound = new Howl({
      src: ["/mixkit-happy-bells-notification-937.wav"],
    });

    socket?.on("calluser_audio", ({ signal, to, avatar, fullname }) => {
      if (!incoming) {
        sound.play();
        setState(true);
        setId(to);
        setSignal(signal);
        dispatch(SetCallUserInfo({ Username: fullname, profileImage: avatar }));
      } else {
        socket.emit("busy_another_call", { id: to });
      }
    });
    socket?.on("audio_call_end", ({ message }) => {
      dispatch(ShowAudio(false));
      dispatch(incomingCall(false));
      dispatch(CallNotifcation({ ShowCallNotifcation: true, message }));
    });
    return () => {
      socket?.off("calluser_audio");
      socket?.off("busy_another_call");
      socket?.off("callAccepted");
    };
  }, [socket]);

  let peer1;
  let peer2;
  const requesAudioToCallUser = async () => {
    dispatch(SetCallUserInfo({ Username: name, profileImage: profile }));

    dispatch(ShowAudio(true));
    setIsCallUser(true);
    dispatch(incomingCall(true));

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        peer1 = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });

        peer1?.on("signal", (data) => {
          socket.emit("calluser_audio", {
            userToCall: sentMessageInfo.from,
            token,
            signalData: data,
            fullname,
            avatar,
          });
        });
        peer1?.on("close", () => {
          stream.getTracks().forEach((track) => track.stop());
          dispatch(ShowAudio(false));
          dispatch(incomingCall(false));
          setIsCallUser(false);
          setIsAccept(false);
          peer1.destroy();
        });
        peer1.on("error", (err) => {
          console.error("Error in peer connection:", err);
          peer1.destroy();
        });
        peer1?.on("stream", (remoteStream) => {
          userAudio.current.srcObject = remoteStream;
        });

        socket.on("callAccepted", (signal) => {
          peer1.signal(signal);
        });

        connectionRef.current = peer1;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAudioAcceptCall = async () => {
    dispatch(ShowAudio(true));
    setIsAccept(true);
    setIsCallUser(false);
    dispatch(incomingCall(true));
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        peer2 = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        peer2?.on("signal", (data) => {
          socket.emit("answerCall", {
            signal: data,
            caluserinfo: id,
          });
        });
        peer2.on("close", () => {
          dispatch(ShowAudio(false));
          dispatch(incomingCall(false));
          stream.getTracks().forEach((track) => track.stop());
          setIsCallUser(false);
          setIsAccept(false);
          peer2.destroy();
        });
        peer2.on("error", (err) => {
          console.error("Error in peer connection:", err);
          peer2.destroy();
        });
        peer2?.on("stream", (remoteStream) => {
          if (userAudio.current) {
            userAudio.current.srcObject = remoteStream;
          }
        });

        peer2?.signal(signal);
        connectionRef.current = peer2;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useImperativeHandle(ref, () => ({
    requesAudioToCallUser: requesAudioToCallUser,
  }));
  async function endCall() {
    try {
      const sound = new Howl({
        src: ["/error-warning-login-denied-132113.mp3"],
      });
      sound.play();
      dispatch(ShowAudio(false));
      dispatch(incomingCall(false));
      connectionRef?.current?.destroy();
      socket.emit("audio_call_end", { id });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        background: "red",
      }}
    >
      <RingingCall
        id={id}
        state={state}
        setState={setState}
        handleAcceptCall={handleAudioAcceptCall}
      />
      {showAudio && (
        <Box
          sx={{
            zIndex: 289,
            position: "fixed",
            right: "28px",
            top: "10px",
          }}
        >
          <Card
            sx={{
              width: "480px",
              height: "250px",
              padding: "0",
              background: "purple",
            }}
          >
            <CardCover
              sx={{
                padding: "0",
              }}
            >
              <audio ref={userAudio} autoPlay loop></audio>
            </CardCover>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100%",
                  alignItems: "center",
                  padding: "0 40px",
                }}
              >
                {isCallUser && (
                  <>
                    <Avatar
                      sx={{ width: "100px", height: "100px" }}
                      alt={fullname}
                      src={avatar}
                    />
                    <Avatar
                      sx={{ width: "100px", height: "100px" }}
                      alt={Username}
                      src={profileImage}
                    />
                  </>
                )}
                {isCallAccept && (
                  <>
                    <Avatar
                      sx={{ width: "100px", height: "100px" }}
                      alt={fullname}
                      src={avatar}
                    />
                    <Avatar
                      sx={{ width: "100px", height: "100px" }}
                      alt={Username}
                      src={profileImage}
                    />
                  </>
                )}
              </Box>

              <Box
                textAlign={"center"}
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                marginTop={"auto"}
                paddingBottom={"10px"}
              >
                <IconButton
                  onClick={() => endCall()}
                  sx={{
                    background: "#CC3C3C",
                    width: "70px",
                    height: "37px",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "#CC3C3C",
                    },
                  }}
                >
                  <PhoneDisconnect size={27} color="white" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
});

export default Audiocall;
