import React from "react";
import { Box, Stack } from "@mui/system";
import { chat_history } from "../../data";
import {
  TimeLine,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";
// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";

const Message = () => {
  const { current_messages } = useSelector(
    (state) => state.conversions.direct_chat
  );
  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          marginBottom: "100px",
          paddingX:"18px"
        }}
      >
        {current_messages.map((ele) => {
          switch (ele.type) {
            case "divider":
              return <TimeLine ele={ele} />;
            case "msg":
              switch (ele.subType) {
                case "Link":
                  return <LinkMsg ele={ele} />;
                case "Media":
                  return <MediaMsg ele={ele} />;

                case "Document":
                  return <DocMsg ele={ele} />;

                case "reply":
                  return <ReplyMsg ele={ele} />;

                default:
                  return <TextMsg ele={ele} />;
              }

            default:
              <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
