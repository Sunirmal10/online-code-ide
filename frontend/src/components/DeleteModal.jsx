import React from 'react'
import { api_base_url } from '../Helper';

const DeleteModal = ({setShowDeletePopUp, delID, fetchProjects}) => {

 const handleDelete = () => {

  fetch(api_base_url + "/deleteproject", {
   mode: "cors",
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({ projectId: delID, userId: localStorage.getItem("userId") }),
  })
   .then((res) => res.json())
   .then((data) => {
     if (data.success) {
       console.log("Project deleted successfully");
       fetchProjects(); // refetch the projects and update the all-projects-list post deletion
         setShowDeletePopUp(false);
        //  window.location.reload();
     } else {
       console.error("Error deleting project:", data.message);
     }
   })
   .catch((err) => {
     console.error("Error:", err);
   });



 }

  return (
    <div className='flex flex-col justify-between p-4 rounded-lg shadow-lg gap-2 bg-white dark:bg-gray-600 w-60 h-40 text-lg font-semibold dark:text-white'>
      <span>Do you want to delete this project?</span>
      <div className='flex w-full gap-1 justify-evenly'>
        <button className='w-24 bg-red-400 py-2 rounded-md text-white hover:bg-red-500 font-normal cursor-pointer'
        onClick={()=>handleDelete(delID)}
        >Delete</button>
        <button className='w-24 bg-gray-400 py-2 rounded-md text-white hover:bg-gray-500 font-normal cursor-pointer'
        onClick={()=>setShowDeletePopUp(false)}
        >Cancel</button>
      </div>
    </div>
  )
}

export default DeleteModal