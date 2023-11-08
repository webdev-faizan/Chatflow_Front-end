import Slide from "@mui/material/Slide";
import { Grid, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import { CircleDashed, ArchiveBox, Users, XCircle } from "phosphor-react";
import { Box, Stack, IconButton, Divider } from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { StyledBadge } from "../components/StyledBadge";
import { Chatlist } from "../components/Chat/Chatlist";

import Friends from "../layout/Dashboard/Friends";
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
  const [isArcived, SetIsArcived] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <ArchiveBox
              onClick={() => SetIsArcived(!isArcived)}
              style={{
                fontSize: "22px",
                color: "#676667",
              }}
            ></ArchiveBox>
            <Typography
              sx={{
                color: "#709CE6",
                "font-family": "Manrope",
                "font-size": "15px",
                "font-style": "normal",
                "font-weight": "700",
                "line-height": "normal",
              }}
            >
              Archived
            </Typography>
          </Stack>
        </Stack>

        {isArcived ? (
          <>
            <Typography
              sx={{
                color: "#676667",
                fontFamily: "Manrope",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "700",
                padding: "15px 0",
              }}
            >
              Pinned
            </Typography>
            <Box
              sx={{
                height: "81px",
                "flex-shrink": 0,
                "border-radius": "15px",
                // background: "#5B96F7",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  sx={{ width: "48px", height: "48px" }}
                  alt="Nemy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
              </StyledBadge>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "0 15px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#030303",
                      fontFamily: "Manrope",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "800",
                      background: "unset",
                      marginBottom: "10px",
                    }}
                  >
                    Dog Hat
                  </Typography>
                  <Typography
                    sx={{
                      color: "#7C7C7D",
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      background: "unset",
                    }}
                  >
                    It’s so quite outside
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#686768",
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                      marginBottom: "10px",
                    }}
                  >
                    9:36
                  </Typography>

                  <Badge
                    color="secondary"
                    badgeContent={1}
                    sx={{
                      position: "relative",
                      top: "3px",
                      left: "12px",
                    }}
                  ></Badge>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
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
