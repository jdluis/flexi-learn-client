import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Login from "./pages/auth//Login";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import SignUp from "./pages/auth/SignUp.jsx";
import "./index.css";
import AddCourse from "./pages/Instructor/AddCourse.jsx";
import EditCourse from "./pages/Instructor/EditCourse.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      //Main routes
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

      //Instructor routes
      {
        path: "/courses/add",
        element: <AddCourse />,
      },
      {
        path: "/courses/edit/:id",
        element: <EditCourse />,
      },
      //Error routes
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
