import { createContext, useCallback, useContext, useState } from "react";
import type { User } from "../types";
import { useAuthContext } from "./AuthContext";

type IntialUserChatState = {
    chatId: string;
    user: User;
    setChat: (userInfo: User) => void;
};

export const ChatContext = createContext<IntialUserChatState>({
    chatId: "",
    user: {
        displayName: "",
        uid: "",
        photoURL: "",
    },
    setChat: () => {},
});

export const ChatProvider = ({ children }: JSX.Element | any) => {
    const [userChats, setUserChats] = useState({} as IntialUserChatState);
    const { uid } = useAuthContext();

    const setChat = (userInfo: User) => {
        let authChatUid = uid + userInfo.uid;
        let chatUid = userInfo.uid + uid;
        try {
            setUserChats({
                ...userChats,
                chatId: uid > userInfo.uid ? authChatUid : chatUid,
                user: userInfo,
            });
        } catch (error: unknown) {
            console.error(error);
        }
        // return userChats;
    };

    return (
        <ChatContext.Provider
            value={{
                chatId: userChats.chatId,
                user: userChats.user,
                setChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
