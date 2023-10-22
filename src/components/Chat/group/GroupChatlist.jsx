import { Typography, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import { XCircle } from "phosphor-react";
import Autocomplete from "@mui/material/Autocomplete";

import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { CircleDashed, ArchiveBox } from "phosphor-react";
import { Box, Stack, IconButton, Divider, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import GroupList from "./GroupList";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const GroupChatlist = () => {
  const [isArcived, SetIsArcived] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
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
            <Typography id="modal-modal-title" variant="h6">
              Create New Group
            </Typography>
            <XCircle size={24} onClick={() => handleClose()} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ position: "relative", height: "inherit" }}>
              <Stack spacing={2} mt={4}>
                <TextField
                  id="outlined-basic"
                  label="
              Group Name"
                  variant="outlined"
                />
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={[{ title: "faizan" }, { title: "ali" }]}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="filterSelectedOptions"
                      placeholder="Favorites"
                    />
                  )}
                />
                <Button
                  variant="outlined"
                  sx={{
                    background: "#5B96F7",
                    color: "white",
                    ":hover": {
                      background: "#5B96F7",
                    },
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Box component={"section"}>
        <Box
          sx={{
            height: "100vh",
            overflow: "hidden",
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
                Groups
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography color={"#709CE6"}>Create New Group</Typography>
              <IconButton fontSize="24px" color={"#709CE6"}>
                <Typography
                  color={"#709CE6"}
                  fontSize="24px"
                  onClick={handleOpen}
                >
                  +
                </Typography>
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
          <GroupList />
        </Box>
      </Box>
    </>
  );
};

export default GroupChatlist;
