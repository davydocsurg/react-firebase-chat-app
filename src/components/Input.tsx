import {
    arrayUnion,
    collection,
    doc,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase";
import { useAuthContext, useChatContext } from "../contexts";

const Input: React.FC = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState<File>();
    const { uid } = useAuthContext();
    const { chatId } = useChatContext();

    const handleSend = async () => {
        try {
            if (img) {
                const storageRef = ref(storage, uuid());
                const imgBlob = new Blob([img], {
                    type: img.type,
                });
                const uploadTask = uploadBytesResumable(storageRef, imgBlob);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                        console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await updateDoc(doc(db, "chats", chatId), {
                                    messages: arrayUnion({
                                        id: uuid(),
                                        text,
                                        senderId: uid,
                                        date: Timestamp.now(),
                                        img: downloadURL,
                                    }),
                                });
                            }
                        );
                    }
                );
            }
            // const chatRef = doc(db, "chats", chatId));
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: uid,
                    date: Timestamp.now(),
                }),
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
