import { Grid, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import {
  CircleDashed,
  Phone,
  ArrowUpRight,
  VideoCamera,
  XCircle,
} from "phosphor-react";
import {
  Box,
  Stack,
  IconButton,
  Divider,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";

import { calllog } from "../../data/calllog";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Callhistory = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      spacing={2}
      sx={{
        width: "360px",
        height: "100vh",
        "border-radius": " 0px 0px 30px 0px",
        background: "#F8FAFF",
        "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        overflow: "scroll",
        padding: "10px",
        paddingTop: "35px",
      }}
    >
      {/*  */}
      <Stack direction={"column"} spacing={3}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#000",
              fontFamily: "Manrope",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
            }}
          >
            Call Log
          </Typography>
        </Stack>
      </Stack>
      <Search sx={{ width: "100%", background: "#EAF2FE" }}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "#709CE6" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search"
          sx={{
            color: "#709CE6",
            "font-size": "16px",
            "font-weight": 600,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Typography color={"#709CE6"}>Start new converstaion</Typography>
        <IconButton onClick={handleOpen}>
          <Phone color="#709CE6" />
        </IconButton>
      </Stack>
      <Divider />
      {/*  */}
      {calllog.map((ele, index) => {
        const { audio, id, img, missed, name, video } = ele;
        return (
          <Stack
            key={index}
            direction={"row"}
            sx={{
              height: "81px",
              borderRadius: "15px",
              background: "#FFF",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Avatar
                sx={{ width: "48px", height: "48px" }}
                alt="Nemy Sharp"
                src={img}
              />
              <Stack height={"48px"}>
                <Typography variant="body1">{name}</Typography>
                <Stack direction={"row"} alignItems={"center"}>
                  <IconButton>
                    <ArrowUpRight
                      size={24}
                      color={`${missed ? "#D45E6C" : "#76D45E"}`}
                    />
                  </IconButton>
                  <Typography variant="caption">Yesterday, 21:29</Typography>
                </Stack>
              </Stack>
            </Stack>
            <IconButton>
              {audio ? (
                <Phone size={24} color="#76D45E" />
              ) : (
                <VideoCamera size={24} color="#76D45E" />
              )}
            </IconButton>
          </Stack>
        );
      })}

      {/*  */}

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description"
        open={open}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box>
              <Search sx={{ width: "100%", background: "#EAF2FE" }}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#709CE6" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  sx={{
                    color: "#709CE6",
                    "font-size": "16px",
                    "font-weight": 600,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
            <XCircle size={24} onClick={() => handleClose()} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          {calllog.map((ele, index) => {
            const { img, name } = ele;
            return (
              <Stack
                key={index}
                direction={"row"}
                sx={{
                  height: "81px",
                  borderRadius: "15px",
                  background: "#FFF",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Avatar
                    sx={{ width: "48px", height: "48px" }}
                    alt="Nemy Sharp"
                    src={img}
                  />
                  <Stack height={"48px"}>
                    <Typography variant="body1">{name}</Typography>
                    <Typography variant="caption">Yesterday, 21:29</Typography>
                  </Stack>
                </Stack>

                <Stack spacing={"20px"} direction={"row"}>
                  <IconButton>
                    <VideoCamera size={24} color="#76D45E" />
                  </IconButton>
                  <IconButton>
                    <Phone size={24} color="#76D45E" />
                  </IconButton>
                </Stack>
              </Stack>
            );
          })}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Callhistory;
