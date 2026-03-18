import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/guest/Auth";
import protectedLoader from "@/lib/protectedLoader";

import People from "@/pages/authenticated/People";
import Chats from "@/pages/authenticated/Chats";
import AccountSettings from "@/pages/authenticated/Settings";
import Profile from "@/components/settings/Profile";
import Password from "@/components/settings/Password";
import { ErrorPage } from "@/pages/errors/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/chat",
    loader: protectedLoader,
    element: (
      <Layout>
        <Chats></Chats>
      </Layout>
    ),
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/chat/:roomId",
    loader: protectedLoader,
    element: (
      <Layout>
        <Chats></Chats>
      </Layout>
    ),
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/people",
    loader: protectedLoader,
    element: (
      <Layout>
        <People></People>
      </Layout>
    ),
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/settings",
    loader: protectedLoader,
    element: (
      <Layout>
        <AccountSettings></AccountSettings>
      </Layout>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "account",
        element: <Password></Password>,
        errorElement: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);

export default router;
