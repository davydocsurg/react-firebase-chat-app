export type MessagesType = {
    id: string;
    messages: Array<any>;
    date: Date;
    senderId: string;
    image?: string;
    text: string;
};

export type ChatType = {
    displayName: string;
    lastMessage: Object;
    photoURL: string;
    uid: string;
};
