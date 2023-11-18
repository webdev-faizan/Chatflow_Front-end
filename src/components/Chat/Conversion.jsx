import React, { useState } from "react";
import { StyledBadge } from "../StyledBadge";
import data from "@emoji-mart/data";
import { useSelector } from "react-redux";
import Picker from "@emoji-mart/react";
import { useDispatch } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";

import {
  Box,
  Stack,
  IconButton,
  Divider,
  Typography,
  Avatar,
  TextField,
  Popover,
  InputAdornment,
  useScrollTrigger,
} from "@mui/material";

import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  Phone,
  VideoCamera,
  Smiley,
  PaperPlaneRight,
  File,
  Camera,
  User,
  Image,
  PaperPlaneTilt,
} from "phosphor-react";
import { toggleSidebar } from "../../redux/app";
import { socket, token } from "../../socket";

const Conversion = () => {
  // const cld = new Cloudinary({cloud: {cloudName: 'dkhgfsefj'}});

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.conversions);

  const [showPicker, setShowPicker] = useState(false);
  const [ShowAttachement, setShowAttachement] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [Assest, setAssest] = useState(null);
  const [link, setLink] = useState(null);
  const EmojiSelect = ({ native }) => {
    setInputValue(inputValue + native);
  };
  const sideBar = useSelector((state) => state.app.sideBar.open);
  const { sentMessageInfo } = useSelector((state) => state.app);

  //! upload assests
  const handleAssestUpload = async () => {
    const formData = new FormData();
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
      return { link: result.url, fileName: result.original_filename };
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const sendMsg = async () => {
    //! image message

    if (Assest) {
      const { link, fileName } = await handleAssestUpload();
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
      socket?.emit("text_message", {
        token,
        from: sentMessageInfo.from,
        conversation_id: sentMessageInfo.roomId,
        type: "Text",
        message: inputValue,
      });
    }

    setInputValue("");
  };
  // const [image, setImage] = useState('');

  return (
    <Stack
      direction={"column"}
      sx={{
        width: `calc(100vw - ${sideBar ? "820px" : "510px"})`,
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
                src={userInfo?.name}
                alt={userInfo?.name}
                onClick={() => dispatch(toggleSidebar())}
              />
            </StyledBadge>
          ) : (
            <Avatar
              sx={{ width: "48px", height: "48px" }}
              src={userInfo.name}
              alt={userInfo?.name}
              onClick={() => dispatch(toggleSidebar())}
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
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem></Divider>
          <IconButton>
            <CaretDown />
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
          sx={{ width: "100%", paddingX: "30px", position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              right: "99px",
              bottom: "60px",
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
              bottom: "60px",

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
                background: "#6c757d",
                ":hover": {
                  background: "#6c757d",
                },
              }}
            >
              <User size={24} />
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
            <IconButton
              sx={{
                background: "#dc3545",
                ":hover": {
                  background: "#dc3545",
                },
              }}
            >
              <Camera size={24} />
            </IconButton>
          </Stack>

          <TextField
            fullWidth
            placeholder="write a message..."
            sx={{ background: "white" }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              disableUnderline: true,
              // Corrected attribute name
              startAdornment: (
                <InputAdornment>
                  <IconButton>
                    <LinkSimple
                      onClick={() => setShowAttachement(!ShowAttachement)}
                    />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <Smiley onClick={() => setShowPicker(!showPicker)} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <IconButton
            onClick={sendMsg}
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
        </Box>
      </Stack>
    </Stack>
  );
};

export default Conversion;
