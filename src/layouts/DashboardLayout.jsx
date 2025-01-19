import React, { useState } from "react";
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
import UserProfile from "../pages/UserProfile";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";

const DashboardLayout = () => {
  const [role] = useGetRole();
  const [activeSection, setActiveSection] = useState("profile");
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    alert("You have been logged out!");
    // Add logout functionality
  };
  console.log("DashboardLayout", role);
  return (
    <div className="flex min-h-screen bg-gray-100 bg-fixed">
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
                isActive={activeSection === "newsletter-subscribers"}
                onClick={() => setActiveSection("newsletter-subscribers")}
              />
              <SidebarItem
                icon={<FaBook />}
                label="Add New Class "
                to="dashboard/add-new-class"
                isActive={activeSection === "add-new-class"}
                onClick={() => setActiveSection("add-new-class")}
              />

              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="All Trainers"
                to="dashboard/all-trainer"
                isActive={activeSection === "all-trainer"}
                onClick={() => setActiveSection("all-trainer")}
              />
              <SidebarItem
                icon={<FaChalkboardTeacher />}
                label="Applied Trainers"
                to="dashboard/applied-trainers"
                isActive={activeSection === "applied-trainers"}
                onClick={() => setActiveSection("applied-trainers")}
              />
              <SidebarItem
                icon={<FaDollarSign />}
                label="Balance"
                to="dashboard/balance"
                isActive={activeSection === "balance"}
                onClick={() => setActiveSection("balance")}
              />
              <SidebarItem
                icon={<FaComments />}
                label="Add New Post"
                to="dashboard/admin/add-new-forum-post"
                isActive={activeSection === "admin/add-new-forum-post"}
                onClick={() => setActiveSection("admin/add-new-forum-post")}
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
                isActive={activeSection === "activity-log"}
                onClick={() => setActiveSection("activity-log")}
              />
              <SidebarItem
                icon={<FaBook />}
                label="Booked Trainer"
                to="dashboard/booked-trainer"
                isActive={activeSection === "booked-trainer"}
                onClick={() => setActiveSection("booked-trainer")}
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
                isActive={activeSection === "add-new-slot"}
                onClick={() => setActiveSection("add-new-slot")}
              />
              <SidebarItem
                icon={<FaPen />}
                label="Manage Slot"
                to="dashboard/manage-slot"
                isActive={activeSection === "manage-slot"}
                onClick={() => setActiveSection("manage-slot")}
              />
              <SidebarItem
                icon={<FaComments />}
                label="Add New Post"
                to="dashboard/trainer/add-new-forum-post"
                isActive={activeSection === "trainer/add-new-forum-post"}
                onClick={() => setActiveSection("trainer/add-new-forum-post")}
              />
            </>
          )}
          {/* User Profile */}
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            to="dashboard/profile"
            isActive={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />
          <SidebarItem
            icon={<FaHome />}
            label="Home"
            to=""
            isActive={activeSection === "home"}
            onClick={() => setActiveSection("home")}
          />
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
          {/* {sections[activeSection]} */}
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

// Sidebar Item Component
// const SidebarItem = ({ icon, label, isActive, onClick }) => (
//   <div
//     className={`flex items-center gap-4 px-4 py-3 rounded cursor-pointer ${
//       isActive ? "bg-white text-orange-600" : "hover:bg-orange-700"
//     }`}
//     onClick={onClick}
//   >
//     <div className="text-xl">{icon}</div>
//     <Typography className="font-medium">{label}</Typography>
//   </div>
// );

// Dashboard Overview
const DashboardOverview = () => (
  <div className="p-4 bg-white rounded shadow">
    <Typography variant="h5" className="mb-4">
      Dashboard Overview
    </Typography>
    <Typography>
      Welcome to your dashboard. Select a section from the sidebar to begin.
    </Typography>
  </div>
);

// Profile Section
// const UserProfile = () => (
//   <div className="p-4 bg-white rounded shadow">
//     <Typography variant="h5" className="mb-4">
//       User Profile
//     </Typography>
//     <Typography>Update your personal information here.</Typography>
//   </div>
// );

// Manage Classes
const ManageClasses = () => (
  <div className="p-4 bg-white rounded shadow">
    <Typography variant="h5" className="mb-4">
      Manage Classes
    </Typography>
    <Typography>View and manage all classes you have access to.</Typography>
  </div>
);

// Manage Trainers
const ManageTrainers = () => (
  <div className="p-4 bg-white rounded shadow">
    <Typography variant="h5" className="mb-4">
      Manage Trainers
    </Typography>
    <Typography>View and manage trainers here.</Typography>
  </div>
);

// Community Posts
const CommunityPosts = () => (
  <div className="p-4 bg-white rounded shadow">
    <Typography variant="h5" className="mb-4">
      Community Posts
    </Typography>
    <Typography>Engage with the community by exploring forum posts.</Typography>
  </div>
);

export default DashboardLayout;
