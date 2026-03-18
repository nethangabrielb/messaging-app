import clsx from "clsx";
import type { MessageInterface } from "@/types/messages";

type Props = {
  message: MessageInterface;
  userId: number;
};

const Message = ({ message, userId }: Props) => {
  return (
    <div
      className={clsx(
        "border-border bg-secondary w-fit max-w-[50%] rounded-lg border p-2 px-2 text-[12px] font-light sm:p-2 sm:px-2 sm:text-[12px] lg:p-2 lg:px-3 lg:text-[14px]",
        userId !== message.senderId ? "self-start" : "self-end",
      )}
    >
      {message.message}
    </div>
  );
};

export default Message;
