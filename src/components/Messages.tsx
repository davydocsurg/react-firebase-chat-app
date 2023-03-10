import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Message } from ".";
import { db } from "../../firebase";
import { useChatContext } from "../contexts";
import type { MessagesType } from "../types";

const Messages = (): React.ReactElement => {
    const { user, chatId } = useChatContext();
    const [messages, setMessages] = useState([] as MessagesType[]);

    useEffect(() => {
        // return () => {
        //     unsub();
        // };
        fetchMessages();
    }, [chatId]);

    const fetchMessages = () => {
        if (chatId !== undefined) {
            const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
        }
    };

    if (messages.length < 1) {
        return (
            <div className="messages">
                <h3 className="empty-msg">No Messages found</h3>
            </div>
        );
    }

    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;
