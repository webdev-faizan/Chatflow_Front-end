import { faker } from "@faker-js/faker";
import { createSlice, current } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import produce from "immer";

const user_id = new Cookies().get("user_id");
const initialState = {
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
    fetchDirectConversion(state, actions) {
      const userId = actions.payload.userId;

      const users = actions.payload.directConversions.map((el) => {
        const user = el.participants.find((ele) => ele._id != userId);
        const directConversionsUser = {
          conversation_id: el._id,
          userId: user?._id,
          img: faker.image.avatar(),
          name: user?.fullname,
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: false,
          online: user?.status == "online",
        };
        return directConversionsUser;
      });
      // alert(actions.directConversions[0]._id)
      state.direct_chat.convsersions = users;
      // state.direct_chat.convsersions.push({_conversation_id:actions.directConversions._id})
    },
    CurrentConversation(state, actions) {
      state.direct_chat.current_conversion = actions.payload;
    },
    CurrentMessages(state, action) {
      state.direct_chat.current_messages = action.payload;
    },
    updateCurrentMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload);
      window.scrollTo(0, document.body.scrollHeight + 300);
      setTimeout(() => {
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
