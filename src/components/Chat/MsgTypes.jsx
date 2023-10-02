import React from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
const TimeLine = ({ ele }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems="center"
    >
      <Divider width="46%" />
      <Typography variant="caption">{ele.text}</Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const TextMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          background: ele.incoming ? "#FFF" : "#5B96F7",
          borderRadius: "10px",
          width: "max-content",
          paddingX: "10px",
        }}
      >
        <Typography color={ele.incoming ? "#696969" : "#FFF"}>
          {ele.message}
        </Typography>
      </Box>
    </Stack>
  );
};

export { TextMsg, TimeLine };
