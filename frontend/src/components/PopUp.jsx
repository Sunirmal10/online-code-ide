import React, { useState } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useFetchUserDetails } from '../Helper';

const PopUp = () => {

    const [showDarkMode, setshowDarkMode] = useState(false);

    const {setIsLoggedIn} = useFetchUserDetails();

    const navigate = useNavigate();

     const handleLogout = () => {
    // Remove the JWT token and any user info
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Update auth state
    setIsLoggedIn(false);
        window.location.reload();
    // Redirect to landing page or login
    navigate("/", { replace: true });
  };

  return (
    <div className='flex flex-col text-sm gap-1.5 bg-gray-200 dark:bg-gray-400 w-24 h-32.5 rounded-lg shadow-lg overflow-hidden text-gray-800 dark:text-white z-20'
    // ref={popUpRef}
    >
        <div className='cursor-pointer w-full pl-2 hover:bg-gray-300 p-1 dark:hover:text-gray-800'>
            
            <span>Profile</span>
        </div>
        <div  className='cursor-pointer w-full pl-2 hover:bg-gray-300 p-1 dark:hover:text-gray-800'>
            
            <span>Settings</span>
        </div>
        <div className='flex justify-between w-full px-2 items-center cursor-pointer hover:bg-gray-300 dark:hover:text-gray-800 p-1'
        id="dark-toggle"
        onClick={()=>{setshowDarkMode(!showDarkMode);
            document.documentElement.classList.toggle('dark')
        }}
        >
            <span title={ showDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'} >Theme</span>
            {showDarkMode ? <MdOutlineDarkMode className='text-lg' /> : <MdOutlineLightMode className='text-lg' />}
        </div>

         <div  className='cursor-pointer w-full pl-2 hover:bg-gray-300 p-1 dark:hover:text-gray-800'
         onClick={handleLogout}
         >
            
            <span>Logout</span>
        </div>
    </div>
  )
}

export default PopUp