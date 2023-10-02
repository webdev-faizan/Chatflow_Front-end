import { faker } from "@faker-js/faker";

import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const NavButton = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  {
    index: 2,
    icon: <Phone />,
  },
];

const chatlist = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:0",
    unread: 0,
    pinned: true,
    online: true,
  },
];

const chat_history = [
  {
    type: "msg",
    message: "hello ✋",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hii",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "how are you 😇",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: "",
    message: "yes i also can do that",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "img",
    message: "here you go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "here you go",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "this is a repy",
    message: "yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
];

export { NavButton, chat_history, chatlist };
