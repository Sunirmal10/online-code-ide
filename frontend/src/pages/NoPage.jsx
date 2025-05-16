import React from 'react'
import { FaBackward } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'

const NoPage = () => {
  console.log("api_base_url", import.meta.env.API_URL);
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen font-bold'>
      <span className='text-5xl text-gray-900'>404! Page not found.</span>
      <span className='flex gap-1 items-center text-gray-800 text-lg font-semibold border-0 cursor-pointer hover:underline' onClick={()=>window.history.back()}>
        <IoMdArrowRoundBack />
        <span>Go Back</span>
         </span>
    </div>
  )
}

export default NoPage