import React, { useRef, useState } from "react";
import { config } from "../config";

const Message: React.FC<any> = ({ message }) => {
    const ref: any = useRef();

    const [data, setData] = useState({
        user: {
            photoURL: config.defaultPhoto,
        },
        chatId: "1",
    });
    // const {text, uid, photoURL} = message;
    const [currentUser, setCurrentUser] = useState({
        uid: "1",
        photoURL: config.defaultPhoto,
    });

    return (
        <div
            ref={ref}
            className={`message ${
                message.senderId === currentUser.uid && "owner"
            }`}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
