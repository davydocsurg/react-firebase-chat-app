import React, { useState } from "react";
import { Input, Messages } from ".";
import { AiFillCamera } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { AiOutlineMore } from "react-icons/ai";
import { config } from "../config";
import { useChatContext } from "../contexts";

const Chat: React.FC = () => {
    const { chatId, user } = useChatContext();

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{user.displayName}</span>
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
