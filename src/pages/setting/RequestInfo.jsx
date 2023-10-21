import React from "react";

import { Typography, Stack, IconButton, Avatar, Divider } from "@mui/material";
import { CaretLeft, ClipboardText } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import SelectConverstion from "../../components/setting/SelectConverstion";

const RequestInfo = () => {
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
          <Typography variant="h5">Request Account Info</Typography>
        </Stack>
        <Stack alignItems={"center"}>
          <Stack
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
            width={150}
            height={150}
            sx={{
              background: "#5B96F7",
              borderRadius: "100%",
            }}
          >
            <ClipboardText size={24} />
          </Stack>
        </Stack>
        <Typography variant="body1">Request Report</Typography>
        <Divider background="#B4B4B4" />
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default RequestInfo;
