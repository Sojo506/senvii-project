import { createBrowserRouter, redirect, json } from "react-router-dom";
import DocumentPDF from "../components/DocumentPDF";
import { $axios } from "../lib";
import {
  Root,
  Login,
  App,
  Register,
  ForgotPassword,
  ResetPassword,
  MailConfirmed,
  Home,
  Diagnose,
  EditProfile,
} from "../views";

const userMiddleware = async () => {
  const { data } = await $axios.get("/auth/login");
  if (!data.success) {
    return redirect("/login");
  }
  return json(data);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        // element: <h1>Aqui va la landing</h1>,
        loader: async () => redirect("/app"),
      },
      {
        path: "/login",
        element: <Login />,
        loader: async () => {
          const { data } = await $axios.get("/auth/login");
          if (!data.success) {
            return null;
          }
          return redirect("/");
        },
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPassword />,
        loader: async ({ params: { id } }) => {
          return $axios(`/user/${id}`)
            .then(() => null)
            .catch((err) => redirect("/"));
        },
      },
      {
        path: "/mail-confirmed",
        element: <MailConfirmed />,
      },
      {
        path: "/app",
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: userMiddleware,
          },
          {
            path: "diagnose",
            element: <Diagnose />,
            loader: userMiddleware,
          },
          {
            path: "doc",
            element: <DocumentPDF />,
            loader: userMiddleware,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
            loader: async () => {
              const { data } = await $axios.get("/auth/login");
              if (!data.success) {
                return redirect("/login");
              }
              const { data: response } = await $axios.get(`/user/${data.id}`);
              return json(response);
            },
          },
        ],
      },
    ],
  },
]);

export default router;
