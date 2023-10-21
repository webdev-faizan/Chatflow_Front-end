import React from "react";
import { faker } from "@faker-js/faker";
import { Typography, Stack, IconButton, Avatar, Divider } from "@mui/material";
const SelectConverstion = () => {
  return (
    <Stack
      flexGrow={1}
      sx={{ background: "" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack spacing={0.5}>
        <img
          src={faker.image.abstract()}
          width={287}
          height={287}
          style={{ objectFit: "cover" }}
          alt=""
        />
        <Stack direction={"row"} gap={0.4}>
          <Typography color={"#000"}>
            Select a conversation or start a{" "}
          </Typography>
          <Typography color={"#5B96F7"}>new one</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SelectConverstion;
