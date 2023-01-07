import React, { useState } from "react";
import { Input, Messages } from ".";
import { AiFillCamera } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { AiOutlineMore } from "react-icons/ai";
import { config } from "../config";

const Chat: React.FC = () => {
    const [data, setData] = useState({
        user: {
            photoURL: config.defaultPhoto,
            displayName: "John Doe",
        },
        chatId: "1",
    });

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <AiFillCamera />
                    <BiCommentAdd />
                    <AiOutlineMore />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;
