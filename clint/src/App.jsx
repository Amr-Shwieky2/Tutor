import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  AddCourses,
  AddReview,
  Auth,
  Courses,
  Dashboard,
  Home,
  ManageTutor,
  NotFound,
  TutorPage,
  Tutors,
} from "./pages";

import { ProtectedRoute, SharedLayout } from "./components";


const routes = [
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: 'add',
        element: <ManageTutor />,
      },
      {
        path: "tutor",
        children: [
          {
            path: ':tutorId',
            element: <TutorPage/>,
          },
          {
            path: ':tutorId/addReview',
            element: <AddReview/>,
          },
          {
            path: ':tutorId/addCourses',
            element: <AddCourses/>,
          },
          {
            path: ':tutorId/dashboard',
            element: <Dashboard/>,
          },
        ]
      },
      {
        path: "tutors",
        element: <Tutors/>,
      },
      {
        path: "Courses",
        element: <Courses/>,
      },
      // {
      //   path: 'shoe',
      //   children: [
      //     {
      //       path: ':shoeId',
      //       element: <Shoe />
      //     },
      //     {
      //       path: ':shoeId/edit',
      //       element: <ProtectedRoute> <ManageShoe /></ProtectedRoute>
      //     }
      //   ]
      // },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
