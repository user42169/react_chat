import React, { useContext, useState } from "react";
import ImgWhite from "../../../../shared/user/img/chat/add-image-pink-white.png";
import ImgDark from "../../../../shared/user/img/chat/add-image-pink-dark.png";
import AttachWhite from "../../../../shared/user/img/chat/attach-pink-white.png";
import AttachDark from "../../../../shared/user/img/chat/attach-pink-dark.png";

import SentWhite from "../../../../shared/user/img/chat/sent-pink-white.png";
import SentDark from "../../../../shared/user/img/chat/sent-pink-dark.png";

import { AuthContext } from "../../../../processes/user/context/AuthContext";
import { ChatContext } from "../../../../processes/user/context/ChatContext";
import { ThemeContext } from "../../../../processes/user/context/ThemeContext";
import smileIcon from "../../../../shared/user/img/chat/smile4.png";
import { storage, db } from "../../../../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Picker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import "./input-styles/mobile-input-styles-dark.scss";
import "./input-styles/mobile-input-styles-white.scss";
import "./input-styles/desktop-input-styles-dark.scss";
import "./input-styles/desktop-input-styles-white.scss";

// input func
const MobileInput = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

  // theme switcher
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  // get current user
  const { currentUser } = useContext(AuthContext);

  // get data of chat
  const { data } = useContext(ChatContext);

  // emoji
  const [showPicker, setShowPicker] = useState(false);

  // sending func
  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log("ERROR " + error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else if (text) {

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    } else if (file) {
      const storageRef = ref(storage, uuid);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // uploading file demo, broken
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      console.log("error");
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };



  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={whiteTheme ? "input-mobile-white" : "input-mobile-dark"}>
      <input
        type="text"
        placeholder="Type something..."
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        value={text} />

      <div className="emoji">

        {/* {showPicker && <Picker
        
          emojiStyle="twitter"
          searchDisabled="true"
          height={800}
          width={400}
          onEmojiClick={(emojiObject) => {
            setText((prevMsg) => prevMsg + emojiObject.emoji); setShowPicker(false);
          }} />} */}
      </div>

      <div className="send">
        <img src={smileIcon} />
        <img src={whiteTheme ? AttachWhite : AttachDark} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={whiteTheme ? ImgWhite : ImgDark} alt="" />
        </label>
        <img src={whiteTheme ? SentWhite : SentDark} id="sendMessage" onClick={handleSend} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default MobileInput;