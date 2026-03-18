import type { User } from "@/types/user";

// notification
interface Notification {
  count: number;
  id: number;
  roomId: number;
  userId: number;
}

// interface for overview of chats in chats row
interface ChatOverview {
  id: number;
  unread: number;
  users: [
    {
      id: number;
      username: string;
      avatar: string;
    },
  ];
  Notification: Array<Notification>;
}

interface EndUser {
  avatar: string;
  status: string | null;
  username: string;
}

// interface for user chats with room and users associated to room information
interface UserChats {
  id: number;
  name: string;
  users: Array<EndUser>;
}

// type props for chatrow component
type Chat = {
  chat: ChatOverview;
  user: User;
  roomId: number;
};

// type for room name
type ChatRoom = {
  roomId: number;
  user: User;
  token: string;
  userChats: Array<UserChats>;
  isPending: boolean;
};

export type { ChatOverview, Chat, ChatRoom, UserChats, EndUser };
