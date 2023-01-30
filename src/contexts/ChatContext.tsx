import { createContext, useCallback, useContext, useState } from "react";
import type { User } from "../types";
import { useAuthContext } from "./AuthContext";

type ChatContextType = {
    chat: Object;
};

type ChatProviderProps = {
    children: JSX.Element | any;
};

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

    const setChat = useCallback(async (userInfo: User) => {
        setUserChats({
            ...userChats,
            chatId:
                uid > userInfo.uid ? uid + userInfo.uid : userInfo.uid + uid,
            user: userInfo,
        });
        // return userChats;
    }, []);

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
