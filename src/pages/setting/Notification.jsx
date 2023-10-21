import React from "react";
import { faker } from "@faker-js/faker";

import {
  Typography,
  Box,
  Stack,
  IconButton,
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  Switch,
  Checkbox,
} from "@mui/material";
import { CaretLeft, Bell } from "phosphor-react";
import SelectConverstion from "../../components/setting/SelectConverstion";
import { notification } from "../../data/setting";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Setting = () => {
  const naviage = useNavigate();
  return (
    <Stack direction={"row"} minHeight={"100vh"}>
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
          <IconButton onClick={() => naviage(-1)}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography variant="h4">Notifications</Typography>
        </Stack>
        {/*  */}
        <Stack spacing={2} direction={"column"} justifyContent={"start"}>
          {notification.map((ele, index) => {
            const { title, subTitle } = ele;
            const length = notification.length - 1;
            return (
              <>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={0.5}>
                    <Typography>{title} </Typography>
                    <Typography variant="caption">{subTitle}</Typography>
                  </Stack>
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{ color: "#5B96F7" }}
                  />
                </Stack>

                <Divider
                  sx={{
                    display: index == length ? "none" : "unset",
                  }}
                  background="#A4A4A4"
                />
              </>
            );
          })}
        </Stack>
        {/*  */}
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default Setting;
