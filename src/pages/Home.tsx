import React from "react";
import { Chats, Sidebar } from "../components";

const Home = (): React.ReactElement => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chats />
            </div>
        </div>
    );
};

export default Home;
