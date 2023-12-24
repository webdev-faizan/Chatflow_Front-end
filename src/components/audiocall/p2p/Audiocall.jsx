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
import { CallNotifcation, ShowAudio } from "../../../redux/app";

const Audiocall = forwardRef((props, ref) => {
  const [state, setState] = useState(false);

  const { sentMessageInfo, showAudio } = useSelector((state) => state.app);
  const { incoming } = useSelector((state) => state.video);
  const userVideo = useRef();
  const [signal, setSignal] = useState("");
  const connectionRef = useRef();
  const [id, setId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const sound = new Howl({
      src: ["/mixkit-happy-bells-notification-937.wav"],
    });

    socket?.on("calluser_audio", ({ signal, to }) => {
      if (!incoming) {
        sound.play();
        setState(true);
        setId(to);
        setSignal(signal);
        setTimeout(() => {
          setState(false);
        }, 20000);
      } else {
        socket.emit("busy_another_call", { id: to });
      }
    });
    socket?.on("audio_call_end", ({ message }) => {
      alert('')
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
  // const [isMuted, setIsMuted] = useState([]);
  const [activeStreams_1, setActiveStreams_1] = useState();
  const [activeStreams_2, setActiveStreams_2] = useState();

  const requesAudioToCallUser = async () => {
    dispatch(ShowAudio(true));
    dispatch(incomingCall(true));
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // activeStreams_1(stream);
        peer1 = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });

        peer1.on("signal", (data) => {
          socket.emit("calluser_audio", {
            userToCall: sentMessageInfo.from,
            token,
            signalData: data,
          });
        });

        peer1.on("stream", (remoteStream) => {
          userVideo.current.srcObject = remoteStream;
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

  const handleAudioAcceptCall = () => {
    dispatch(ShowAudio(true));
    dispatch(incomingCall(true));
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        peer2 = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        // activeStreams_2(stream);

        peer2.on("signal", (data) => {
          socket.emit("answerCall", {
            signal: data,
            caluserinfo: id,
          });
        });

        peer2.on("stream", (remoteStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = remoteStream;
          }
        });

        peer2.signal(signal);
        connectionRef.current = peer2;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useImperativeHandle(ref, () => ({
    requesAudioToCallUser: requesAudioToCallUser,
  }));
  const endCall = async () => {
    try {
      const sound = new Howl({
        src: ["/error-warning-login-denied-132113.mp3"],
      });
      sound.play();
      dispatch(ShowAudio(false));
      dispatch(incomingCall(false));
      // console.log(isMuted);
      activeStreams_1.getTracks().forEach((track) => track.stop());
      activeStreams_2.getTracks().forEach((track) => track.stop());

      socket.emit("audio_call_end", { id });

      if (peer1) {
        peer1.destroy();
      }
      if (peer2) {
        peer2.destroy();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            // display: "none",
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
              <audio ref={userVideo} autoPlay loop></audio>
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
                <Avatar
                  sx={{ width: "100px", height: "100px" }}
                  alt={"Faizan ALi"}
                  src="FA A"
                />
                <Avatar
                  sx={{ width: "100px", height: "100px" }}
                  alt={"Faizan ALi"}
                  src="FA A"
                />
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
