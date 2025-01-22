import { Typography } from "@material-tailwind/react";
import {  NavLink } from "react-router-dom";
const SidebarItem = ({ icon, label, to = "" }) => {
  return (
    <>
      <NavLink
        to={`/${to}`}
        className={({ isActive }) =>
          `flex items-center gap-4 px-4 py-3 rounded cursor-pointer ${
            isActive ? "bg-orange-600 text-white" : ""
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        <Typography className="font-medium">{label}</Typography>
      </NavLink>
    </>
  );
};

export default SidebarItem;
