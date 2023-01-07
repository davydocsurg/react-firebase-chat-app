import React, { useState } from "react";
import { config } from "../config";

const Chats = (): React.ReactElement => {
    const [chats, setChats] = useState([
        {
            id: 1,
            lastMessage: { text: "Hello" },
            date: "12:00",

            userInfo: {
                id: 1,
                photoURL: config.defaultPhoto,
                displayName: "John Doe",
            },
        },
    ]);

    const handleSelect = (data: Object) => {};

    return (
        <div className="chats">
            {Object.entries(chats)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((chat) => (
                    <div
                        className="userChat"
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                    >
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

export default Chats;
