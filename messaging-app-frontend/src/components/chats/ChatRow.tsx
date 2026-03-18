import type { Chat } from "@/types/chats";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const ChatRow = ({ chat, roomId, user }: Chat) => {
  const navigate = useNavigate();

  const openChatHandler = () => {
    navigate(`/chat/${chat.id}`);
  };

  return (
    <button
      className={clsx(
        "flex-start hover:bg-secondary border-border flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition duration-100 sm:border-none",
        chat.id === roomId ? "bg-secondary" : "",
      )}
      onClick={openChatHandler}
    >
      <div className="flex items-center gap-2">
        <img
          src={`${
            chat?.users[0]?.avatar
              ? `${import.meta.env.VITE_SUPABASE_PUBLIC_URL}/${
                  chat?.users[0]?.avatar
                }`
              : "/default.jpg"
          }`}
          alt="user avatar"
          className="h-[38px] w-[38px] rounded-full object-cover"
        />
        <h1 className="font-light sm:text-[12px] lg:text-[14px]">
          {chat.users[0].username}
        </h1>
      </div>
      {chat?.Notification.length > 0 &&
        chat?.Notification[0].userId === user.id && (
          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[14px] text-neutral-800">
            {chat?.Notification[0].count}
          </div>
        )}
    </button>
  );
};

export default ChatRow;
