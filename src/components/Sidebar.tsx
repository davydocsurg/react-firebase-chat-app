import React from "react";
import { Navbar, Search, Chat } from ".";

const Sidebar = (): React.ReactElement => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chat />
        </div>
    );
};

export default Sidebar;
