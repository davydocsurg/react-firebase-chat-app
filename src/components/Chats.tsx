import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { config } from "../config";
import { db } from "../../firebase";
import { useAuthContext } from "../contexts";
import type { ChatType, User } from "../types";
import { useChatContext } from "../contexts";

interface UserChats {
    userInfo: User;
    lastMessage: {
        text: string;
        date: number;
    };
    date: number;
}

const Chats = (): React.ReactElement => {
    const { uid } = useAuthContext();
    const { setChat } = useChatContext();
    // const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState({} as UserChats | any);

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    const fetchUsers = async () => {
        try {
            console.log(uid);

            const unsub = onSnapshot(doc(db, "userChats", uid), (doc) => {
                // console.log("Current data: ", Object.entries(doc.data()));
                setChats(doc.data());
            });
            console.log(chats);

            Object.entries(chats)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((chat) => console.log(chat[1]));

            return unsub;
        } catch (error: unknown) {
            console.error(error);
        }
    };

    if (!chats || Object.entries(chats).length < 3) {
        return <h6>No Chats</h6>;
    }

    return (
        <div className="chats">
            {chats &&
                Object.entries(chats)
                    // ?.sort((a: any, b: any) => b[1].date - a[1].date)
                    .map((chat: any) => (
                        <div
                            className="userChat"
                            key={chat[0]}
                            onClick={() => setChat(chat[1])}
                        >
                            <img src={chat[1]?.photoURL} alt="" />
                            <div className="userChatInfo">
                                <span>{chat[1]?.displayName}</span>
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default Chats;
