import { Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * SidebarItem
 * A reusable sidebar navigation link component with optional icon support.
 * Highlights when active and safely handles route prop errors.
 */
const SidebarItem = ({ icon, label, to }) => {
  // Prevent rendering if route is invalid
  if (!to || typeof to !== "string") {
    console.warn(`[SidebarItem] Invalid 'to' prop provided for "${label}"`);
    return null;
  }

  return (
    <NavLink
      to={`${to}`}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors duration-200
         ${isActive ? "bg-orange-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
      }
    >
      {icon && <span className="text-xl">{icon}</span>}
      <Typography as="span" className="text-sm font-medium">
        {label}
      </Typography>
    </NavLink>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarItem;
