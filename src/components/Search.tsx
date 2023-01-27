import React, { useState } from "react";
import { useAuthContext } from "../contexts";

const Search = (): React.ReactElement => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const { displayName } = useAuthContext();

    const handleKeyDown = () => {};

    const handleSelect = () => {};

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setUsername(e.target.value)}
                    value={"username"}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={"user.photoURL"} alt="" />
                    <div className="userChatInfo">
                        <span>{displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
