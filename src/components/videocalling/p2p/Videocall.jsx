import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { PhoneDisconnect } from "phosphor-react";
import { IconButton } from "@mui/material";

export default function Videocall() {
  return (
    <Box
      sx={{
        zIndex: 289228388989,
        position: "fixed",
        right: "28px",
        top: "10px",
      }}
    >
      <Card
        sx={{
          width: "480px",
          height: "250px",
          padding: "0",
        }}
      >
        <CardCover
          sx={{
            padding: "0",
          }}
        >
          <video
            style={{
              width: "500px",
              // height:"400px"
            }}
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Box>
            <video
              style={{
                display: "block",
                width: "150px",
                borderRadius: "10px",
                height: "100px",
                marginLeft: "auto",
                marginTop: "10px",
                position: "relative",
                right: "-11px",
              }}
              autoPlay
              loop
              muted
              poster="https://assets.codepen.io/6093409/river.jpg"
            >
              {/* <source
                src="https://assets.codepen.io/6093409/river.mp4"
                type="video/mp4"
              /> */}
            </video>
          </Box>

          <Box
            textAlign={"center"}
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            marginTop={"auto"}
            paddingBottom={"10px"}
          >
            <IconButton
              sx={{
                background: "#CC3C3C",
                width: "70px",
                height: "37px",
                borderRadius: "10px",
                "&:hover": {
                  background: "#CC3C3C",
                },
              }}
            >
              <PhoneDisconnect size={27} color="white" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
