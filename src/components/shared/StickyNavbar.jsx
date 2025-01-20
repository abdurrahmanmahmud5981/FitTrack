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
export function StickyNavbar() {
  const { user, logOut } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  console.log(user, "StickyNavbar");
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  console.log(user?.photoURL);
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography as="li" variant="small" className="p-1 font-semibold">
        <NavLink style={({ isActive }) => ({ color: isActive ? "orange" : "" })} to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-semibold">
        <NavLink style={({ isActive }) => ({ color: isActive ? "orange" : "" })} to="/allTrainer" className="flex items-center">
          All Trainer
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-semibold">
        <NavLink  style={({ isActive }) => ({ color: isActive ? "orange" : "" })} to="/allClasses" className="flex items-center">
          All Classes
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-semibold">
        <NavLink
          style={({ isActive }) => ({ color: isActive ? "orange" : "" })}
          to="/community"
          className="flex items-center"
        >
          Community
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <>
      <div className="flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold text-xl flex  text-orange-400 items-center gap-3"
        >
          <img src={logo} alt="fit track logo" className="w-10" />
          <span className="">FitTrack</span>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block ">{navList}</div>
          <div
            onClick={() => setOpenNav(false)}
            className="flex items-center gap-x-1"
          >
            {user?.email ? (
              <div className="hidden lg:block">
                <Menu
                  animate={{
                    mount: { y: 15 },
                    unmount: { y: 45 },
                  }}
                >
                  <MenuHandler>
                    <Avatar
                      withBorder={true}
                      onClick={() => setOpenNav(false)}
                      className="cursor-pointer border-orange-900"
                      src={user ? user?.photoURL : ""}
                      alt={user ? user?.name : "userImage"}
                    />
                  </MenuHandler>
                  <MenuList>
                    <Link
                      to={"/dashboard"}
                      className="p-3 w-full block hover:bg-gray-100 transition duration-200"
                    >
                      <>Dashboard</>
                    </Link>
                    <MenuItem>
                      <Button onClick={logOut} variant="gradient" size="sm">
                        <span>Log Out</span>
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ) : (
              <>
                <NavLink to={"/login"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    <span>Log In</span>
                  </Button>
                </NavLink>
                <NavLink to={"/register"}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign in</span>
                  </Button>
                </NavLink>
              </>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {!user?.email ? (
          <div className="flex items-center gap-x-1 ">
            <NavLink to={"/login"}>
              <Button
                variant="text"
                size="sm"
                className="lg:hidden inline-block text-white"
              >
                <span>Log In</span>
              </Button>
            </NavLink>
            <NavLink to={"/register"}>
              <Button
                variant="gradient"
                size="sm"
                className="lg:hidden inline-block"
              >
                <span>Sign in</span>
              </Button>
            </NavLink>
          </div>
        ) : (
          <Menu
            animate={{
              mount: { y: 15 },
              unmount: { y: 45 },
            }}
          >
            <MenuHandler>
              <Avatar
                withBorder={true}
                onClick={() => setOpenNav(false)}
                className="cursor-pointer p-0.5 border-orange-900"
                src={user ? user?.photoURL : ""}
                alt={user ? user?.name : "userImage"}
              />
            </MenuHandler>
            <MenuList>
              <Link
                to={"/dashboard"}
                className="p-3 w-full block hover:bg-gray-100 transition duration-200"
              >
                <>Dashboard</>
              </Link>
              <MenuItem>
                <Button
                  onClick={logOut}
                  variant="gradient"
                  size="sm"
                  className=""
                >
                  <span>Log Out</span>
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Collapse>
    </>
  );
}
