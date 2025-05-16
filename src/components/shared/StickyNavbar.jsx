import {
  Typography,
  Button,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";
import { RiCloseLargeLine, RiMenu3Fill } from "react-icons/ri";

import useIsAdmin from "../../hooks/useIsAdmin";

export function StickyNavbar() {
  const { user, logOut } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const [isAdmin] = useIsAdmin()
  console.log(isAdmin)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { name: "Home", path: "/" },
        { name: "All Trainer", path: "/allTrainer" },
        { name: "All Classes", path: "/allClasses" },
        { name: "Community", path: "/community" },
      ].map((item) => (
        <Typography key={item.name} as="li" variant="small" className="p-1 font-semibold">
          <NavLink
            to={item.path}
            className="flex items-center"
            style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
          >
            {item.name}
          </NavLink>
        </Typography>
      ))}
    </ul>
  );

  return (
    <>
      <div className="flex items-center justify-between  py-3">
        {/* Logo */}
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold text-xl flex text-orange-400 items-center gap-3"
        >
          <img src={logo} alt="FitTrack logo" className="w-10" />
          <span>FitTrack</span>
        </Typography>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navList}
          {user?.email ? (
            <Menu animate={{ mount: { y: 15 }, unmount: { y: 45 } }}>
              <MenuHandler>
                <Avatar
                  withBorder={true}
                  className="cursor-pointer border-orange-900"
                  src={user?.photoURL || ""}
                  alt={user?.name || "User Image"}
                />
              </MenuHandler>
              <MenuList>
                <Link
                  to={`/dashboard/${isAdmin
                      ? "balance"
                      : "profile"
                    }`}
                  className="p-3 w-full block hover:bg-gray-100 transition duration-200"
                >
                  Dashboard
                </Link>
                <MenuItem>
                  <Button onClick={logOut} variant="gradient" size="sm">
                    Log Out
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="text" size="sm" className="text-white">
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="gradient" size="sm">
                  Sign In
                </Button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <RiCloseLargeLine size={30} color="white" />
          ) : (
            <RiMenu3Fill size={40} color="white" />
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={openNav} className="lg:hidden">
        {navList}
        <div className="flex flex-col items-start gap-4">
          {user?.email ? (
            <>
              <Link
                to="/dashboard/profile"
                className="block w-full py-4 hover:text-orange-600 text-left lg:hover:bg-gray-700 transition duration-200"
              >
                Dashboard
              </Link>
              <Button onClick={logOut} variant="gradient" size="sm" className="w-full mb-4">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="w-full">
                <Button variant="text" size="sm" className="w-full text-left">
                  Log In
                </Button>
              </NavLink>
              <NavLink to="/register" className="w-full">
                <Button variant="gradient" size="sm" className="w-full text-left">
                  Sign In
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Collapse>
    </>
  );
}
