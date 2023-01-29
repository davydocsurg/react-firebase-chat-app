import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useAuthContext } from "../contexts";

type User = {
    displayName: string;
    email: string;
    uid: string;
    photoURL: string;
};

const Search = (): React.ReactElement => {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const [queryArr, setQueryArr] = useState<any>([]);
    const { uid, displayName, photoURL } = useAuthContext();

    const handleSearch = async () => {
        try {
            const usersRef = collection(db, "users");

            const term = query(
                usersRef,
                where(
                    "displayName",
                    "==",
                    username.charAt(0).toUpperCase() + username.slice(1)
                )
            );

            const querySnapshots = await getDocs(term);
            setQueryArr(querySnapshots);
            queryArr.forEach((doc: any) => {
                setUser(doc.data());
            });
        } catch (error: any) {
            setErr(true);
            console.error("Error searching user: ", error);
        }
    };

    const handleKey = (e: any) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        // check if chat exists in firestore
        const conversationId =
            uid > user?.uid! ? uid + user?.uid : user?.uid + uid;
        try {
            const chatRef = doc(db, "chats", conversationId);
            const res = await getDoc(chatRef);
            if (!res.exists()) {
                // if not, create new chat
                await setDoc(doc(db, "chats", conversationId), {
                    messages: [],
                });

                await updateDoc(doc(db, "userChats", uid), {
                    [conversationId + ".userInfo"]: {
                        uid: user?.uid,
                        displayName: user?.displayName,
                        photoURL: user?.photoURL,
                    },
                    [conversationId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user?.uid!), {
                    [conversationId + ".userInfo"]: {
                        uid: uid,
                        displayName: displayName,
                        photoURL: photoURL,
                    },
                    [conversationId + ".date"]: serverTimestamp(),
                });
            }
        } catch (error: unknown) {}
        // if yes, go to chat
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user?.photoURL!} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
