import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../processes/user/context/ChatContext";
import Message from "../message/Message";
import { doc, onSnapshot, deleteField, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./messages-styles/dark-messages-styles.scss";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {

        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        }
    }, [data.chatId]);

    // /*
    const deleteChat = async () => {
        await deleteDoc(doc(db, "chats", data.chatId));
    };
    // */

    const deleteMessage = async () => {
        await deleteDoc(doc(db, "chats", messages));
    };

    return (
        <div className="messages-dark">
            <div>
                <button onClick={deleteChat}>Delete Chat</button>
                <button onClick={deleteMessage}>Delete messages</button>
            </div>
            {messages.map(m => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;