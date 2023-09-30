import React, { useState } from "react";
import { StyledBadge } from "../StyledBadge";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Box,
  Stack,
  IconButton,
  Divider,
  Typography,
  Avatar,
  TextField,
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
  PaperPlaneTilt,
  Image,
  File,
  Camera,
  User,
} from "phosphor-react";

const Conversion = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [ShowAttachement, setShowAttachement] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const EmojiSelect = ({ native }) => {
    setInputValue(inputValue + native);
  };
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
      }}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        
        sx={{
          width: "100%",
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
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ width: "48px", height: "48px" }}
              alt="Nemy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </StyledBadge>
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
                Dog Hat
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
                online
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
      {/*  */}
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
              background: "#28a745",
              ":hover": {
                background: "#28a745",
              },
            }}
          >
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
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#5B96F7",
          }}
        >
          <PaperPlaneTilt size={25} color="white" />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Conversion;
