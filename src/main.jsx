import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Error500 from "./pages/errors/Error500";
import NotFound from "./pages/errors/NotFound";
import Login from "./pages/auth//Login";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import SignUp from "./pages/auth/SignUp.jsx";
import "./index.css";
import AddCourse from "./pages/Instructor/AddCourse.jsx";
import EditCourse from "./pages/Instructor/EditCourse.jsx";
import Profile from "./pages/Profile.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import VideoPlataform from "./pages/Student/VideoPlataform.jsx";
import PaymentSuccess from "./pages/Payment/PaymentSuccess"
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
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/courses/details/:courseId",
        element: <CourseDetails />,
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

      //Student routes
      {
        path: "/courses/lecture/:idLecture",
        element: <VideoPlataform />,
      },
      //Payment routes
      {
        path:"/payment-success",
        element: <PaymentSuccess />,
      },
      //Error routes
      {
        path: "/error",
        element: <Error500 />,
      },
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
