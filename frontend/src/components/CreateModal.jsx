import React, { useState } from 'react'
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const CreateModal = ({setShowCreatePopUp}) => {

  const [projectNameValue, setProjectNameValue] = useState("");

  // const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

 const handleCreate = () => {

  if (projectNameValue === "") {
    alert("Please enter a project name");
    return;
  } else {
    fetch(api_base_url + "/createproject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { title: projectNameValue,
           userId: localStorage.getItem("userId"),
         }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setShowCreatePopUp(false);
        setProjectNameValue("");
        alert("Project created successfully");
        navigate(`/editor/${data.projectId}`)
      } else {
        console.error(data.message);
      }
    })
  }


 }

  return (
    <div className='flex flex-col justify-between p-4 rounded-lg shadow-lg gap-2 bg-white dark:bg-gray-600 w-72 h-48 text-lg font-semibold dark:text-white'>
      <span>Create New Project</span>
      <input type="text" className='bg-gray-200 text-sm text-black pl-1.5 outline-0 rounded-md h-10 font-normal' placeholder='Enter new project title here....'
      value={projectNameValue} onChange={(e)=>setProjectNameValue(e.target.value)}
      />
      {/* <label className='flex items-center gap-1 text-sm font-normal dark:text-white cursor-pointer' htmlFor="is-public"
      onClick={()=>setIsPublic(!isPublic)}
      >
        <input type="checkbox" id='is-public' name='is-public'  checked={isPublic}  />
        Make it Public
      </label> */}
      <div className='flex w-full gap-2 justify-between'>
        <button className='w-32 bg-blue-400 py-2 rounded-md text-white hover:bg-blue-500 font-normal cursor-pointer'
        onClick={()=>handleCreate()}
        >Create</button>
        <button className='w-32 bg-gray-400 py-2 rounded-md text-white hover:bg-gray-500 font-normal cursor-pointer'
        onClick={()=>setShowCreatePopUp(false)}
        >Cancel</button>
      </div>
    </div>
  )
}

export default CreateModal