import { faker } from "@faker-js/faker";
import { createSlice, current } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { socket, token } from "../../socket";

const user_id = new Cookies().get("user_id");
const initialState = {
  newConversion: true,
  direct_chat: {
    convsersions: [], //chat list,
    current_messages: [],
    current_conversion: null,
  },
  group_chat: {},
  userInfo: {},
};

const slice = createSlice({
  name: "conversions",
  initialState,
  reducers: {
    newConversion(state, action) {
      state.newConversion = action.payload;
    },
    fetchDirectConversion(state, actions) {
      const userId = actions.payload.userId;
      let users = actions.payload.directConversions.map((el) => {
        const { lastMessage, lastMessageTime, unread, lastMessageTimeSort } =
          el;
        let user = el.participants.find((ele) => ele._id !== userId);

        const window_url = window.location.href;
        const open_conversion = window_url.split("/").at(-1).split("#").at(0);

        if (user._id.toString() === open_conversion) {
          const directConversionsUser = {
            conversation_id: el._id,
            userId: user?._id,
            img: faker.image.avatar(),
            name: user?.fullname,
            lastMsg: lastMessage,
            time: lastMessageTime,
            unread: 0,
            online: user?.status === "online",
            sort: lastMessageTimeSort,
          };
          socket.emit("read_message", { conversions_id: el._id, token });
          return directConversionsUser;
        }

        const unreadMsg = unread.find((ele) => ele.id === userId);
        const directConversionsUser = {
          conversation_id: el._id,
          userId: user?._id,
          img: faker.image.avatar(),
          name: user?.fullname,
          lastMsg: lastMessage,
          time: lastMessageTime,
          unread: unreadMsg.unread,
          online: user?.status === "online",
          sort: lastMessageTimeSort,
        };

        return directConversionsUser;
      });

      const sortUserChatList = users.sort((a, b) => {
        return Date.parse(b.sort) - Date.parse(a.sort);
      });

      //! sort user base on the last message

      state.direct_chat.convsersions = sortUserChatList;
      // state.direct_chat.convsersions.push({_conversation_id:actions.directConversions._id})
    },
    CurrentConversation(state, actions) {
      state.direct_chat.current_conversion = actions.payload;
    },
    CurrentMessages(state, action) {
      state.direct_chat.current_messages = action.payload;
    },
    updateCurrentMessage(state, action) {
      window.scrollTo(0, document.body.scrollHeight + 300);
      state.direct_chat.current_messages.push(action.payload);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 300);
      }, 100);
    },
    userInfo(state, action) {
      const this_user = current(state.direct_chat.convsersions).find(
        (ele) => ele.userId == action.payload.userId
      );
      state.userInfo.name = this_user.name;
      state.userInfo.online = this_user.online;
    },
  },
});

export default slice.reducer;

export function FetchDirectConversion(directConversions, userId) {
  return async (disptach) => {
    disptach(
      slice.actions.fetchDirectConversion({ directConversions, userId })
    );
  };
}
export function FetchCurrentMessages(messages) {
  return async (disptach) => {
    disptach(slice.actions.CurrentMessages(messages));
  };
}
export function UpdateCurrentMessage(messages) {
  return async (disptach) => {
    disptach(slice.actions.updateCurrentMessage(messages.message));
  };
}
export function CurrentConversation(conversation_id) {
  return (disptach) => {
    disptach(slice.actions.CurrentConversation(conversation_id));
  };
}
export function UserInfo(userId) {
  return async (disptach) => {
    disptach(slice.actions.userInfo({ userId }));
  };
}
export function NewConversion(value) {
  return async (dispatch) => {
    dispatch(slice.actions.newConversion(value));
  };
}
