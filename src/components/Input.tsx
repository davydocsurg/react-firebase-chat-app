import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase";
import { useAuthContext } from "../contexts";

const Input: React.FC = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const { uid } = useAuthContext();

    const handleSend = async () => {
        try {
            const chatRef = doc(collection(db, "chats"));
            await setDoc(chatRef, {
                messages: {
                    id: uuid(),
                    text: text,
                    senderId: uid,
                    date: Timestamp.now(),
                },
            });

            // await updateDoc(doc(db, "userChats", uid), {
            //     [data.chatId + ".lastMessage"]: {
            //       text,
            //     },
            //     [data.chatId + ".date"]: serverTimestamp(),
            //   });
            setText("");
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <GrAttachment />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target?.files[0])}
                />
                <label htmlFor="file">{/* <img src={Img} alt="" /> */}</label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
