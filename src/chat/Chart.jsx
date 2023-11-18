import Slide from "@mui/material/Slide";
import { Grid, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CircleDashed, ArchiveBox, Users, XCircle } from "phosphor-react";
import { Box, Stack, IconButton, Divider } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Chatlist } from "../components/Chat/Chatlist";
import { FetchDirectConversion } from "../redux/silice/conversions";
import Friends from "../layout/Dashboard/Friends";
import { socket, token } from "../socket";
import { useDispatch } from "react-redux";
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

const Chart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const disptach = useDispatch();

  useEffect(() => {
    // socket?.emit("get_direct_conversions", { token }, (data, userId) => {
    //   disptach(FetchDirectConversion(data, userId));
    // });

    return () => {
      // socket?.off("get_direct_conversions");
    };
  }, [socket]);

  return (
    <Box component={"section"}>
      <Box
        sx={{
          height: "100vh",
          overflowY: "scroll",
          width: "360px",
          background: "#F8FAFF",
          "box-shadow": " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",

          padding: "10px 10px 30px",
        }}
      >
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
              Chats
            </Typography>
            <IconButton onClick={handleOpen}>
              <Users fontSize={24} />
            </IconButton>
            <IconButton>
              <CircleDashed fontSize={24} />
            </IconButton>
          </Stack>
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
        </Stack>

        <Divider
          sx={{
            width: "100%",
            height: "0.5px",
            background: "#B4B4B4",
            marginTop: "10px",
          }}
        />
        <Typography
          sx={{
            color: "#676667",
            fontFamily: "Manrope",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
            padding: "20px 0",
          }}
        >
          All Chats
        </Typography>
        <Chatlist />
      </Box>
      {/*  */}
      <Friends handleClose={handleClose} open={open} />
    </Box>
  );
};

export default Chart;

