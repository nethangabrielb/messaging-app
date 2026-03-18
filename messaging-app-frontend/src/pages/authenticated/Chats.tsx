import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatRow from "@/components/chats/ChatRow";
import type { ChatOverview } from "@/types/chats";
import fetchData from "@/lib/fetchData";
import ChatInterface from "@/components/chats/ChatInterface";
import useUser from "@/hooks/useUser";
import { socket } from "../../socket";
import useWidth from "@/stores/widthStore";
import { ChatRowSkeleton } from "@/components/chats/ChatRowSkeleton";

const Chats = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") as string);
  const width = useWidth((state) => state.width);

  const {
    data: userChats,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["chats", roomId],
    queryFn: async () => {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/chats`;
      return fetchData(url);
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (userChats?.data.length >= 1) {
      if (!roomId && width) {
        if (width > 602) {
          navigate(`/chat/${userChats?.data[0].id}`);
        }
      }
    }
  }, [roomId, userChats?.data.length, width]);

  useEffect(() => {
    const notificationHandler = (success: boolean) => {
      if (success) {
        console.log("RECEIVED CHAT");
        refetch();
      }
    };

    socket.on("notification", notificationHandler);

    return () => {
      socket.off("notification", notificationHandler);
    };
  }, []);

  useEffect(() => {
    const clearNotifications = () => {
      userChats?.data.forEach((chat: ChatOverview) => {
        if (chat.id === Number(roomId)) {
          if (chat.Notification.length > 0) {
            socket.emit(
              "clear notifications",
              user?.data[0]?.id,
              Number(roomId),
            );
          }
        }
      });
    };

    const clearNotificationsHandler = (success: boolean) => {
      if (success) {
        refetch();
      }
    };

    clearNotifications();

    socket.on("clear notifications", clearNotificationsHandler);

    return () => {
      socket.off("clear notifications", clearNotificationsHandler);
    };
  }, [roomId, user, userChats, refetch]);

  return (
    <main className="border-border bg-card row-start-2 flex max-h-full rounded-sm border lg:col-start-2 lg:col-end-3">
      {width && width < 602 ? (
        <>
          {roomId ? (
            <ChatInterface
              roomId={Number(roomId)}
              user={user?.data[0]}
              token={token}
              userChats={userChats?.data}
              isPending={isPending}
            ></ChatInterface>
          ) : (
            <aside className="border-r-border flex w-full flex-col gap-2 overflow-y-auto border-r p-2 sm:w-[250px] max-h-[796px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-transparent">
              {isPending ? (
                <ChatRowSkeleton></ChatRowSkeleton>
              ) : (
                userChats?.data?.map((chat: ChatOverview) => {
                  return (
                    <ChatRow
                      key={chat.id}
                      chat={chat}
                      roomId={Number(roomId)}
                      user={user?.data[0]}
                    ></ChatRow>
                  );
                })
              )}
            </aside>
          )}
        </>
      ) : (
        <>
          <aside className="border-r-border flex w-full flex-col gap-2 overflow-y-auto border-r p-2 sm:w-[250px] max-h-[796px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-transparent">
            {isPending ? (
              <ChatRowSkeleton></ChatRowSkeleton>
            ) : (
              userChats?.data?.map((chat: ChatOverview) => {
                return (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    roomId={Number(roomId)}
                    user={user?.data[0]}
                  ></ChatRow>
                );
              })
            )}
          </aside>
          {roomId && (
            <ChatInterface
              roomId={Number(roomId)}
              user={user?.data[0]}
              token={token}
              userChats={userChats?.data}
              isPending={isPending}
            ></ChatInterface>
          )}
        </>
      )}
    </main>
  );
};

export default Chats;
