import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { Box, Stack, IconButton, Divider, Switch, Avatar } from "@mui/material";
import { NavButton } from "../../data/index";
import { Gear } from "phosphor-react";
import { NavLink } from "react-router-dom";

function Index() {
  const [select, SetSlect] = useState(0);
  return (
    <Box>
      <Box
        sx={{
          width: "129px",
          background: "#F0F4FA",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Stack spacing={1} direction="column" alignItems="center">
          <Box
            sx={{
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              background: "#5B96F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={"./logo.ico"}
              alt=""
              style={{
                height: "37px",
                width: "37px",
              }}
            />
          </Box>

          <br />
          <br />
          <Stack spacing={1} direction="column" alignItems="center">
            {NavButton.map((icons) => {
              const { icon, index, to } = icons;
              return (
                <Box
                  sx={{
                    background: select === index ? "#5B96F7" : "#F0F4FA",
                    borderRadius: "12px",
                  }}
                >
                  <IconButton
                    sx={{
                      color: select === index ? "#F0F4FA" : "#080707",
                      fontSize: "24px",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                    onClick={() => SetSlect(index)}
                  >
                    <NavLink to={to}>{icon}</NavLink>
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
          <Divider
            orientation="horizontal"
            sx={{
              background: "#B4B4B4",
              width: "100%",
              height: "1px",
            }}
          />
          <br />
        </Stack>

        <Stack
          sx={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{
              fontSize: "24px",
              color: "#080707",
              width: "48px",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink to="setting">
              <Gear sx={{ width: "24px", height: "24px", fontSize: "24px" }} />
            </NavLink>
          </IconButton>
          <Stack spacing={3}>
            <Switch defaultChecked />
            <NavLink to={"/profile"}>
              <Avatar alt="Remy Sharp" src="./Ellipse 1.svg" />
            </NavLink>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Index;
