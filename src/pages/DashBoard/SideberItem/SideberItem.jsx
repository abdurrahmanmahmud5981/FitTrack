import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const SidebarItem = ({ icon, label, to = "/", isActive, onClick }) => {
  return (
    <>
      <Link
        to={`/${to}`}
        className={`flex items-center gap-4 px-4 py-3 rounded cursor-pointer ${
          isActive ? "bg-white text-orange-600" : "hover:bg-orange-700"
        }`}
        onClick={onClick}
      >
        <span className="text-xl">{icon}</span>
        <Typography className="font-medium">{label}</Typography>
      </Link>
    </>
  );
};

export default SidebarItem;
