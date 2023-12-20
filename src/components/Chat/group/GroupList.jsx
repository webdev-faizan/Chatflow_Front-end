import React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Trash } from "phosphor-react";
import { StyledBadge } from "../../StyledBadge";

export const GroupList = () => {
  return (
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
      {/* one user */}
      <Box
        sx={{
          height: "81px",
          "flex-shrink": 0,
          "border-radius": "15px",
          background: "#5B96F7",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          marginTop: "10px",
        }}
        className="userChat"
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: "48px", height: "48px" }}
            alt="Femy Sharp"
            src="./photo-1527980965255-d3b416303d12.avif"
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
                textAlign: "end",
              }}
            >
              9:36
            </Typography>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                }}
              >
                <Box>
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
                <Trash size={22} className="trash showtrash" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/*  */}
    </Box>
  );
};

export default GroupList;
