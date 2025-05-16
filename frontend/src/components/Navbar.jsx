import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import PopUp from "./PopUp";
import Avatar from '@mui/material/Avatar';
import { useFetchUserDetails } from "../Helper";
import { blueGrey, deepOrange } from "@mui/material/colors";

const Navbar = () => {

  const { userData, isLoggedIn } = useFetchUserDetails();

  const [showPopUp, setshowPopUp] = useState(false);

  const [userInitials, setUserInitials] = useState("");

  // const [userData, setUserData] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [error, setError] = useState("");

  const popUpRef = useRef(null);
  const userRef = useRef(null);

  function getInitials(name) {
  if (!name) return '';

  setUserInitials(name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('')) 
}

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popUpRef.current &&
        userRef.current &&
        !userRef.current.contains(e.target) &&
        !popUpRef.current.contains(e.target)
      ) {
        setshowPopUp(false);
      }
    };

    if (showPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopUp]);

  // Fetching the logged-in user's details



  // useEffect(() => {

  //   const userId = localStorage.getItem("userId");

  //   fetch(api_base_url + "/getuserdetails", {
  //     mode: "cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId: userId }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setIsLoggedIn(true);
          
  //         setUserData(data.user);
  //         console.log("userData", data.user);
  //       } else {
  //         setError(data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  useEffect(() => {
  getInitials(userData.name);
  }, [userData]);


  return (
    <nav className="flex sticky leading-tight top-0 left-0 right-0 justify-between items-center p-2 md:px-4  bg-white dark:bg-gray-800 shadow-md h-20 z-20">
      <Link to={"/"}>
        <span className="text-gray-800 dark:text-gray-100 text-md ml-1 md:ml-0 md:text-2xl font-bold leading-tight">
          O-iDE
        </span>
      </Link>

      <span className="flex gap-2 md:gap-4 items-center mr-0.5 md:mr-2 text-white text-xs md:text-sm relative">
        <NavLink
          to={"/projects"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-900 dark:!text-gray-100"
              : "hover:underline cursor-pointer !text-gray-400"
          }
        >
          Projects
        </NavLink>
        {/* <NavLink
          to={"about"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-900 dark:!text-gray-100"
              : "hover:underline cursor-pointer !text-gray-400"
          }
        >
          About
        </NavLink> */}
        {/* <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-900 dark:!text-gray-100"
              : "hover:underline cursor-pointer !text-gray-400"
          }
        >
          Contact
        </NavLink> */}
        <NavLink
          to={"/signup"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-900 dark:!text-gray-100 tracking-tighter "
              : "hover:underline cursor-pointer !text-gray-400 tracking-tighter "
          }
        >
          Sign up
        </NavLink>
        {
          isLoggedIn
          ?
           <Link to={"#"}>
          <div
            className="flex justify-center items-center p-0.5 relative text-lime-400 rounded-full cursor-pointer scale-80 md:scale-100"
            ref={userRef}
            onClick={() => setshowPopUp(!showPopUp)}
            title={userData.name}
          >
                <Avatar alt={userData.name}  sx={{ bgcolor: deepOrange[400], width: 36, height: 36 }} src="" >
                {userInitials}
                </Avatar>
          </div>
        </Link>
        :
         <NavLink
          to={"/login"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-900 dark:!text-gray-100"
              : "hover:underline cursor-pointer !text-gray-400"
          }
        >
          Login
        </NavLink>
        }
       
        {showPopUp && (
          <div className="p-0 m-0 absolute top-11 right-0" ref={popUpRef}>
            <PopUp />
          </div>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
