import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../processes/user/context/AuthContext";
import { ChatContext } from "../../processes/user/context/ChatContext";
import { ThemeContext } from "../../processes/user/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import MobileChat from "./Chat/MobileChat";
import "./chats-styles/mobile-chats-styles-dark.scss";
import "./chats-styles/mobile-chats-styles-white.scss";

const MobileChats = () => {
  const [chats, setChats] = useState([]);

  // test navigate to chat
  const navigate = useNavigate();

  // context for chats and last messages
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // theme switcher
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  // get data of user chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // select chat
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    navigate("/chat")
  };

  return (
    <div className="chats">

      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className={whiteTheme ? "userChats-mobile-white" : "userChats-mobile-dark"}
          key={chat[0]}
          onClick={() => {
            handleSelect(chat[1].userInfo);
          }
          } >

          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">

            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileChats;