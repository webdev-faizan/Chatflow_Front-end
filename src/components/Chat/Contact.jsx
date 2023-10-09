import { faker } from "@faker-js/faker";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { Phone, VideoCamera, X } from "phosphor-react";
import React from "react";

const Contact = () => {
  return (
    <Box sx={{ width: "320px", height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          "border-radius": " 0px 0px 30px 0px",
          background: "#F8FAFF",
          "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          padding: "5px",
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={3} padding={2}>
            <Typography variant="subtitle2">Contact info</Typography>
            <IconButton>
              <X />
            </IconButton>
          </Stack>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} />
            <Stack alignItems={"center"} spacing={0.5}>
              <Typography>{faker.name.fullName()}</Typography>
              <Typography>+923180877271</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} spacing={4}>
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <IconButton>
                <Phone size={24} />
              </IconButton>

              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <IconButton>
                <VideoCamera size={24} />
              </IconButton>

              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
