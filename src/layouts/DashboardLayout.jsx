
import {
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaComments,
  FaSignOutAlt,
  FaPen,
  FaDollarSign,
  FaHome,
} from "react-icons/fa";
import { Typography, Avatar, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import SidebarItem from "../pages/DashBoard/SideberItem/SideberItem";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const [role] = useGetRole();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
  };
  return (
    <div className="flex min-h-screen bg-gray-100 bg-fixed">
      <Helmet>
        <title>FitTrack - Dashboard</title>
        <meta
          name="description"
          content="Welcome to FitTrack's admin dashboard. Here you can manage your subscribers, trainers, classes, and more."
        />{" "}
        {/* SEO Meta Tags */}
        <meta property="og:title" content="FitTrack - Dashboard" />
        <meta
          property="og:description"
          content="Welcome to FitTrack's admin dashboard. Here you can manage your subscribers, trainers, classes, and more."
        />
      </Helmet>
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-black/90 to-orange-900 text-white flex flex-col fixed h-screen">
        <div className="py-6 px-4 flex items-center justify-center">
          <Typography variant="h4" color="white" className="font-bold">
            FitTrack
          </Typography>
        </div>
        <nav className="flex flex-col px-4 space-y-4">
          {/* admin routes */}
          {role === "admin" && (
            <>
              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="All Subscribers"
                to="dashboard/newsletter-subscribers"
              />
              <SidebarItem
                icon={<FaBook />}
                label="Add New Class "
                to="dashboard/add-new-class"
              />

              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="All Trainers"
                to="dashboard/all-trainer"
              />
              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="Applied Trainers"
                to="dashboard/applied-trainers"
              />
              <SidebarItem
                icon={<FaDollarSign />}
                label="Balance"
                to="dashboard/balance"
              />
              <SidebarItem
                icon={<FaComments />}
                label="Add New Post"
                to="dashboard/admin/add-new-forum-post"
              />
            </>
          )}
          {/* mamber routes */}
          {role === "member" && (
            <>
              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="Activity Log"
                to="dashboard/activity-log"
              />
              <SidebarItem
                icon={<FaBook />}
                label="Booked Trainer"
                to="dashboard/booked-trainer"
              />
            </>
          )}
          {/* trainer  routes */}
          {role === "trainer" && (
            <>
              <SidebarItem
                icon={<FaPen />}
                label="Add New Slot"
                to="dashboard/add-new-slot"
              />
              <SidebarItem
                icon={<FaPen />}
                label="Manage Slot"
                to="dashboard/manage-slot"
              />
              <SidebarItem
                icon={<FaComments />}
                label="Add New Post"
                to="dashboard/trainer/add-new-forum-post"
              />
            </>
          )}
          {/* User Profile */}
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            to="dashboard/profile"
          />
          <SidebarItem icon={<FaHome />} label="Home" to="" />
          <SidebarItem
            icon={<FaSignOutAlt />}
            label="Logout"
            to="login"
            onClick={handleLogout}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
          <Typography variant="h5" color="blue-gray">
            Welcome, {user?.displayName || "User Name"}!
          </Typography>
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.photoURL}
              alt="User Profile"
              size="sm"
              withBorder
              color="deep-orange"
            />
            <Button color="orange" size="sm" onClick={logOut}>
              Logout
            </Button>
          </div>
        </div>

        {/* Dynamic Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;
