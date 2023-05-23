import React, { useContext, useState } from "react";
import Cam from "../../../shared/user/img/cam.png";
import Add from "../../../shared/user/img/add.png";
import More from "../../../shared/user/img/more.png";
import DarkTheme from "../../../shared/user/img/darkTheme.png";
import LightTheme from "../../../shared/user/img/lightTheme.png";
import { ThemeContext, themes } from '../../../processes/user/context/ThemeContext';
import Messages from "../../../widgets/user/messages/Messages";
import Input from "../../../widgets/user/input/Input";
import { ChatContext } from "../../../processes/user/context/ChatContext";
import "./chat-styles/dark-chat-styles.scss";

const Chat = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <ThemeContext>
            {({ changeTheme }) => (
              <img src={DarkTheme} alt="" onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }} />)}
          </ThemeContext>
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;