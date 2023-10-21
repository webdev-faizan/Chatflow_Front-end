import React from "react";
import { faker } from "@faker-js/faker";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Stack,
  IconButton,
  Divider,
  Checkbox,
} from "@mui/material";
import { CaretLeft, Bell, CaretRight } from "phosphor-react";
import { privacy } from "../../data/setting";
import SelectConverstion from "../../components/setting/SelectConverstion";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Privacy = () => {
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
          <Typography variant="h5">Privacy</Typography>
        </Stack>
        {/*  */}
        <Stack spacing={2} direction={"column"} justifyContent={"start"}>
          {privacy.map((ele, index) => {
            const { title, subTitle, type, to } = ele;
            const length = privacy.length - 1;
            return (
              <>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack spacing={0.5}>
                    <Typography>{title} </Typography>
                    <Typography variant="caption">{subTitle}</Typography>
                  </Stack>
                  {type == "arrow" ? (
                    <IconButton>
                      <NavLink to={to}>
                        <CaretRight size={24} />
                      </NavLink>
                    </IconButton>
                  ) : (
                    <Checkbox
                      {...label}
                      defaultChecked
                      sx={{ color: "#5B96F7" }}
                    />
                  )}
                </Stack>

                <Divider
                  sx={{
                    display: index == length ? "none" : "unset",
                  }}
                  background="#A4A4A4"
                />
              </>
            );
          })}
        </Stack>
        {/*  */}
      </Stack>
      <SelectConverstion />
    </Stack>
  );
};

export default Privacy;
