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

    const setChat = useCallback(async (userInfo: User) => {
        console.log(userInfo.uid);

        try {
            setUserChats({
                ...userChats,
                chatId:
                    uid > userInfo.uid
                        ? uid + userInfo.uid
                        : userInfo.uid + uid,
                user: userInfo,
            });
            console.log("====================================");
            console.log(userChats);
            console.log("====================================");
        } catch (error: unknown) {
            console.error(error);
        }
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
