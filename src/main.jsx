import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import ErrorPage from "./pages/errors/Error";
import Login from "./pages/auth//Login";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import SignUp from "./pages/auth/SignUp.jsx";
import IsPrivate from "./components/IsPrivate";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
