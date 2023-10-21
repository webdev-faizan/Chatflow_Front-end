import React, { useState } from "react";

import {
  Typography,
  Stack,
  IconButton,
  Avatar,
  Divider,
  Checkbox,
} from "@mui/material";
import { CaretLeft, ClipboardText } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import SelectConverstion from "../../components/setting/SelectConverstion";

const Chatwallpaper = () => {
  const [bgColor, SetBgColor] = useState("#D9D9D9");
  const navigate = useNavigate();

  return (
    <Stack direction={"row"}>
      <Stack
        spacing={4}
        width={384}
        minHeight={"100vh"}
        sx={{
          background: "#F8FAFF",
          boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
          padding: "30px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton onClick={() => navigate(-1)}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography variant="h5">Set Chat Wallpaper</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>Enable Talk Doodle</Typography>
          <Checkbox />
        </Stack>
        <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
          <Stack
            width={100}
            height={100}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor="#D9D9D9"
            borderRadius={"10px"}
            onClick={() => SetBgColor("#D9D9D9")}
          >
            <Typography variant="body2">Default</Typography>
          </Stack>
          <Stack
            width={100}
            height={100}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor="#142324"
            borderRadius={"10px"}
            onClick={() => SetBgColor("#142324")}
          ></Stack>
          <Stack
            width={100}
            height={100}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor="#255740"
            borderRadius={"10px"}
            onClick={() => SetBgColor("#255740")}
          ></Stack>
        </Stack>
      </Stack>
      <Stack
        flexGrow={1}
        sx={{ background: bgColor }}
        justifyContent={"center"}
        alignItems={"center"}
      ></Stack>
    </Stack>
  );
};

export default Chatwallpaper;
