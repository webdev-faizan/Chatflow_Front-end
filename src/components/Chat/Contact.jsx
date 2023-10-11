import { faker } from "@faker-js/faker";
import { toggleContactUs } from "../../redux/silice/contactusToogle";
import { useSelector, useDispatch } from "react-redux";
import { Start } from "@mui/icons-material";
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
} from "@mui/material";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Strategy,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React from "react";

const Contact = () => {
  const dispatch = useDispatch();
  const Tooglevalue = useSelector((state) => state.contactUsReducer.isToggled);

  return (
    <Box
      sx={{
        width: "320px",
        height: "100vh",
        display: `${Tooglevalue ? "block" : "none"}`,
      }}
    >
      <Box
        sx={{
          height: "100%",
          "border-radius": " 0px 0px 30px 0px",
          background: "#F8FAFF",
          "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          padding: "5px",
          overflow: "scroll",
          position: "fixed",
          right: 0,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={3} padding={2}>
            <Typography variant="subtitle2">Contact info</Typography>
            <IconButton onClick={() => dispatch(toggleContactUs())}>
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
          <Divider background="#A4A4A4" />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography>Hi there, I am using </Typography>
          </Stack>
          <Divider background="#A4A4A4" />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6">Media, links and docs</Typography>
            <Button endIcon={<CaretRight />}>401</Button>
          </Stack>
          <Stack spacing={0.6} direction={"row"}>
            {[1, 2, 3, 4].map(() => {
              return (
                <>
                  <img
                    src={faker.image.food()}
                    width={70}
                    height={79}
                    alt={faker.name.fullName()}
                  />
                </>
              );
            })}
          </Stack>
          <Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                <Star size={20} />
                <Typography> Starred Messages</Typography>
              </Stack>
              <CaretRight size={20} />
            </Stack>
          </Stack>
          <Divider background="#A4A4A4" />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Bell size={20} />
              <Typography> Mute Notifications</Typography>
            </Stack>
            <Switch />
          </Stack>
          <Divider background="#A4A4A4" />
          <Typography>1 group in common</Typography>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} />
            <Stack spacing={0.5}>
              <Typography>{faker.name.fullName()}</Typography>
              <Typography>{faker.name.firstName()}</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={0.3}>
            <Button
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
              sx={{ textTransform: "unset" }}
            >
              Block
            </Button>
            <Button
              variant="outlined"
              startIcon={<Trash />}
              fullWidth
              sx={{ textTransform: "unset" }}
            >
              Block
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
