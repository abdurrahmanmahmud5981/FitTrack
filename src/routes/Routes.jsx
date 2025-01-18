import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllTrainer from "../pages/AllTrainer";
import AllClasses from "../pages/AllClasses";
import Community from "../pages/Community";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import TrainerDetails from "../pages/TrainerDetails";
import TrainerBooking from "../pages/TrainerBooking";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/UserProfile";
import AddNewSlot from "../pages/DashBoard/Trainer/AddSlot/AddNewSlot";
import AddNewClass from "../pages/DashBoard/Admin/AddClass/AddNewClass";
import BeTrainer from "../pages/BeTrainer/BeTrainer";
import NewsletterSubscribers from "../pages/DashBoard/Admin/Subscribers/NewsletterSubscribers";
import AllTrainers from "../pages/DashBoard/Admin/AllTrainers/AllTrainers";
import AppliedTrainer from "../pages/DashBoard/Admin/AppliedTrainer/AppliedTrainer";
import Balance from "../pages/DashBoard/Admin/Balance/Balance";
import ManageSlot from "../pages/DashBoard/Trainer/ManageSlot/ManageSlot";
import ActivityLog from "../pages/DashBoard/Member/ActivityLog/ActivityLog";
import BookedTrainer from "../pages/DashBoard/Member/BookedTrainer/BookedTrainer";
import AdminRoute from "./AdminRoutes";
import PrivatRoute from "./PrivatRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: "error",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/allTrainer", element: <AllTrainer /> },
      { path: "/trainer/:id", element: <TrainerDetails /> },
      { path: "/become-a-trainer", element: <BeTrainer /> },
      { path: "/bookTrainer/:slot", element: <TrainerBooking /> },
      { path: "/allClasses", element: <AllClasses /> },
      { path: "/community", element: <Community /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivatRoute>
        <DashboardLayout />
      </PrivatRoute>
    ),
    children: [
      // Add dashboard routes here
      // mamber routes
      {
        path: "/dashboard/profile",
        element: (
          <PrivatRoute>
            <UserProfile />
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/activity-log",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <ActivityLog />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/booked-trainer",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <BookedTrainer />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      // trainer routes
      {
        path: "/dashboard/add-new-slot",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <AddNewSlot />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/manage-slot",
        element: <ManageSlot />,
      },
      // admin routes
      {
        path: "/dashboard/newsletter-subscribers",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <NewsletterSubscribers />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/all-trainer",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <AllTrainers />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/applied-trainers",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <AppliedTrainer />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/balance",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <Balance />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
      {
        path: "/dashboard/add-new-class",
        element: (
          <PrivatRoute>
            <AdminRoute>
              <AddNewClass />
            </AdminRoute>
          </PrivatRoute>
        ),
      },
    ],
  },
]);

export default router;
