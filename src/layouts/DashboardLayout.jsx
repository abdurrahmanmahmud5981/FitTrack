import React, { useState } from "react";
import { FaUser, FaChalkboardTeacher, FaBook, FaComments, FaSignOutAlt } from "react-icons/fa";
import { Typography, Avatar, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import SidebarItem from "../pages/DashBoard/SideberItem/SideberItem";
import UserProfile from '../pages/UserProfile';
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const {user,logOut} = useAuth()
  const sections = {
    overview: <DashboardOverview />,
    profile: <UserProfile />,
    classes: <ManageClasses />,
    trainers: <ManageTrainers />,
    community: <CommunityPosts />,
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    // Add logout functionality
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-r from-black/90 to-orange-900 text-white flex flex-col">
        <div className="py-6 px-4 flex items-center justify-center">
          <Typography variant="h4" color="white" className="font-bold">
            FitTrack
          </Typography>
        </div>
        <nav className="flex flex-col px-4 space-y-4">
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            to="dashboard/profile"
            isActive={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />
          <SidebarItem
            icon={<FaBook />}
            label="Classes"
            isActive={activeSection === "classes"}
            onClick={() => setActiveSection("classes")}
          />
          <SidebarItem
            icon={<FaChalkboardTeacher />}
            label="Trainers"
            isActive={activeSection === "trainers"}
            onClick={() => setActiveSection("trainers")}
          />
          <SidebarItem
            icon={<FaComments />}
            label="Community"
            to="community"
            isActive={activeSection === "community"}
            onClick={() => setActiveSection("community")}
          />
          <SidebarItem
            icon={<FaSignOutAlt />}
            label="Logout"
            to= ''
            onClick={handleLogout}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
          <Typography variant="h5" color="blue-gray">
            Welcome, {user?.displayName || 'User Name'}!
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
          <Outlet/>
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
    <Typography>Welcome to your dashboard. Select a section from the sidebar to begin.</Typography>
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
