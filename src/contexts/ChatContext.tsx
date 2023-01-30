import { createContext, useCallback, useContext, useState } from "react";
import type { ChatType, User } from "../types";
import { useAuthContext } from "./AuthContext";

type IntialUserChatState = {
    chatId: string;
    user: ChatType;
    setChat: (userInfo: ChatType) => void;
};

export const ChatContext = createContext<IntialUserChatState>({
    chatId: "",
    user: {
        displayName: "",
        uid: "",
        photoURL: "",
        lastMessage: {
            text: "",
        },
    },
    setChat: () => {},
});

export const ChatProvider = ({ children }: JSX.Element | any) => {
    const [userChats, setUserChats] = useState({} as IntialUserChatState);
    const { uid } = useAuthContext();

    const setChat = (userInfo: ChatType) => {
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
