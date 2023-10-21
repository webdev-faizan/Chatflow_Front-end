import React, { useRef, useState } from "react";
import { faker } from "@faker-js/faker";

import {
  Typography,
  Stack,
  IconButton,
  Button,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { setting } from "../../data/setting";
import SelectConverstion from "../../components/setting/SelectConverstion";
import { NavLink } from "react-router-dom";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  bgcolor: "#FFF",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
const Setting = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef(null);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ position: "relative", height: "inherit" }}>
            <Typography id="modal-modal-title" variant="h6">
              Keyboard Shortcuts
            </Typography>
            <Stack spacing={2} mt={4}>
              <Stack direction={"row"} spacing={4} alignItems={"center"}>
                <Typography>Mark as unread</Typography>
                <Stack spacing={1} direction={"row"}>
                  <Button variant="outlined">Cmd</Button>
                  <Button variant="outlined">Shift</Button>
                  <Button variant="outlined">U</Button>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={4} alignItems={"center"}>
                <Typography>Mark as unread</Typography>
                <Stack spacing={1} direction={"row"}>
                  <Button variant="outlined">Cmd</Button>
                  <Button variant="outlined">Shift</Button>
                  <Button variant="outlined">U</Button>
                </Stack>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ position: "fixed", bottom: "20px", right: "50px" }}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>
      <Stack direction={"row"}>
        <Stack
          spacing={4}
          width={384}
          sx={{
            background: "#F8FAFF",
            boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25);",
            padding: "30px",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton>
              <CaretLeft size={24} />
            </IconButton>
            <Typography variant="h4">Settings</Typography>
          </Stack>
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            <Avatar
              sx={{ width: "75px", height: "75px" }}
              src={faker.image.avatar()}
            />
            <Stack alignItems={"center"} spacing={0.5}>
              <Typography>{faker.name.fullName()}</Typography>
              <Typography>Exploring </Typography>
            </Stack>
          </Stack>

          {setting.map((ele) => {
            const { text, icon, to } = ele;

            return (
              <>
                <Stack
                  spacing={1}
                  direction={"column"}
                  justifyContent={"start"}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <IconButton>{icon}</IconButton>
                    <NavLink
                      to={to}
                      style={{ color: "#727375", textDecoration: "none" }}
                    >
                      <Typography onClick={() => handleOpen()}>
                        {text}{" "}
                      </Typography>
                    </NavLink>
                  </Stack>
                  <Divider background="#A4A4A4" />
                </Stack>
              </>
            );
          })}
        </Stack>
        <SelectConverstion />
      </Stack>
    </>
  );
};

export default Setting;
