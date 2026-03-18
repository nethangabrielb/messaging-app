import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from "@/types/user";
import { socket } from "../socket";
import type {
  RefetchOptions,
  QueryObserverResult,
} from "@tanstack/react-query";
import useWidth from "@/stores/widthStore";

type Props = {
  user: User;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
};

const ChangeStatus = ({ user, refetch }: Props) => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const width = useWidth((state) => state.width);

  const status = user?.status;
  let placeholder: null | string = null;

  switch (status) {
    case "ONLINE":
      placeholder = width < 602 ? "🟢" : "🟢 Online";
      break;
    case "OFFLINE":
      placeholder = width < 602 ? "⚫" : "⚫ Offline";
      break;
    case "BUSY":
      placeholder = width < 602 ? "🔴" : "🔴 Busy";
      break;
  }

  const valueChangeHandler = (value: string) => {
    socket.emit("set status", token, value, (res: { success: true }) => {
      if (res.success) {
        refetch();
      }
    });
  };

  if (user)
    return (
      <Select onValueChange={valueChangeHandler}>
        <SelectTrigger className="sm:w-[150px]">
          <SelectValue placeholder={placeholder}>{placeholder}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ONLINE">
            <p>🟢 Online</p>
          </SelectItem>
          <SelectItem value="OFFLINE">
            <p>⚫ Offline</p>
          </SelectItem>
          <SelectItem value="BUSY">
            <p>🔴 Busy</p>
          </SelectItem>
        </SelectContent>
      </Select>
    );
};

export default ChangeStatus;
