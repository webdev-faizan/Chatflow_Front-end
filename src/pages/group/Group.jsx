import React, { useRef } from "react";
import GroupChatlist from "../../components/Chat/group/GroupChatlist";
import { Stack, Box } from "@mui/system";
import Message from "../../components/Chat/message";
import Conversion from "../../components/Chat/Conversion";

const Group = () => {
  return (
    <Box>
      <Stack direction={"row"} sx={{ position: "fixed", left: "123px" }}>
        <GroupChatlist />
      </Stack>

      <Stack direction={"row"} width=" calc(400px -100vw)">
        <Stack direction={"column"} sx={{ marginLeft: "370px", width: "100%" }}>
          <Conversion />
          <Box
            sx={{ marginY: "80px", width: "100%" }}
            padding="20px"
            overflow={"scroll"}
          >
            <Message />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Group;
