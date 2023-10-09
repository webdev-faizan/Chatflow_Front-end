import React from "react";
import { Box, Stack } from "@mui/system";
import { chat_history } from "../../data";
import { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg ,DocMsg} from "./MsgTypes";

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
                  return <LinkMsg ele={ele} />;
                case "img":
                  return <MediaMsg ele={ele} />;

                case "doc":
                  return <DocMsg ele={ele} />;

                case "reply":
                  return <ReplyMsg ele={ele} />;

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
