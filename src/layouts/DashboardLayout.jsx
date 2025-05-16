import { useEffect, useState } from "react";
import {
  FaUser,
  FaChalkboardTeacher,
  FaComments,
  FaPen,
  FaDollarSign,
  FaHome,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaUsers,
  FaPlusCircle,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-tailwind/react";
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
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
};

const contentVariants = {
  expanded: {
    marginLeft: "16rem",
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
  collapsed: {
    marginLeft: "0",
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
};

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role, isLoading] = useGetRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Set sidebar open by default on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logOut();
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>FitTrack - Dashboard</title>
        <meta
          name="description"
          content="Welcome to FitTrack's admin dashboard. Manage trainers, members, classes, and more."
        />
      </Helmet>

      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <IconButton
          color="orange"
          variant="text"
          size="lg"
          onClick={toggleSidebar}
          className="rounded-full bg-orange-50 shadow-md"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </IconButton>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className={`w-64 md:w-72 bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed min-h-screen z-40 
            lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-hidden
            ${isSidebarOpen ? "shadow-2xl" : ""}`}
        >
          <div className="py-6 px-4 flex items-center justify-center border-b border-gray-700">
            <Typography variant="h4" color="white" className="font-bold text-2xl md:text-3xl">
              FitTrack
            </Typography>
          </div>

          <nav className="flex flex-col px-2 md:px-4 space-y-2 md:space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)] py-4">
            {/* Admin Routes */}
            {role === "admin" && (
              <div className="space-y-1 md:space-y-2">
                <SidebarItem icon={<FaDollarSign />} label="Overview" to="/dashboard/balance" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaClipboardList />} label="Subscribers" to="/dashboard/newsletter-subscribers" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaPlusCircle />} label="Add Class" to="/dashboard/add-new-class" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaUsers />} label="All Trainers" to="/dashboard/all-trainer" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaChalkboardTeacher />} label="Applied Trainers" to="/dashboard/applied-trainers" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaComments />} label="Forum Post" to="/dashboard/admin/add-new-forum-post" onClick={closeSidebarOnMobile} />
              </div>
            )}

            {/* Member Routes */}
            {role === "member" && (
              <div className="space-y-1 md:space-y-2">
                <SidebarItem icon={<FaHistory />} label="Activity Log" to="/dashboard/activity-log" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaChalkboardTeacher />} label="Booked Trainers" to="/dashboard/booked-trainer" onClick={closeSidebarOnMobile} />
              </div>
            )}

            {/* Trainer Routes */}
            {role === "trainer" && (
              <div className="space-y-1 md:space-y-2">
                <SidebarItem icon={<FaPen />} label="Add Slot" to="/dashboard/add-new-slot" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaClipboardList />} label="Manage Slot" to="/dashboard/manage-slot" onClick={closeSidebarOnMobile} />
                <SidebarItem icon={<FaComments />} label="Forum Post" to="/dashboard/trainer/add-new-forum-post" onClick={closeSidebarOnMobile} />
              </div>
            )}

            {/* Common Routes */}
            <div className="space-y-1 md:space-y-2 pt-4 border-t border-gray-700 mt-2">
              <SidebarItem icon={<FaUser />} label="Profile" to="/dashboard/profile" onClick={closeSidebarOnMobile} />
              <SidebarItem icon={<FaHome />} label="Home" to="/" onClick={closeSidebarOnMobile} />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 md:gap-3 w-full px-3 md:px-4 py-2 text-sm md:text-base text-left text-white hover:bg-gray-700 hover:text-orange-400 rounded-md transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        variants={contentVariants}
        animate={isSidebarOpen && window.innerWidth >= 1024 ? "expanded" : "collapsed"}
        className={`min-h-screen transition-all duration-300 ease-in-out pt-16 sm:pt-6 lg:pt-6
          ${isSidebarOpen && window.innerWidth >= 1024 ? "lg:ml-64 md:ml-72" : "ml-0"} px-2 sm:px-4 lg:px-6`}
      >
        {/* Top Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4 sm:mb-6"
        >
          <Typography variant="h5" color="blue-gray" className="mb-3 sm:mb-0 text-lg sm:text-xl truncate max-w-full sm:max-w-md">
            Welcome, {user?.displayName || "User"}!
          </Typography>
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.photoURL}
              alt="User Profile"
              size="sm"
              withBorder
              color="orange"
              className="ring-2 ring-orange-500 hidden sm:block"
            />
            <Button
              color="orange"
              size="sm"
              onClick={handleLogout}
              className="shadow-md hover:shadow-orange-500/20 transition-all duration-300 text-xs sm:text-sm"
            >
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Dynamic Outlet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6"
        >
          <Outlet />
        </motion.div>
      </motion.main>

      {/* Mobile Overlay */}
      {isSidebarOpen && window.innerWidth < 1024 && (
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
