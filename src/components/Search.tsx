import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";

const Search = (): React.ReactElement => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const [queryArr, setQueryArr] = useState<any>([]);

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

            console.log(username.charAt(0).toUpperCase() + username.slice(1));

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

    const handleSelect = () => {};

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
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
