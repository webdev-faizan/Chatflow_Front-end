import React from "react";

import { StyledBadge } from "../StyledBadge";

import {
  Box,
  Stack,
  IconButton,
  Divider,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  Phone,
  VideoCamera,
  Smiley,
} from "phosphor-react";

const Conversion = () => {
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
      }}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
          height: "80px",
          padding: "5px 20px",
          background: "#F8FAFF",
          "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          sx={{
            height: "81px",
            "flex-shrink": 0,
            "border-radius": "15px",
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
                  color: "#000",
                  fontFamily: "Manrope",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "800",
                  background: "unset",
                  marginBottom: "3px",
                }}
              >
                Dog Hat
              </Typography>
              <Typography
                sx={{
                  color: "#696969",
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  background: "unset",
                }}
              >
                online
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* converions */}
        <Stack direction={"row"}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem></Divider>
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
      {/* user footer */}
      <Stack
        className="row"
        spacing={3}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <TextField
          fullwidth
          sx={{ width: "98%" }}
          placeholder="write a message..."
          inputProps={{
            disableUnderline: true,
            startAdorment: (
              <InputAdornment>
                <IconButton>
                  <LinkSimple></LinkSimple>
                </IconButton>
              </InputAdornment>
            ),
            endAdorment: (
              <InputAdornment>
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
      {/*  */}
      <Stack
  className="row"
  spacing={3}
  alignItems="center"
  sx={{ width: "100%" }}
>
  <TextField
    fullWidth // Corrected attribute name
    sx={{ width: "98%" }}
    placeholder="write a message..."
    inputProps={{
      disableUnderline: true,
      startAdornment: ( // Corrected attribute name
        <InputAdornment>
          <IconButton>
            <LinkSimple />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: ( // Corrected attribute name
        <InputAdornment>
          <IconButton>
            <Smiley />
          </IconButton>
        </InputAdornment>
      ),
    }}
  ></TextField>
</Stack>

    </Stack>
  );
};

export default Conversion;
