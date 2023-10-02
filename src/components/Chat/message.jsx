import React from "react";
import { Box, Stack } from "@mui/system";
import { chat_history } from "../../data";
import { TimeLine, TextMsg } from "./MsgTypes";

const message = () => {
  return (
    <Box>
      <Stack spacing={3}>
        {chat_history.map((ele) => {
          switch (ele.type) {
            case "divider":
              return <TimeLine ele={ele} />;
            case "msg":
              switch (ele.subtype) {
                case "link":
                  // link msg
                  break;
                case "img":
                  break;

                // image msg
                case "doc":
                  // document mg
                  break;

                case "reply":
                  // reply msg
                  break;

                default:
                  return <TextMsg ele={ele} />;
              }

            default:
          }
        })}
      </Stack>
    </Box>
  );
};

export default message;
