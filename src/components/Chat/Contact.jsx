import { faker } from "@faker-js/faker";
import { toggleSidebar, updateSidebarTap } from "../../redux/app";
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
import { useDispatch } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={3} padding={2}>
        <Typography variant="subtitle2">Contact info</Typography>
        <IconButton onClick={() => dispatch(toggleSidebar())}>
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
        <Button
          onClick={() => dispatch(updateSidebarTap("SHARED"))}
          endIcon={<CaretRight />}
        >
          401
        </Button>
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
          <IconButton>
            <CaretRight
              size={20}
              style={{
                cursor: "pointer",
              }}
              onClick={() => dispatch(updateSidebarTap("STARRED"))}
            />
          </IconButton>
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
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default Contact;
