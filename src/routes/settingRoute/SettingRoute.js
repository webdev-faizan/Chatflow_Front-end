import LastSeen from "../../pages/setting/LastSeen";
import Notification from "../../pages/setting/Notification";
import Privacy from "../../pages/setting/Privacy";
import ProfilePhoto from "../../pages/setting/ProfilePhoto";
import About from "../../pages/setting/About";
import Groups from "../../pages/setting/Groups";
import BlockedContacts from "../../pages/setting/BlockedContacts";
import RequestInfo from "../../pages/setting/RequestInfo";
import Help from "../../pages/setting/Help";
import Security from "../../pages/setting/Security";
import Setting from "../../pages/setting/Setting";
import Chatwallpaper from "../../pages/setting/Chatwallpaper";

const SettingRoute = [
  {
    path: "/setting",
    Component: <Setting />, // JSX element
  },
  {
    path: "/setting/notifications",
    Component: <Notification />, // JSX element
  },
  {
    path: "/setting/privacy",
    Component: <Privacy />,
  },
  {
    path: "/setting/privacy/Lastseen",
    Component: <LastSeen />,
  },
  {
    path: "/setting/privacy/ProfilePhoto",
    Component: <ProfilePhoto />,
  },
  {
    path: "/setting/privacy/About",
    Component: <About />,
  },
  {
    path: "/setting/privacy/Groups",
    Component: <Groups />,
  },
  {
    path: "/setting/privacy/Blockedcontacts",
    Component: <BlockedContacts />,
  },
  {
    path: "/setting/security",
    Component: <Security />,
  },
  {
    path: "/setting/help",
    Component: <Help />,
  },
  {
    path: "/setting/requestinfo",
    Component: <RequestInfo />,
  },
  {
    path: "/setting/Chatwallpaper",
    Component: <Chatwallpaper />,
  },
];

export default SettingRoute;
