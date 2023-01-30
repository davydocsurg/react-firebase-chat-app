import React, { useRef, useState } from "react";
import moment from "moment";
import { config } from "../config";
import { useAuthContext, useChatContext } from "../contexts";

const Message: React.FC<any> = ({ message }) => {
    const ref: any = useRef();
    const { uid, photoURL } = useAuthContext();
    const { chatId, user } = useChatContext();

    const [data, setData] = useState({
        user: {
            photoURL: config.defaultPhoto,
        },
        chatId: "1",
    });

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === uid && "owner"}`}
        >
            <div className="messageInfo">
                <img
                    src={message.senderId === uid ? photoURL : user.photoURL}
                    alt=""
                />
                <span>
                    {message.date && moment(message.date.seconds).format("LT")}
                </span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
