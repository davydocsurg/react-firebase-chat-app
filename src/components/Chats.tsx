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

interface User {
    uid: string;
    name: string;
    email: string;
}

const Chats = (): React.ReactElement => {
    const [users, setUsers] = useState<User[]>([]);
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

    useEffect(() => {
        fetchUsers();
        return () => {
            fetchUsers();
        };
    }, []);

    const handleSelect = (data: Object) => {};

    const fetchUsers = async () => {
        try {
            // const unsubscribe = onSnapshot(doc(db, "users"), (doc) => {
            //     console.log("Current data: ", doc.data());
            // });
            // FirebaseApp()
            // .collection("users")
            // .onSnapshot((snapshot: [any]) => {
            //     const fetchedUsers: User[] = [];
            //     snapshot.forEach((doc) => {
            //         fetchedUsers.push({
            //             id: doc.id,
            //             ...doc.data(),
            //         });
            //     });
            //     setUsers(fetchedUsers);
            // });

            const userRef = doc(db, "users");
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                console.log("Document data:", userSnap.data());
            }
            // userRef.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());
            // });
        } catch (error: unknown) {
            console.error(error);
        }
    };

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
