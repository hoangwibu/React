import {
  Navbar,
  Typography,
  Button,
  MenuList,
  MenuItem,
  Avatar,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import { createElement, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { MyContextValue, userInfoType } from "../models/ContextType";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-app/firebase-config";
const NavBar = () => {
  const [, setOpenNav] = useState(false);
  const { userInfo } = useContext(AuthContext) as MyContextValue;
  const handleLoginGoogle = async ()=>{
    try {
       await signInWithPopup(auth, provider)
    } catch (error) {
        console.log('error: ', error);
    }
}
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {userInfo && userInfo.displayName ? (
          <ProfileMenu userInfo = {userInfo}></ProfileMenu>
        ) : (
          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={handleLoginGoogle}
          >
            <img src="/google.svg" alt="metamask" className="h-6 w-6" />
            {"Continue with Google"}
          </Button>
        )}
      </div>
    </Navbar>
  );
};
function ProfileMenu({userInfo}: {userInfo: userInfoType}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = async ()=>{
    try {
    await signOut(auth)
    } catch (error) {
        console.log(error);
    }
  }
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      action: true
    },
  ];
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src={userInfo?.photoURL}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                onClick = {action ? handleLogout : ()=>{}}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
export default NavBar;
