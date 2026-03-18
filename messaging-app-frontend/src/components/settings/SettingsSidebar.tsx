import type { Location } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Settings, User } from "lucide-react";
import clsx from "clsx";

type Props = {
  location: Location<any>;
};

const SettingsSidebar = ({ location }: Props) => {
  console.log(location);
  return (
    <aside className="sm:border-r-border flex w-full flex-col gap-2 p-2 sm:w-[250px] sm:border-r">
      <NavLink
        className={clsx(
          "flex-start hover:bg-secondary bg-secondary border-border sm:bg-card flex w-full cursor-pointer justify-center gap-4 rounded-lg border p-4 transition duration-100 sm:justify-start sm:border-none",
          location.pathname === "/settings/profile" && "!bg-secondary",
        )}
        to={"/settings/profile"}
      >
        <User></User>
        <p>Profile</p>
      </NavLink>
      <NavLink
        className={clsx(
          "flex-start hover:bg-secondary bg-secondary border-border sm:bg-card flex w-full cursor-pointer justify-center gap-4 rounded-lg border p-4 transition duration-100 sm:justify-start sm:border-none",
          location.pathname === "/settings/account" && "!bg-secondary",
        )}
        to={"/settings/account"}
      >
        <Settings></Settings>
        <p>Password</p>
      </NavLink>
    </aside>
  );
};

export default SettingsSidebar;
