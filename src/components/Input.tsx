import {
    arrayUnion,
    collection,
    doc,
    serverTimestamp,
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
    const [img, setImg] = useState<File | any>(null);
    const { uid } = useAuthContext();
    const { chatId } = useChatContext();

    const handleSend = async () => {
        try {
            if (img) {
                console.log(img);

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
            } else {
                // const chatRef = doc(db, "chats", chatId));
                console.log(chatId);

                await updateDoc(doc(db, "chats", chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: text,
                        senderId: uid,
                        date: Timestamp.now(),
                    }),
                });
            }

            await updateDoc(doc(db, "userChats", uid), {
                [chatId + ".lastMessage"]: {
                    text,
                },
                [chatId + ".date"]: serverTimestamp(),
            });
            setText("");
            setImg(null);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <>
            {/* <div className="img-cont">
                {img !== null && <img src={img} />}
                <hr />
            </div> */}
            <div className="input">
                <input
                    type="text"
                    placeholder="Type something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <div className="send">
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="file"
                        onChange={(e) => setImg(e.target?.files[0])}
                    />
                    <label htmlFor="file">
                        <GrAttachment />
                        {/* <img src={img} alt="" /> */}
                    </label>
                    <button disabled={text.length < 1} onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default Input;
