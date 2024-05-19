// import Peer from "simple-peer";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { StyledBadge } from "../StyledBadge";
// import data from "@emoji-mart/data";
// import { useSelector } from "react-redux";
// import Picker from "@emoji-mart/react";
// import { useDispatch } from "react-redux";
// import { Howl } from "howler";
// import { PhoneDisconnect } from "phosphor-react";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardCover from "@mui/joy/CardCover";
// import CardContent from "@mui/joy/CardContent";
// import {
//   Stack,
//   IconButton,
//   Divider,
//   Typography,
//   Avatar,
//   TextField,
//   InputAdornment,
// } from "@mui/material";

// import {
//   CaretDown,
//   LinkSimple,
//   MagnifyingGlass,
//   Phone,
//   VideoCamera,
//   Smiley,
//   File,
//   Camera,
//   User,
//   Image,
//   PaperPlaneTilt,
// } from "phosphor-react";
// import { toggleSidebar } from "../../redux/app";
// import { socket, token } from "../../socket";
// import SelectConverstion from "../setting/SelectConverstion";
// import RingingCall from "../videocalling/p2p/Ringingcall";

// const Conversion = () => {
//   // const cld = new Cloudinary({cloud: {cloudName: 'dkhgfsefj'}});

//   const dispatch = useDispatch();
//   const { userInfo, newConversion } = useSelector((state) => state.conversions);

//   const [showPicker, setShowPicker] = useState(false);
//   const [ShowAttachement, setShowAttachement] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [Assest, setAssest] = useState(null);
//   const [link, setLink] = useState(null);
//   const EmojiSelect = ({ native }) => {
//     setInputValue(inputValue + native);
//   };
//   const { sentMessageInfo, sideBar } = useSelector((state) => state.app);
//   const [error, setError] = useState(false);
//   const [steam, setSteam] = useState(null);
//   const userVideo = useRef();
//   const myVideo = useRef();

//   useEffect(() => {
//     // requestToCallUser();
//   }, [socket]);

//   //! upload assests
//   const handleAssestUpload = async () => {
//     let formData = new FormData();
//     formData.append("file", Assest);
//     formData.append("cloud_name", "dkhgfsefj");
//     formData.append("upload_preset", "chating");

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dkhgfsefj/upload",
//         {
//           method: "POST",

//           body: formData,
//         }
//       );

//       const result = await response.json();
//       setLink(result.url);
//       setError(false);

//       return {
//         link: result?.url,
//         fileName: result?.original_filename,
//       };
//     } catch (error) {
//       setError(true);
//       formData = {};
//       return {
//         link: null,
//         fileName: null,
//       };
//     }
//   };

//   const sendMsg = async () => {
//     //! image message
//     if (Assest) {
//       const { link, fileName } = await handleAssestUpload();
//       if (error) {
//         return alert("fail to upload");
//       }

//       if (Assest.type.startsWith("image")) {
//         socket.emit("link_message", {
//           token,
//           from: sentMessageInfo.from,
//           conversation_id: sentMessageInfo.roomId,
//           type: "msg",
//           subType: "Media",
//           fileName,
//           link: link,
//           mimeType: "",
//           message: inputValue || inputValue === 0 ? inputValue : "",
//         });
//       } else {
//         socket.emit("link_message", {
//           token,
//           from: sentMessageInfo.from,
//           conversation_id: sentMessageInfo.roomId,
//           type: "msg",
//           fileName: "",
//           mimeType: "",
//           subType: "Document",
//           link: link,
//           message: inputValue,
//         });
//       }
//     }

//     // ! for text Link
//     //check is link or not
//     else if (
//       inputValue.startsWith("http://") ||
//       inputValue.startsWith("https://")
//     ) {
//       //sperate text or link
//       const linkPattern = /\b(?:https?|ftp):\/\/\S+\b/g;
//       const links = inputValue.match(inputValue) || [];
//       const textWithoutLinks = inputValue.replace(linkPattern, "");
//       //send link_message
//       socket.emit("link_message", {
//         token,
//         from: sentMessageInfo.from,
//         conversation_id: sentMessageInfo.roomId,
//         type: "msg",
//         subType: "Link",
//         link: links[0],
//         message: textWithoutLinks,
//       });
//     } else {
//       // ! for tet message
//       socket?.emit("text_message", {
//         token,
//         from: sentMessageInfo.from,
//         conversation_id: sentMessageInfo.roomId,
//         type: "Text",
//         message: inputValue,
//       });
//     }
//     const sound = new Howl({
//       src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
//     });
//     sound.play();

//     setInputValue("");
//   };
//   const [startVideoCalling, setStartVideoCalling] = useState(false);

//   const [signal, setSignal] = useState("");
//   const connectionRef = useRef();
//   const [state, setState] = useState(false);

//   useEffect(() => {
//     socket?.on("calluser", (data) => {
//       const sound = new Howl({
//         src: ["/mixkit-happy-bells-notification-937.wav"],
//       });
//       sound.play();
//       setState(true);
//       setSignal(data);
//     });
//     return () => {
//       socket?.off("calluser");
//       socket?.off("callAccepted");
//     };
//   }, [socket]);

//   const requestToCallUser = () => {
//     setStartVideoCalling(true);

//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((stream) => {
//         myVideo.current.srcObject = stream;

//         const peer1 = new Peer({
//           initiator: true,
//           trickle: false,
//           stream: stream,
//         });

//         peer1.on("signal", (data) => {
//           socket.emit("calluser", {
//             userToCall: sentMessageInfo.from,
//             signalData: data,
//           });
//         });

//         peer1.on("stream", (remoteStream) => {
//           userVideo.current.srcObject = remoteStream;
//         });

//         socket.on("callAccepted", (signal) => {
//           peer1.signal(signal);
//         });
//         peer1.on("error", () => {
//           peer1.destroy();
//         });

//         connectionRef.current = peer1;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleAcceptCall = () => {
//     setStartVideoCalling(true);

//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((stream) => {
//         myVideo.current.srcObject = stream;
//         const peer2 = new Peer({
//           initiator: false,
//           trickle: false,
//           stream: stream,
//         });

//         peer2.on("signal", (data) => {
//           socket.emit("answerCall", {
//             signal: data,
//             caluserinfo: sentMessageInfo.from,
//           });
//         });

//         peer2.on("stream", (remoteStream) => {
//           if (userVideo.current) {
//             userVideo.current.srcObject = remoteStream;
//           }
//         });
//         peer2.on("error", () => {
//           peer2.destroy();
//         });

//         peer2.signal(signal);
//         connectionRef.current = peer2;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleRejectCall = useCallback(() => {
//     // connectionRef.current.destroy();
//   }, []);
//   return (
//     <>
//       <RingingCall
//         state={state}
//         setState={setState}
//         handleAcceptCall={handleAcceptCall}
//       />

//       {startVideoCalling && (
//         <Box
//           sx={{
//             // display: "none",
//             zIndex: 289,
//             position: "fixed",
//             right: "28px",
//             top: "10px",
//           }}
//         >
//           <Card
//             sx={{
//               width: "480px",
//               height: "250px",
//               padding: "0",
//             }}
//           >
//             <CardCover
//               sx={{
//                 padding: "0",
//               }}
//             >
//               <video
//                 style={{
//                   width: "500px",
//                   // height:"400px"
//                 }}
//                 ref={userVideo}
//                 autoPlay
//                 loop
//                 // muted
//                 // poster="https://assets.codepen.io/6093409/river.jpg"
//               >
//                 <source
//                 // src="https://assets.codepen.io/6093409/river.mp4"
//                 // type="video/mp4"
//                 />
//               </video>
//             </CardCover>
//             <CardContent>
//               <Box>
//                 <video
//                   style={{
//                     display: "block",
//                     width: "150px",
//                     borderRadius: "10px",
//                     height: "100px",
//                     marginLeft: "auto",
//                     marginTop: "10px",
//                     position: "relative",
//                     right: "-11px",
//                   }}
//                   autoPlay
//                   muted
//                   ref={myVideo}
//                   // poster="https://assets.codepen.io/6093409/river.jpg"
//                 >
//                   <source
//                     src="https://assets.codepen.io/6093409/river.mp4"
//                     type="video/mp4"
//                   />
//                 </video>
//               </Box>

//               <Box
//                 textAlign={"center"}
//                 level="body-lg"
//                 fontWeight="lg"
//                 textColor="#fff"
//                 marginTop={"auto"}
//                 paddingBottom={"10px"}
//               >
//                 <IconButton
//                   onClick={handleRejectCall}
//                   sx={{
//                     background: "#CC3C3C",
//                     width: "70px",
//                     height: "37px",
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#CC3C3C",
//                     },
//                   }}
//                 >
//                   <PhoneDisconnect size={27} color="white" />
//                 </IconButton>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       <Stack
//         display={`${newConversion ? "flex" : "none"}`}
//         direction={"row"}
//         sx={{
//           justifyItems: "center",
//           width: `calc(100vw - 470px)`,
//           overflow: "hidden",
//           height: "90vh",
//         }}
//         alignItems={"center"}
//       >
//         <SelectConverstion />
//       </Stack>
//       <Stack
//         // display={"none"}
//         display={`${newConversion ? "none" : "block"}`}
//         direction={"column"}
//         sx={{
//           width: `calc(100vw - ${sideBar.open ? "781px" : "462px"})`,
//         }}
//         justifyContent={"space-between"}
//       >
//         <Stack
//           direction={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           sx={{
//             width: "inherit",
//             position: "fixed",
//             top: "0",
//             height: "80px",
//             padding: "5px 20px",
//             background: "#F8FAFF",
//             "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
//           }}
//         >
//           <Box
//             sx={{
//               height: "81px",
//               "flex-shrink": 0,
//               "border-radius": "15px",
//               display: "flex",
//               alignItems: "center",
//               padding: "0 10px",
//             }}
//           >
//             {userInfo?.online ? (
//               <StyledBadge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 variant="dot"
//                 sx={{
//                   opacity: `${userInfo?.online ? "100" : "0"}`,
//                 }}
//               >
//                 <Avatar
//                   sx={{ width: "48px", height: "48px" }}
//                   src={userInfo?.name}
//                   alt={userInfo?.name}
//                   onClick={() => dispatch(toggleSidebar())}
//                 />
//               </StyledBadge>
//             ) : (
//               <Avatar
//                 sx={{ width: "48px", height: "48px" }}
//                 src={userInfo.name}
//                 alt={userInfo?.name}
//                 onClick={() => dispatch(toggleSidebar())}
//               />
//             )}

//             <Box
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 justifyContent: "space-between",
//                 padding: "0 15px",
//               }}
//             >
//               <Box>
//                 <Typography
//                   sx={{
//                     color: "#000",
//                     fontFamily: "Manrope",
//                     fontSize: "16px",
//                     fontStyle: "normal",
//                     fontWeight: "800",
//                     background: "unset",
//                     marginBottom: "3px",
//                   }}
//                 >
//                   {userInfo?.name}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#696969",
//                     fontFamily: "Manrope",
//                     fontSize: "14px",
//                     fontStyle: "normal",
//                     fontWeight: "600",
//                     lineHeight: "normal",
//                     background: "unset",
//                   }}
//                 >
//                   {userInfo?.online && "online"}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//           {/* converions */}
//           <Stack direction={"row"}>
//             <IconButton onClick={requestToCallUser}>
//               <VideoCamera />
//             </IconButton>
//             <IconButton>
//               <Phone />
//             </IconButton>
//             <IconButton>
//               <MagnifyingGlass />
//             </IconButton>
//             <Divider orientation="vertical" flexItem></Divider>
//             <IconButton>
//               <CaretDown />
//             </IconButton>
//           </Stack>
//         </Stack>
//         {/* user footer */}
//         <Stack
//           className="row"
//           spacing={3}
//           direction={"row"}
//           paddingRight={"10px"}
//           alignItems={"center"}
//           sx={{ width: "inherit", position: "fixed", bottom: "3px" }}
//         >
//           <Box
//             display={"flex"}
//             gap={3}
//             alignItems="center"
//             sx={{ width: "inherit", paddingX: "1px", position: "relative" }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 right: "99px",
//                 bottom: "70px",
//                 display: `${showPicker ? "block" : "none"}`,
//               }}
//             >
//               <Picker
//                 data={data}
//                 emojiSize={20}
//                 onEmojiSelect={EmojiSelect}
//                 dynamicWidth={false}
//                 className="picker"
//               />
//             </Box>
//             {/*  */}
//             <Stack
//               spacing={1}
//               sx={{
//                 position: "absolute",
//                 left: "42px",
//                 bottom: "72px",

//                 display: `${ShowAttachement ? "flex" : "none"}`,
//               }}
//             >
//               <IconButton
//                 sx={{
//                   background: "#007bff",
//                   ":hover": {
//                     background: "#007bff",
//                   },
//                 }}
//               >
//                 <input
//                   style={{
//                     position: "absolute",
//                     width: "36px",
//                     height: "40px",
//                     top: "10px",
//                     opacity: "0",
//                   }}
//                   type="file"
//                   accept="application/*"
//                   size={"10MB"}
//                   onChange={(e) => setAssest(e.target.files[0])}
//                 />
//                 <File size={24} />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   background: "#6c757d",
//                   ":hover": {
//                     background: "#6c757d",
//                   },
//                 }}
//               >
//                 <User size={24} />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   position: "relative",
//                   background: "#28a745",
//                   ":hover": {
//                     background: "#28a745",
//                   },
//                 }}
//               >
//                 <input
//                   style={{
//                     position: "absolute",
//                     width: "36px",
//                     height: "40px",
//                     top: "10px",
//                     opacity: "0",
//                   }}
//                   type="file"
//                   accept="image/*"
//                   size={"10MB"}
//                   onChange={(e) => setAssest(e.target.files[0])}
//                 />
//                 <Image size={24} />
//               </IconButton>
//               <IconButton
//                 sx={{
//                   background: "#dc3545",
//                   ":hover": {
//                     background: "#dc3545",
//                   },
//                 }}
//               >
//                 <Camera size={24} />
//               </IconButton>
//             </Stack>
//             <Stack
//               sx={{
//                 background: "#F7F9FD",
//                 height: "80px",
//                 alignItems: "center",

//                 boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
//               }}
//               width={"inherit"}
//               direction={"row"}
//               paddingX={4}
//               position={"relative"}
//               bottom="-10px"
//               zIndex={100}
//             >
//               <Stack
//                 sx={{ alignItems: "center" }}
//                 width={"inherit"}
//                 direction={"row"}
//                 spacing={1}
//               >
//                 <TextField
//                   fullWidth
//                   placeholder="write a message..."
//                   sx={{
//                     background: "white",
//                     "&:hover": {
//                       outline: "none",
//                       border: "none",
//                     },
//                   }}
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   InputProps={{
//                     disableUnderline: true,
//                     // Corrected attribute name
//                     startAdornment: (
//                       <InputAdornment>
//                         <IconButton>
//                           <LinkSimple
//                             onClick={() => setShowAttachement(!ShowAttachement)}
//                           />
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment>
//                         <IconButton>
//                           <Smiley onClick={() => setShowPicker(!showPicker)} />
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 ></TextField>
//                 <IconButton
//                   onClick={sendMsg}
//                   alignItems={"center"}
//                   justifyContent={"center"}
//                   sx={{
//                     width: "48px",
//                     height: "48px",
//                     borderRadius: "12px",
//                     background: "#5B96F7",
//                     "&:hover": {
//                       background: "#5B96F7",
//                     },
//                   }}
//                 >
//                   <PaperPlaneTilt size={25} color="white" />
//                 </IconButton>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Stack>
//     </>
//   );
// };

// export default Conversion;
import React, { useContext, useState } from "react";
import { StyledBadge } from "../StyledBadge";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import { useDispatch } from "react-redux";
import { Howl } from "howler";
import Box from "@mui/joy/Box";

import {
  Stack,
  IconButton,
  Divider,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  Phone,
  VideoCamera,
  Smiley,
  File,
  Camera,
  User,
  Image,
  PaperPlaneTilt,
} from "phosphor-react";
import { toggleSidebar } from "../../redux/app";
import { socket, token } from "../../socket";
import SelectConverstion from "../SelectConverstion";
import { P2PCallContext } from "../../routes/IndexRoutes";
const Conversion = () => {
  const { requestCall } = useContext(P2PCallContext);
  // const cld = new Cloudinary({cloud: {cloudName: 'dkhgfsefj'}});
  const dispatch = useDispatch();
  const { userInfo, newConversion } = useSelector((state) => state.conversions);
  const [showPicker, setShowPicker] = useState(false);
  const [ShowAttachement, setShowAttachement] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [Assest, setAssest] = useState(null);
  const [link, setLink] = useState(null);
  const EmojiSelect = ({ native }) => {
    setInputValue(inputValue + native);
  };
  const { sentMessageInfo, sideBar } = useSelector((state) => state.app);
  const [error, setError] = useState(false);
  //! upload assests
  const handleAssestUpload = async () => {
    let formData = new FormData();
    formData.append("file", Assest);
    formData.append("cloud_name", "dkhgfsefj");
    formData.append("upload_preset", "chating");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkhgfsefj/upload",
        {
          method: "POST",

          body: formData,
        }
      );

      const result = await response.json();
      setLink(result.url);
      setError(false);

      return {
        link: result?.url,
        fileName: result?.original_filename,
      };
    } catch (error) {
      setError(true);
      formData = {};
      return {
        link: null,
        fileName: null,
      };
    }
  };

  const sendMsg = async () => {
    //! image message
    if (Assest) {
      const { link, fileName } = await handleAssestUpload();
      if (error) {
        return alert("fail to upload");
      }

      if (Assest.type.startsWith("image")) {
        socket.emit("link_message", {
          token,
          from: sentMessageInfo.from,
          conversation_id: sentMessageInfo.roomId,
          type: "msg",
          subType: "Media",
          fileName,
          link: link,
          mimeType: "",
          message: inputValue || inputValue === 0 ? inputValue : "",
        });
      } else {
        socket.emit("link_message", {
          token,
          from: sentMessageInfo.from,
          conversation_id: sentMessageInfo.roomId,
          type: "msg",
          fileName: "",
          mimeType: "",
          subType: "Document",
          link: link,
          message: inputValue,
        });
      }
    }

    // ! for text Link
    //check is link or not
    else if (
      inputValue.startsWith("http://") ||
      inputValue.startsWith("https://")
    ) {
      //sperate text or link
      const linkPattern = /\b(?:https?|ftp):\/\/\S+\b/g;
      const links = inputValue.match(inputValue) || [];
      const textWithoutLinks = inputValue.replace(linkPattern, "");
      //send link_message
      socket.emit("link_message", {
        token,
        from: sentMessageInfo.from,
        conversation_id: sentMessageInfo.roomId,
        type: "msg",
        subType: "Link",
        link: links[0],
        message: textWithoutLinks,
      });
    } else {
      // ! for tet message
      if (inputValue.length > 0) {
        socket?.emit("text_message", {
          token,
          from: sentMessageInfo.from,
          conversation_id: sentMessageInfo.roomId,
          type: "Text",
          message: inputValue,
        });
        setInputValue("");
      }
      const sound = new Howl({
        src: ["/mixkit-bubble-pop-up-alert-notification-2357.wav"],
      });
      sound.play();
    }
  };
  const { incoming } = useSelector((state) => state.video);

  return (
    <>
      <Stack
        display={`${newConversion ? "flex" : "none"}`}
        direction={"row"}
        sx={{
          justifyItems: "center",
          width: `calc(100vw - 470px)`,
          overflow: "hidden",
          height: "67vh",
        }}
        alignItems={"center"}
      >
        <SelectConverstion />
      </Stack>
      <Stack
        // display={"none"}

        display={`${newConversion ? "none" : "block"}`}
        direction={"column"}
        sx={{
          width: `calc(100vw - ${sideBar.open ? "781px" : "462px"})`,
        }}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            width: "inherit",
            position: "fixed",
            top: "0",
            height: "80px",
            padding: "5px 20px",
            background: "#F8FAFF",
            "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              height: "81px",
              "flex-shrink": 0,
              "border-radius": "15px",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {userInfo?.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  opacity: `${userInfo?.online ? "100" : "0"}`,
                }}
              >
                <Avatar
                  sx={{ width: "48px", height: "48px" }}
                  src={userInfo?.avatar}
                  alt={userInfo?.name}
                />
              </StyledBadge>
            ) : (
              <Avatar
                sx={{ width: "48px", height: "48px" }}
                src={userInfo?.avatar}
                alt={userInfo?.name}
              />
            )}

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                padding: "0 15px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#000",
                    fontFamily: "Manrope",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "800",
                    background: "unset",
                    marginBottom: "3px",
                  }}
                >
                  {userInfo?.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#696969",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    background: "unset",
                  }}
                >
                  {userInfo?.online && "online"}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* converions */}
          <Stack direction={"row"}>
            <IconButton
              disabled={incoming}
              onClick={() => requestCall("VIDEO_CALL")}
            >
              <VideoCamera />
            </IconButton>
            <IconButton
              disabled={incoming}
              onClick={() => requestCall("AUDIO_CALL")}
            >
              <Phone />
            </IconButton>
          </Stack>
        </Stack>
        {/* user footer */}
        <Stack
          className="row"
          spacing={3}
          direction={"row"}
          paddingRight={"10px"}
          alignItems={"center"}
          sx={{ width: "inherit", position: "fixed", bottom: "3px" }}
        >
          <Box
            display={"flex"}
            gap={3}
            alignItems="center"
            sx={{ width: "inherit", paddingX: "1px", position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                right: "99px",
                bottom: "70px",
                display: `${showPicker ? "block" : "none"}`,
              }}
            >
              <Picker
                data={data}
                emojiSize={20}
                onEmojiSelect={EmojiSelect}
                dynamicWidth={false}
                className="picker"
              />
            </Box>
            {/*  */}
            <Stack
              spacing={1}
              sx={{
                position: "absolute",
                left: "42px",
                bottom: "72px",

                display: `${ShowAttachement ? "flex" : "none"}`,
              }}
            >
              <IconButton
                sx={{
                  background: "#007bff",
                  ":hover": {
                    background: "#007bff",
                  },
                }}
              >
                <input
                  style={{
                    position: "absolute",
                    width: "36px",
                    height: "40px",
                    top: "10px",
                    opacity: "0",
                  }}
                  type="file"
                  accept="application/*"
                  size={"10MB"}
                  onChange={(e) => setAssest(e.target.files[0])}
                />
                <File size={24} />
              </IconButton>
              <IconButton
                sx={{
                  position: "relative",
                  background: "#28a745",
                  ":hover": {
                    background: "#28a745",
                  },
                }}
              >
                <input
                  style={{
                    position: "absolute",
                    width: "36px",
                    height: "40px",
                    top: "10px",
                    opacity: "0",
                  }}
                  type="file"
                  accept="image/*"
                  size={"10MB"}
                  onChange={(e) => setAssest(e.target.files[0])}
                />
                <Image size={24} />
              </IconButton>
            </Stack>
            <Stack
              sx={{
                background: "#F7F9FD",
                height: "80px",
                alignItems: "center",

                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              width={"inherit"}
              direction={"row"}
              paddingX={4}
              position={"relative"}
              bottom="-10px"
              zIndex={100}
            >
              <form
                style={{ width: "100%" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMsg();
                }}
              >
                <Stack
                  sx={{ alignItems: "center" }}
                  width={"inherit"}
                  direction={"row"}
                  spacing={1}
                >
                  <TextField
                    fullWidth
                    placeholder="write a message..."
                    sx={{
                      background: "white",
                      "&:hover": {
                        outline: "none",
                        border: "none",
                      },
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      // Corrected attribute name
                      startAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <LinkSimple
                              onClick={() =>
                                setShowAttachement(!ShowAttachement)
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <Smiley
                              onClick={() => setShowPicker(!showPicker)}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                  <Button type="submit">
                    <IconButton
                      // onClick={sendMsg}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "#5B96F7",
                        "&:hover": {
                          background: "#5B96F7",
                        },
                      }}
                    >
                      <PaperPlaneTilt size={25} color="white" />
                    </IconButton>
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Conversion;
