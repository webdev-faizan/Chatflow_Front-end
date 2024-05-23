import React, { useContext, useState } from "react";
import { StyledBadge } from "../StyledBadge";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import { Howl } from "howler";
import Box from "@mui/joy/Box";

import {
  Stack,
  IconButton,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import {
  LinkSimple,
  Phone,
  VideoCamera,
  Smiley,
  File,
  Image,
  PaperPlaneTilt,
} from "phosphor-react";
import { socket, token } from "../../socket";
import SelectConverstion from "../SelectConverstion";
import { P2PCallContext } from "../../routes/IndexRoutes";
import { uploadUserAssest } from "../../service/uploadUserAssest.js";
const Conversion = () => {
  const { requestCall } = useContext(P2PCallContext);
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
  // const handleAssestUpload = async () => {
  //   let formData = new FormData();
  //   formData.append("file", Assest);
  //   formData.append("cloud_name", "dkhgfsefj");
  //   formData.append("upload_preset", "chating");

  //   try {
  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/dkhgfsefj/upload",
  //       {
  //         method: "POST",

  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();
  //     setLink(result.url);
  //     setError(false);

  //     return {
  //       link: result?.url,
  //       fileName: result?.original_filename,
  //     };
  //   } catch (error) {
  //     setError(true);
  //     formData = {};
  //     return {
  //       link: null,
  //       fileName: null,
  //     };
  //   }
  // };

  const sendMsg = async () => {
    //! image message
    if (Assest) {
      const { link, fileName } = await uploadUserAssest();
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
