import React, { useContext, useState } from "react";
import Img from "../../../shared/user/img/img.png";
import Attach from "../../../shared/user/img/attach.png";
import { AuthContext } from "../../../processes/user/context/AuthContext";
import { ChatContext } from "../../../processes/user/context/ChatContext";
import { storage, db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import smileIcon from "../../../shared/user/img/smile4.png";
import Picker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import "./input-styles/dark-input-styles.scss";

// input func
const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

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
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onKeyDown={handleKey}
        onChange={(e) => setText(e.target.value)}
        value={text} />

      <div className="emoji">
        <img src={smileIcon}
          onMouseOver={() => { setShowPicker(false); }}
          onMouseDown={() => { setShowPicker(value => !value) }} />

        {showPicker && <Picker
          emojiStyle="twitter"
          searchDisabled="true"
          height={800}
          width={400}
          onEmojiClick={(emojiObject) => {
            setText((prevMsg) => prevMsg + emojiObject.emoji); setShowPicker(false);
          }} />}
      </div>

      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button id="sendMessage" onClick={handleSend}>Send</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Input;