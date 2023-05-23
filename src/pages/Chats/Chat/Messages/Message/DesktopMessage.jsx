import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../../processes/user/context/AuthContext";
import { ChatContext } from "../../../processes/user/context/ChatContext";
import timeSinceCalculate from "../TimeSinceCalculate";
import { doc, onSnapshot, deleteField, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import customNotification from "../../../features/user/CustomNotification";
import "./message-styles/dark-message-styles.scss"; 

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // use ref for storing old messages in the old state 
  const messageRef = useRef();

  // loading detection
  const [loading, setLoading] = useState(false);

  // scroll to the last message, dirty
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });

    let seconds = Math.floor((new Date() - message.date.toDate()) / 1000);
    let interval = seconds / 60;

    if (interval <= 0.001 && message.senderId !== currentUser.uid) {
      console.log("new mesage");
      customNotification("New message!");
    };
  }, [message]);

  const deleteMessage = async () => {
    try {
      //await deleteDoc(doc(db, "chats", message.id));
      await updateDoc(messageRef, {
        message: deleteField()
      });
    } catch (err) {
      console.log(err);
    };

    await deleteDoc(doc(db, "cities", "DC"));
  };

  return (
    <div ref={messageRef}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL

        } alt="" />
        <span><button className="button" onClick={deleteMessage}>Delete message</button></span>
        <span>{timeSinceCalculate(message.date.toDate())}</span>
      </div>
      <div className="messageContent">
        {loading && <p>Loading...</p>}
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;