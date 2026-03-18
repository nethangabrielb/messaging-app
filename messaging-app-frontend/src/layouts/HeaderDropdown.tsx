import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Status from "@/components/Status";
import type { User } from "@/types/user";
import { useNavigate } from "react-router-dom";

type Props = Readonly<{
  user: User;
  logoutHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}>;

export function HeaderDropdown({ user, logoutHandler }: Props) {
  const navigate = useNavigate();
  const statusClasses = clsx(
    "w-[8px] h-[8px] rounded-full",
    user?.status === "OFFLINE" && "bg-neutral-500",
    user?.status === "ONLINE" && "bg-green-500",
    user?.status === "BUSY" && "bg-red-500",
    user?.status === null && "bg-neutral-500",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="h-[34px] w-[34px] cursor-pointer rounded-full object-cover select-none"
      >
        <img
          src={`${
            user?.avatar
              ? `${import.meta.env.VITE_SUPABASE_PUBLIC_URL}/${user?.avatar}`
              : "/default.jpg"
          }`}
          alt="user avatar"
          className="object-contain"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex justify-between">
            {user?.username}
            <Status user={user} statusClasses={statusClasses}></Status>
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
