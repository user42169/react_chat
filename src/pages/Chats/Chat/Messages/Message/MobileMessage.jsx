import React, { useContext, useRef, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import { doc, onSnapshot, deleteField, updateDoc, deleteDoc } from "firebase/firestore";
import timeSinceCalculate from "../../../../../widgets/user/TimeSinceCalculate/TimeSinceCalculate";
import { AuthContext } from "../../../../../processes/user/context/AuthContext";
import { ChatContext } from "../../../../../processes/user/context/ChatContext";
import { ThemeContext } from "../../../../../processes/user/context/ThemeContext";
import WhiteTrash from "../../../../../shared/user/img/chat/white-pink-trash.png";
import DarkTrash from "../../../../../shared/user/img/chat/dark-pink-trash.png";
import customNotification from "../../../../../features/user/Notifications/customNotification";
import "./message-styles/mobile-message-styles-dark.scss";
import "./message-styles/mobile-message-styles-white.scss";
import "./message-styles/desktop-message-styles-dark.scss";
import "./message-styles/desktop-message-styles-white.scss";
import { SplitText } from "@cyriacbr/react-split-text";

const MobileMessage = ({ message }) => {
  // message
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // context menu 
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  // use ref for storing old messages in the old state 
  const messageRef = useRef();

  // stop double messages
  let run = false;

  // theme switcher
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  // loading detection
  let loading = false;

  // scroll to the last message, dirty
  useEffect(() => {
    if (run === false) {
      run = true;
      messageRef.current?.scrollIntoView({ behavior: "smooth" });

      let seconds = Math.floor((new Date() - message.date.toDate()) / 1000);
      let interval = seconds / 60;

      if (interval <= 0.01 && message.senderId !== currentUser.uid) {
        // customNotification(message.text, data.user?.displayName, (whiteTheme ? "light" : "dark"));
        customNotification("New message!", data.user?.displayName, (whiteTheme ? "light" : "dark"));
      };
    };
  }, [message]);

  const deleteMessage = async (message) => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: deleteField( message.index)
      });

      console.log("success message")
    } catch (err) {
      console.log(err);
    };
  };

  const returnSuitableMessage = (message) => {
    if (message.text.lenght >= 60) {

    }
  }

  return (
    <div ref={messageRef}
      className={whiteTheme ? `message-mobile-white ${message.senderId === currentUser.uid && "owner"}` : `message-mobile-dark ${message.senderId === currentUser.uid && "owner"}`}
      onContextMenu={(e) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
        console.log("Right Click", e.pageX, e.pageY);
      }}
    >
      <div className="messageInfo">
        <img src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL

        } alt="" />
        <p>{timeSinceCalculate(message.date.toDate())} <img className="delete-button" src={whiteTheme ? WhiteTrash : DarkTrash} onClick={deleteMessage} /></p>

      </div>
      <div className="messageContent">
        {loading && <p>Loading...</p>}
        <p>{<SplitText>{message.text}</SplitText>}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default MobileMessage;