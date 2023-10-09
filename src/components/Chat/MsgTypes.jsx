import React, { useState } from "react";
import {
  Box,
  Stack,
  Divider,
  Typography,
  Link,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { DownloadSimple, Image, DotsThreeVertical } from "phosphor-react";
import { message_options } from "../../data/index";
const DocMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.incoming ? "#d3d3d3fa" : "#5B96F7",

          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Image size={48} color="gray" />
            <Typography
              variant="caption"
              color={ele.incoming ? "#696969" : "#FFF"}
            >
              {" "}
              {ele.filename}
            </Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography color={ele.incoming ? "#696969" : "#FFF"}>
            {" "}
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};
const LinkMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.incoming ? "#d3d3d3fa" : "#5B96F7",

          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={1}>
          <img
            src={ele.preview}
            alt={ele.message}
            style={{ width: "201px", height: "183px" }}
          />
          <Typography variant="subtitle2">creating chating app</Typography>
          <Typography
            variant="subtitle2"
            component={Link}
            href={ele.link}
            target="_faizan"
          >
            Upwork
          </Typography>

          <Typography
            variant="subtitle2"
            color={ele.incoming ? "#696969" : "#FFF"}
          >
            yep
          </Typography>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const ReplyMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: "10px",
          background: ele.incoming ? "#d3d3d3fa" : "#5B96F7",

          width: "max-content",
          padding: "10px",
        }}
      >
        <Stack spacing={0.5}>
          <Stack
            direction={"column"}
            background={"#FFF"}
            // alignItems={"center"}
            borderRadius={1}
          >
            <Typography
              sx={{
                background: "white",
                paddingX: "10px",
                borderRadius: "4px",
              }}
            >
              {" "}
              {ele.reply}
            </Typography>
          </Stack>
          <Typography color={"white"}> {ele.message}</Typography>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const MediaMsg = ({ ele }) => {
  return (
    <Stack direction={"row"} justifyContent={ele.incoming ? "start" : "end"}>
      <Box
        sx={{
          borderRadius: "10px",
          width: "max-content",
          padding: "10px",
        }}
      >
        <img
          src={ele.img}
          alt="as"
          style={{ width: "201px", height: "183px" }}
        />
        <Typography variant="body2" color={ele.incoming ? "#696969" : "#FFF"}>
          {ele.message}
        </Typography>
      </Box>
      <MessageOption />
    </Stack>
  );
};

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
          background: ele.incoming ? "#d3d3d3fa" : "#5B96F7",
          borderRadius: "10px",
          width: "max-content",
          padding: "10px",
        }}
      >
        <Typography color={ele.incoming ? "#696969" : "#FFF"}>
          {ele.message}
        </Typography>
      </Box>
      <MessageOption />
    </Stack>
  );
};
const MessageOption = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack>
          {message_options.map((ele) => {
            return <MenuItem onClick={handleClose}>{ele.title}</MenuItem>;
          })}
        </Stack>
      </Menu>
    </>
  );
};
export { TextMsg, TimeLine, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
