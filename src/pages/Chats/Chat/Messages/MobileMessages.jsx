import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot, deleteField, updateDoc, deleteDoc } from "firebase/firestore";
import MobileMessage from "./Message/MobileMessage";
import { ChatContext } from "../../../../processes/user/context/ChatContext";
import { ThemeContext } from "../../../../processes/user/context/ThemeContext";
import { db } from "../../../../firebase";
import WhiteTrash from "../../../../shared/user/img/chat/white-pink-trash.png";
import DarkTrash from "../../../../shared/user/img/chat/dark-pink-trash.png";
import "./messages-styles/mobile-messages-styles-dark.scss";
import "./messages-styles/mobile-messages-styles-white.scss";
import "./messages-styles/desktop-messages-styles-dark.scss";
import "./messages-styles/desktop-messages-styles-white.scss";

const MobileMessages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;

    useEffect(() => {

        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        }
    }, [data.chatId]);

    const deleteMessage = async (index) => {
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: deleteField("messages")
            });

            console.log("success message")
        } catch (err) {
            console.log(err);
        };
    };

    const deleteChat = async () => {
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: deleteField()
            });
            // console.log(doc(db, "chats", data.chatId, "messages", message.id));

            console.log("success chat")
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className={whiteTheme ? "messages-mobile-white" : "messages-mobile-dark"}>
            <div className="delete-chat" >
                <img className="delete-chat" src={whiteTheme ? WhiteTrash : DarkTrash} onClick={deleteMessage} />
            </div>
            {messages ? messages.map(m => (
                <MobileMessage message={m} key={m.id} index={m.id} />
                //<button message={m} key={m.id}>{deleteMessage(m)}</button>

            )) : <h3>Chat is empty ...</h3>}
        </div>
    );
};

export default MobileMessages;