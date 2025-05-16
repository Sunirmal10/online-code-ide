import React from 'react'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
     <div className=" bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ">

      <main className="flex flex-col-reverse md:flex-row items-center">
        {/* Text Section */}
        <div className="w-full md:w-3/5 space-y-6 p-7 lg:-mt-20">
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight md:text-gray-800 dark:text-gray-100 ">
            Build. Save. Run.<br />Your Code Online.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
           <strong> O-iDE</strong> is a lightweight web code editor for <strong>HTML</strong>, <strong>CSS</strong>, and <strong>JavaScript</strong>.
            Write and <strong>preview</strong> code instantly, from anywhere.  <strong>Store your code</strong> and visit anytime.
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition"
            >
             Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-400 transition dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Image Section */}

        {/* For folded corner effect */}
        {/* <div className="w-full h-full md:w-2/5 mb-2 md:mb-0 bg-transparent relative"
        //  style={{ boxShadow: '-5px 0px 10px 0px rgba(156, 163, 175, 0.5)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGluZ3xlbnwwfDF8MHx8fDA%3D"
            alt="Code Illustration"
            className="w-full h-72 md:h-full folded-rectangle mx-auto"
          />
            <div class="corner-fold"></div>
        </div> */}

        {/* For normal image rectangle */}

        <div className="w-full h-full md:w-2/5 mb-2 md:mb-0 "
         style={{ boxShadow: '-5px 0px 10px 0px rgba(156, 163, 175, 0.5)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGluZ3xlbnwwfDF8MHx8fDA%3D"
            alt="Code Illustration"
            className="w-full h-72 md:h-full mx-auto"
          />
          
        </div>

   

      </main>
    </div>
  );
};
export default LandingPage