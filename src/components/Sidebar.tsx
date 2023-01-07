import React from "react";
import { Navbar, Search, Chats } from ".";

const Sidebar = (): React.ReactElement => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
};

export default Sidebar;
