import React from "react";

import { Typography, Stack, IconButton, Avatar, Divider } from "@mui/material";
import {
  CaretLeft,
  LockKey,
  ChatCircleDots,
  Phone,
  LinkSimpleBreak,
  MapPin,
  CircleDashed,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import SelectConverstion from "../../components/setting/SelectConverstion";

const Security = () => {
  const navigate = useNavigate();

  return (
    <Stack direction={"row"}>
      <Stack
        spacing={4}
        width={384}
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
          <Typography variant="h4">Security</Typography>
        </Stack>
        <Stack alignItems={"center"}>
          <Stack
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
            width={95}
            height={95}
            sx={{
              background: "#5B96F7",
              borderRadius: "100%",
            }}
          >
            <LockKey color="white" size={24} />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="body1">
            Your Chats and calls are private
          </Typography>
          <Typography variant="caption">
            End-to-end encryption keeps your personal messages & call between
            you and person you choose to communicate with. Not even talk can
            read or listen to them. This includes your
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <ChatCircleDots size={24} />
            <Typography variant="caption">Text and voice messages</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Phone size={24} />

            <Typography variant="caption">Audio & Video Calls</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <MapPin size={24} />
            <Typography variant="caption">Location Sharing</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <LinkSimpleBreak size={24} />
            <Typography variant="caption">
              Photos, videos & documents
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <CircleDashed size={24} />
            <Typography variant="caption">Status Updates</Typography>
          </Stack>
        </Stack>
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default Security;
