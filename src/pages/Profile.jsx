import {
  Stack,
  IconButton,
  Typography,
  Avatar,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { CaretDown } from "phosphor-react";
import React from "react";
import { faker } from "@faker-js/faker";

const Profile = () => {
  return (
    <div>
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
        <Stack spacing={6}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton>
              <CaretDown size={25} />
            </IconButton>
            <Typography variant="h5">Profile</Typography>
          </Stack>
          <Stack>
            <Avatar
              width="121px"
              height="121px"
              sx={{
                width: "121px",
                height: "121px",
                alignSelf: "center",
              }}
              src={faker.image.abstract()}
            />
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            paddingTop: "50px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="
              Group Name"
            variant="outlined"
          />
          <Typography variant="caption">
            This name is visible to your contacts
          </Typography>
          <TextField
            id="outlined-basic"
            label="
            Group Name"
            variant="outlined"
          />
        </Stack>
        <Button variant="outlined">Save</Button>
      </Stack>
    </div>
  );
};

export default Profile;
