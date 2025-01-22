import { useEffect, useState } from "react";
import {
  FaUser,
  FaChalkboardTeacher,
  FaComments,
  FaSignOutAlt,
  FaPen,
  FaDollarSign,
  FaHome,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaUsers,
  FaPlusCircle,
  FaHistory,
} from "react-icons/fa";
import { Typography, Avatar, Button, IconButton } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarItem from "../pages/DashBoard/SideberItem/SideberItem";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetRole from "../hooks/useGetRole";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../components/shared/LodingSpinner";

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};

const contentVariants = {
  expanded: {
    marginLeft: "16rem",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
  collapsed: {
    marginLeft: "0",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role , isLoading] = useGetRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logOut();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) return <LoadingSpinner/>;
  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>FitTrack - Dashboard</title>
        <meta
          name="description"
          content="Welcome to FitTrack's admin dashboard. Here you can manage your subscribers, trainers, classes, and more."
        />
      </Helmet>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <IconButton
          color="orange"
          variant="text"
          size="lg"
          onClick={toggleSidebar}
          className="rounded-full bg-orange-50"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </IconButton>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className={`w-64 bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed h-screen z-40 
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-6 px-4 flex items-center justify-center"
          >
            <Typography variant="h4" color="white" className="font-bold">
              FitTrack
            </Typography>
          </motion.div>

          <nav className="flex flex-col px-4 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {/* Admin Routes */}
            {role === "admin" && (
              <div className="space-y-2">
                <SidebarItem
                  icon={<FaClipboardList />}
                  label="Subscribers"
                  to="dashboard/newsletter-subscribers"
                />
                <SidebarItem
                  icon={<FaPlusCircle />}
                  label="Add Class"
                  to="dashboard/add-new-class"
                />
                <SidebarItem
                  icon={<FaUsers />}
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
                  label="Forum Post"
                  to="dashboard/admin/add-new-forum-post"
                />
              </div>
            )}

            {/* Member Routes */}
            {role === "member" && (
              <div className="space-y-2">
                <SidebarItem
                  icon={<FaHistory />}
                  label="Activity Log"
                  to="dashboard/activity-log"
                />
                <SidebarItem
                  icon={<FaChalkboardTeacher />}
                  label="Booked Trainers"
                  to="dashboard/booked-trainer"
                />
              </div>
            )}

            {/* Trainer Routes */}
            {role === "trainer" && (
              <div className="space-y-2">
                <SidebarItem
                  icon={<FaPen />}
                  label="Add Slot"
                  to="dashboard/add-new-slot"
                />
                <SidebarItem
                  icon={<FaClipboardList />}
                  label="Manage Slot"
                  to="dashboard/manage-slot"
                />
                <SidebarItem
                  icon={<FaComments />}
                  label="Forum Post"
                  to="dashboard/trainer/add-new-forum-post"
                />
              </div>
            )}

            {/* Common Routes */}
            <div className="space-y-2 pt-4 border-t border-gray-700">
              <SidebarItem icon={<FaUser />} label="Profile" to="dashboard/profile" />
              <SidebarItem icon={<FaHome />} label="Home" to="" />
              <SidebarItem
                icon={<FaSignOutAlt />}
                label="Logout"
                to="login"
                onClick={handleLogout}
              />
            </div>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        variants={contentVariants}
        animate={isSidebarOpen ? "expanded" : "collapsed"}
        className={`min-h-screen p-4 lg:p-6 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6"
        >
          <Typography variant="h5" color="blue-gray" className="mb-4 lg:mb-0">
            Welcome, {user?.displayName || "User"}!
          </Typography>
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.photoURL}
              alt="User Profile"
              size="sm"
              withBorder
              color="orange"
              className="ring-2 ring-orange-500"
            />
            <Button
              color="orange"
              size="sm"
              onClick={logOut}
              className="shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              Logout
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md lg:p-6"
        >
          <Outlet />
        </motion.div>
      </motion.main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
