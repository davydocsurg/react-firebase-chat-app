import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useAuthContext } from "../contexts";

const Search = (): React.ReactElement => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const { displayName } = useAuthContext();

    const handleSearch = async () => {
        const term = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshots = await getDocs(term);
            console.log(querySnapshots);

            querySnapshots.forEach((doc) => {
                setUser(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
        } catch (error: any) {
            setErr(true);
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
