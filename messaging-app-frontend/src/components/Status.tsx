import type { User } from "@/types/user";

type Props = {
  statusClasses: string;
  user: User;
};

const Status = ({ statusClasses, user }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <p className="font-light text-xs">
        {!user?.status ? "OFFLINE" : user?.status}
      </p>
      <div className={statusClasses}></div>
    </div>
  );
};

export default Status;
