import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const date = new Date().getFullYear().toString();

  return (
    <nav className="flex flex-col gap-2 md:gap-0 md:flex-row justify-center md:justify-between md:items-center p-2 md:px-4 bg-gray-900 border-t border-gray-500 h-24 z-20">
      <div className="flex justify-between items-center flex-grow">
        <Link to={"/"}>
        <span className="text-gray-100 text-xs ml-1 md:ml-0 md:text-xl font-bold">
          <span>O-iDE</span>
        </span>
      </Link>

      <div className="hidden md:block text-gray-100 leading-tight text-[10px] md:text-xs relative md:left-20">
        © {date} O-iDE. All rights reserved.
      </div>

      <span className="flex gap-2 md:gap-4 items-center mr-2 text-white text-[10px] md:text-sm relative">
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-500"
              : "hover:underline cursor-pointer !text-gray-100"
          }
        >
          Help
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-500"
              : "hover:underline cursor-pointer !text-gray-100"
          }
        >
          About
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-500"
              : "hover:underline cursor-pointer !text-gray-100"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to={"#"}
          className={({ isActive }) =>
            isActive
              ? "hover:underline cursor-pointer !text-gray-500 tracking-tighter "
              : "hover:underline cursor-pointer !text-gray-100 tracking-tighter "
          }
        >
          Services
        </NavLink>
      </span>
     
      </div>

       <div className="flex justify-center items-center h-10 md:hidden text-gray-100 leading-tight text-[10px] md:text-sm">
        © {date} O-iDE. All rights reserved.
      </div>
    </nav>
  );
};

export default Footer;
