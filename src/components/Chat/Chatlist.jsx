import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { StyledBadge } from "../StyledBadge";
import { socket, token } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SelectConversation } from "../../redux/app";
import { FetchCurrentMessages, UserInfo } from "../../redux/silice/conversions";
export const Chatlist = () => {
  const { convsersions } = useSelector(
    (state) => state.conversions.direct_chat
  );
  const { id } = useParams();
  const [conversationId, setSlectConversion] = useState("");
  useEffect(() => {
    setSlectConversion(id);
  }, [id]);

  const navigate = useNavigate();
  const disptach = useDispatch();
  const fetchMessages = async (conversation_id, userId) => {
    navigate(`/c/${userId}#load`);
    disptach(UserInfo(userId));
    disptach(SelectConversation({ roomId: conversation_id ,userId}));
    console.log(conversation_id);
    socket.emit(
      "get_message",
      {
        conversions_id: conversation_id,
      },
      (data) => {
        disptach(FetchCurrentMessages(data));
      }
    );
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
  };

  return (
    <Stack spacing={1}>
      {convsersions.map((ele) => {
        const { userId, name, online, msg, time, unread, conversation_id } =
          ele;
        return (
          <Box
            onClick={() => fetchMessages(conversation_id, userId)}
            key={userId}
            sx={{
              height: "81px",
              "flex-shrink": 0,
              "border-radius": "15px",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              marginTop: "10px",
              cursor: "pointer",
              background: `${conversationId == userId ? "#5B96F7" : ""}`,
            }}
            on
          >
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  sx={{ width: "48px", height: "48px" }}
                  alt={name}
                  src={name}

                  // src="./Ellipse 1.svg"
                />
              </StyledBadge>
            ) : (
              <Avatar
                sx={{ width: "48px", height: "48px" }}
                src={name}
                // src="./Ellipse 1.svg"
              />
            )}

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
                  {name}
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
                  {msg}{" "}
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
                  }}
                >
                  {time}
                </Typography>

                <Badge
                  color="secondary"
                  badgeContent={unread}
                  sx={{
                    position: "relative",
                    top: "3px",
                    left: "12px",
                  }}
                ></Badge>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};

export default Chatlist;
