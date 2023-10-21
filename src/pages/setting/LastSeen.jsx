import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Stack,
  IconButton,
  Divider,
  Checkbox,
  Radio,
} from "@mui/material";
import { CaretLeft, Bell, CaretRight } from "phosphor-react";
import { privacy } from "../../data/setting";
import SelectConverstion from "../../components/setting/SelectConverstion";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const LastSeen = () => {
  const [selectedValue, setSelectedValue] = useState("Everyone");

  const handleChange = (event) => {
    setSelectedValue(event.target.name);
  };

  const navigate = useNavigate();

  return (
    <Stack direction={"row"} minHeight={"100vh"}>
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
          <IconButton onClick={() => navigate(-1)}>
            <CaretLeft size={24} />
          </IconButton>
          <Typography variant="h5" fontWeight={"blod"}>
            Last Seen
          </Typography>
        </Stack>
        <Typography color={"#5B96F7"}>
          {" "}
          If you don’t share your Last Seen, you won’t be able to see other
          people’s Last Seen
        </Typography>

        {/*  */}
        <Stack spacing={2} direction={"column"} justifyContent={"start"}>
          <Stack direction={"row"}>
            <Stack gap={"26px"} direction={"row"} alignItems={"center"}>
              <Radio
                name="Everyone"
                checked={selectedValue === "Everyone"}
                onChange={handleChange}
              />
              <Typography> Everyone</Typography>
            </Stack>
          </Stack>
          <Divider background="#A4A4A4" />
          <Stack direction={"row"}>
            <Stack gap={"26px"} direction={"row"} alignItems={"center"}>
              <Radio
                name="mycontact"
                inputProps={{ "aria-label": "A" }}
                checked={selectedValue === "mycontact"}
                onChange={handleChange}
              />
              <Typography> My Contacts</Typography>
            </Stack>
          </Stack>
          <Divider background="#A4A4A4" />
          <Stack direction={"row"}>
            <Stack gap={"26px"} direction={"row"} alignItems={"center"}>
              <Radio
                name="Nobody"
                checked={selectedValue === "Nobody"}
                onChange={handleChange}
              />
              <Typography> Nobody</Typography>
            </Stack>
          </Stack>
        </Stack>
        {/*  */}
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default LastSeen;
