import React, { useState } from "react";
import { Message } from ".";

const Messages = (): React.ReactElement => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello",
            senderId: "1",
            img: "https://randomuser.me",
            date: "12:00",
        },

        {
            id: 2,
            text: "Hello",
            senderId: "2",
            img: "https://randomuser.me",
            date: "12:00",
        },
    ]);

    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;
