import type { ReactProps } from "@/types/reactNode";
import { ModeToggle } from "@/components/ModeToggle";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useEffect } from "react";
import protectedLoader from "@/lib/protectedLoader";
import useUser from "@/hooks/useUser";
import { HeaderDropdown } from "@/layouts/HeaderDropdown";
import ChangeStatus from "@/layouts/ChangeStatus";
import Navigation from "@/layouts/Navigation";

const Layout = ({ children }: ReactProps) => {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const token = JSON.parse(localStorage.getItem("token") as string);

  useEffect(() => {
    const isAuthenticated = protectedLoader();

    window.addEventListener("load", () => {
      if (isAuthenticated) {
        socket.connect();
        refetchUser();
      }
    });
  }, [refetchUser]);

  const logoutHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Delete token then navigate back home
    socket.emit("set status", token, "OFFLINE", (res: { success: true }) => {
      if (res.success) {
        socket.disconnect();
      }
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="grid h-full max-h-full grid-rows-[62px_1fr_28px] gap-2 p-4 sm:grid-cols-[1fr] lg:grid-cols-[1fr_1024px_1fr]">
      <header className="border-border bg-card row-start-1 row-end-2 flex h-fit items-center justify-between rounded-sm border p-3 lg:col-start-2 lg:col-end-3">
        <Navigation></Navigation>
        <div className="flex items-center gap-3">
          <ChangeStatus
            user={user?.data[0]}
            refetch={refetchUser}
          ></ChangeStatus>
          <ModeToggle></ModeToggle>
          <HeaderDropdown
            user={user?.data[0]}
            logoutHandler={logoutHandler}
          ></HeaderDropdown>
        </div>
      </header>
      {children}
      <footer className="flex items-center justify-center rounded-sm p-2 pt-5 lg:col-start-2 lg:col-end-3">
        <p>made with ♡ by nethan</p>
      </footer>
    </main>
  );
};

export default Layout;
