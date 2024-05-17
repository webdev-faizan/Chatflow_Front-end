import React, { useState } from "react";
import { Box, Stack, IconButton, Divider, Avatar } from "@mui/material";
import { NavButton } from "../../data/index";
import { NavLink } from "react-router-dom";
import {
  NewConversion,
  RemoveCurrentMessages,
} from "../../redux/silice/conversions";
import { useDispatch } from "react-redux";

function Index() {
  const [select, SetSlect] = useState(0);
  const disptach = useDispatch();
  return (
    <Box>
      <Box
        sx={{
          width: "100px",
          background: "#FFFFFF",
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
              background: "#AFBBF7",
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
                  onClick={() => {
                    disptach(NewConversion(true));
                    disptach(RemoveCurrentMessages());
                  }}
                  sx={{
                    background: select === index ? "#5B96F7" : "#F0F4FA",
                    borderRadius: "12px",
                  }}
                >
                  <NavLink to={to}>
                    <IconButton
                      onClick={() => {
                        SetSlect(index);
                        disptach(NewConversion(true));
                        disptach(RemoveCurrentMessages());
                      }}
                      sx={{
                        color: select === index ? "#FFFFFF" : "#080707",
                        fontSize: "24px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      {icon}
                    </IconButton>
                  </NavLink>
                </Box>
              );
            })}
          </Stack>
          <br />
          <Divider
            orientation="horizontal"
            sx={{
              background: "#B4B4B4",
              marginY: "40px",
              width: "100%",
              height: "1px",
            }}
          />
        </Stack>
        <br />

        <Stack
          sx={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <NavLink to="setting">
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
            ></IconButton>
          </NavLink>
          <Stack spacing={3}>
            <Avatar alt="Remy Sharp" src="./Ellipse 1.svg" />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Index;
