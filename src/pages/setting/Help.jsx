import React from "react";

import { Typography, Stack, IconButton, Avatar, Divider } from "@mui/material";
import {
  CaretLeft,
  LockKey,
  ChatCircleDots,
  Phone,
  LinkSimpleBreak,
  FingerprintSimple,
  MapPin,
  CircleDashed,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import SelectConverstion from "../../components/setting/SelectConverstion";
import { FingerprintRounded } from "@mui/icons-material";

const Help = () => {
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
          <Typography variant="h4">Help</Typography>
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
            <FingerprintSimple color="white" size={50} />
          </Stack>
        </Stack>
        <Stack spacing={3}>
          {/*  */}
          {[
            "Help Center",
            "Contact Us",
            "Licenses",
            "Terms and Privacy Policy",
          ].map((ele, index) => {
            return (
              <Stack spacing={1} key={index}>
                <Typography>{ele} </Typography>
                <Divider background="#A4A4A4" />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default Help;
