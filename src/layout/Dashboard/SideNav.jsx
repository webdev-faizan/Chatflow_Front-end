import React, { useState } from "react";
import { Box, Stack, IconButton, Divider, Avatar } from "@mui/material";
import { NavButton } from "../../data/index";
import { NavLink } from "react-router-dom";
import {
  NewConversion,
  RemoveCurrentMessages,
} from "../../redux/silice/conversions";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserImage } from "../../service/uploadUserImage";
import { updateUserProfile } from "../../service/user";
import { toast } from "react-toastify";
import { UpdateUserInfo } from "../../redux/app";
import useFetchedUserInfo from "../../hook/useGetUserInfo";

function Index() {
  const [select, SetSlect] = useState(0);
  const dispatch = useDispatch();
  const {
    userInfo: { fullname = "NAN", avatar = "" },
  } = useSelector((state) => state.app);
  useFetchedUserInfo();
  const handeChange = async (e) => {
    try {
      const { url } = await uploadUserImage(e);
      dispatch(UpdateUserInfo(url));
      await updateUserProfile(url);
    } catch (error) {
      console.log(error);
      toast.error("Image Upload Failed Please Try again later.");
    }
  };
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
                    dispatch(NewConversion(true));
                    dispatch(RemoveCurrentMessages());
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
                        dispatch(NewConversion(true));
                        dispatch(RemoveCurrentMessages());
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
          <Stack
            // spacing={3}
            sx={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                position: "absolute",
                zIndex: 3,
              }}
            >
              <input
                type="file"
                style={{ width: "39px", height: "40px", opacity: "0" }}
                accept="Image/*"
                onChange={handeChange}
              />
            </Stack>
            <Avatar alt={fullname} src={avatar} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Index;
