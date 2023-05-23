import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileMessages from "./Messages/MobileMessages";
import MobileInput from "./Input/MobileInput";
import CallWhite from "../../../shared/user/img/chat/call-pink-white.png";
import CallDark from "../../../shared/user/img/chat/call-pink-dark.png";
import BackWhite from "../../../shared/user/img/chat/back-white.png";
import BackDark from "../../../shared/user/img/chat/back-dark.png";
import { ChatContext } from "../../../processes/user/context/ChatContext";
import { ThemeContext } from "../../../processes/user/context/ThemeContext";
import SwitchThemeButton from "../../../widgets/user/changeTheme/buttonThemeSwitcher/buttonThemeSwitcher";
import "./chat-styles/mobile-chat-styles-dark.scss";
import "./chat-styles/mobile-chat-styles-white.scss";

import DarkHorse from "../../../shared/logo/dark-pink-horse.png";
import WhiteHorse from "../../../shared/logo/white-pink-horse.png";

const MobileChat = () => {

  // theme switcher
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  const navigate = useNavigate();

  // chat data
  const { data } = useContext(ChatContext);

  const handleBack = () => {
    navigate("/home")
  };

  return (
    <div className={whiteTheme ? "chat-mobile-white" : "chat-mobile-dark"}>
      <div className="container">
        <div className="chat">
          <div className="chatInfo">
            <span>
              <SwitchThemeButton />
              <img src={whiteTheme ? BackWhite : BackDark} onClick={handleBack} />
            </span>
            <img src={whiteTheme ? WhiteHorse : DarkHorse} />
            <div className="chat-images">

              <img src={ whiteTheme ? CallWhite : CallDark } alt="" />
            </div>
          </div>
          <MobileMessages />
          <MobileInput />
        </div>
      </div>
    </div>
  );
};

export default MobileChat;