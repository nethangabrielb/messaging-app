import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useWidth from "@/stores/widthStore";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { useEffect } from "react";

const AccountSettings = () => {
  const location = useLocation();
  const width = useWidth((state) => state.width);
  const navigate = useNavigate();

  useEffect(() => {
    if (width >= 602) {
      if (location.pathname === "/settings") {
        navigate("/settings/profile");
      }
    }
  }, [width, location.pathname]);

  return (
    <main className="border-border bg-card row-start-2 flex max-h-full rounded-sm border lg:col-start-2 lg:col-end-3">
      {width < 602 && location.pathname === "/settings" ? (
        <SettingsSidebar location={location}></SettingsSidebar>
      ) : (
        (width < 602 && location.pathname === "/settings/profile" && (
          <Outlet></Outlet>
        )) ||
        (width < 602 && location.pathname === "/settings/account" && (
          <Outlet></Outlet>
        ))
      )}

      {width >= 602 && (
        <>
          <SettingsSidebar location={location}></SettingsSidebar>
          <Outlet></Outlet>
        </>
      )}
    </main>
  );
};

export default AccountSettings;
