import React, { useEffect } from "react";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Chat } from "phosphor-react";
import {
  FetchAllUsers,
  FetchFriends,
  FetchRequestToConnectedFriends,
} from "../redux/app";
import { useDispatch, useSelector } from "react-redux";
import { socket, token } from "../socket";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserElement = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(FetchAllUsers());
  }, []);
  const { alluser } = useSelector((state) => state.app);

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
      }}
      p={2}
    >
      <Stack spacing={2}>
        {alluser.map((ele, index) => {
          const { status, fullname, _id } = ele;
          return (
            <Stack
              key={_id}
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems={"center"} spacing={2}>
                {status == "online" ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt={"fa"} />
                  </StyledBadge>
                ) : (
                  <Avatar alt={"fa"} />
                )}
                <Stack spacing={0.3}>
                  <Typography variant="subtitle2">{fullname}</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Button
                  onClick={() =>
                    socket.emit("friendRequest", {
                      to: _id,
                      from: token,
                    })
                  }
                >
                  Send Request
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestElement = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(FetchRequestToConnectedFriends());
  }, []);
  const { requestToConnected } = useSelector((state) => state.app);

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,
      }}
      p={2}
    >
      <Stack spacing={2}>
        {requestToConnected.map((ele) => {
          // const { fullname, _id, status } = ele.recipeint;
          const { fullname, _id, status } = ele.sender;
          console.log(_id);
          return (
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems={"center"} spacing={2}>
                {" "}
                {status == "online" ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt={"fa"} />
                  </StyledBadge>
                ) : (
                  <Avatar alt={"fa"} />
                )}
                <Stack spacing={0.3}>
                  <Typography variant="subtitle2">{fullname}</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Button
                  onClick={() =>
                    socket.emit("friend_request_accept", {
                      _id,
                    })
                  }
                >
                  Accept Request
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </StyledChatBox>
  );
};

// FriendElement

const FriendElement = () => {
  const disptach = useDispatch();
  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    disptach(FetchFriends());
  }, []);

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,
      }}
      p={2}
    >
      <Stack spacing={2}>
        {friends?.map((ele) => {
          const { _id, fullname, status } = ele;

          return (
            <>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  {" "}
                  {status == "online" ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt="fa" />
                    </StyledBadge>
                  ) : (
                    <Avatar alt="fa" />
                  )}
                  <Stack spacing={0.3}>
                    <Typography variant="subtitle2">{fullname}</Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <IconButton
                    onClick={() =>
                      socket.emit("start_conversion", { token, from: _id })
                    }
                  >
                    <Chat />
                  </IconButton>
                </Stack>
              </Stack>
            </>
          );
        })}
      </Stack>
    </StyledChatBox>
  );
};

export { UserElement, FriendRequestElement, FriendElement };
