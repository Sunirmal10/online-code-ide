import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { IoMdGrid, IoMdSearch } from "react-icons/io";
import { FaCode, FaFile, FaHandSparkles, FaList } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { MdAdd } from 'react-icons/md';
import CreateModal from '../components/CreateModal';
import { api_base_url, useFetchUserDetails } from '../Helper';
import { useEffect } from 'react';

const Home = () => {

  const [showList, setShowList] = useState(true);

  
    const { userData, isLoggedIn } = useFetchUserDetails();

  // const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");

  const [allProjects, setAllProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showCreatePopUp, setShowCreatePopUp] = useState(false);

  const [delID, setDelID] = useState("");

  // const projectCards = [
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     createdAt: "09-03-2022",
  //     avatar: "",
  //   },
  //   {
  //     id: 2,
  //     title: "Project 2",
  //     createdAt: "19-05-2023",
  //     avatar: "",
  //   },
  //   {
  //     id: 3,
  //     title: "loremsfsfhes eoifjseofi oefowef oew oef of ofj fjf fef he 8ef 8wef8 w eg8fef ejf euf uq0fue0f9 ruqef0ufreufr0 efe0 f0efef eif",
  //     createdAt: "19-05-2023",
  //     avatar: "",
  //   },
  //   {
  //     id: 4,
  //     title: "Project 2",
  //     createdAt: "19-05-2023",
  //     avatar: "",
  //   },
   
  // ];

  const fetchProjects = () => {

    setLoading(true);

    fetch(api_base_url + "/getprojects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success){
        setLoading(false);
        console.log("allProjects", data.projects);
        setAllProjects(data.projects);
        setError("");
      } else{
        setError(data.message);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  
  };

   

  useEffect(() => {

  fetchProjects();
  console.log("allProjects", allProjects);
  
  }, []);

  const filteredProjects = allProjects.filter((project) => {
    if(projectTitle !== ""){
      if(project) return project.title.toLowerCase().includes(projectTitle.toLowerCase())
   } else {
    return project;
   }
  }
   
  );

  return (
    <div className='bg-white max-h-full min-h-dvh dark:bg-gray-900 px-5 py-5'>
      <div className='flex flex-col md:flex-row gap-2 md:gap-0 items-start md:items-center  justify-between'>
        <span className='flex gap-2 items-center dark:text-white mb-2 md:mb-0'>Hi, {userData.name} 
<FaHandSparkles className='text-lg md:text-xl' />

        </span>
        <span className='flex gap-2 items-center w-full md:!w-sm'>
          <input type="text" placeholder='Search Projects....' value={projectTitle} className='h-10 w-full bg-gray-300 transition text-gray-800 dark:text-white text-sm dark:bg-gray-600 pl-4 rounded-full outline-none' onChange={(e)=> setProjectTitle(e.target.value)} />

          <button className='flex items-center justify-center w-10 h-10 bg-gray-800 text-white p-2 px-3 rounded-full hover:bg-gray-700 transition cursor-pointer text-lg active:scale-95'
          onClick={()=>setShowCreatePopUp(true)}
          >
          <MdAdd title='Add New Project' />
          </button>
        </span>
      </div>
      {
        // create modal 
        showCreatePopUp &&  <section className='flex justify-center items-center fixed top-0 left-0 bg-gray-900/80 backdrop-blur-sm w-screen h-full z-40'>
        <CreateModal setShowCreatePopUp={setShowCreatePopUp} />
      </section>
      }
      <span className='flex gap-3 my-4 md:my-2 items-center text-gray-600 dark:text-white text-sm font-semibold'>
     <button className='bg-gray-800 hover:bg-gray-700 text-white rounded-sm shadow-md p-1.5 cursor-pointer active:scale-90' onClick={()=>setShowList(!showList)}>
          {showList ? <FaList title='Toggle to Grid view' /> : <IoMdGrid title='Toggle to List view' /> }
          </button> 
          View:     {showList ? "List" : "Grid"}
      </span>

    <section className={ `gap-2.5 ${showList ? 'flex flex-col' : 'flex flex-wrap justify-center sm:justify-start gap-4 md:gap-2'}`}>

      {
        loading && <span className='flex justify-center items-center w-full h-20 text-gray-500/80 dark:text-white/80 text-md font-semibold'>Loading...</span>
      }
      

          { filteredProjects.length > 0 ?
            filteredProjects.map((item, i)=>(

              // main div container 
         
              <div title={"Project: "+item.title} key={i} className={`text-white shadow-md dark:bg-gray-800 bg-gray-200 px-2 hover:bg-gray-300 dark:hover:bg-gray-700 ${showList ? 'flex gap-2 items-center h-14 rounded-xs' : 'flex flex-col h-30 w-32 md:w-48 gap-4 justify-start rounded-xs py-3'}`}>
                {/* icon  */}
                <span className='flex items-center justify-center w-10 h-10 relative cursor-pointer'
                onClick={() => navigate(`/editor/${item._id}`)}
                >
                  <FaFile className='text-gray-900 dark:text-white w-8 h-10 shadow-md' />
                  <FaCode className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/6 w-2.5 h-2.5 text-white dark:text-gray-900' />
                </span>
                {/* <span className='flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-600 text-lime-400 w-10 h-10 rounded-md' onClick={() => navigate(`/editor/${item._id}`)}>
                <FaCode />
                </span> */}
                {/* project title + created at date + delete button */}
                <span className={`flex justify-between gap-2 items-center w-full`}>
          
                   {/* project title + created at  */}
                  <div className='flex flex-col gap-0.5 text-sm cursor-pointer flex-grow' onClick={() => navigate(`/editor/${item._id}`)}>
                  <span className='font-semibold text-gray-800 dark:text-gray-200' 
                  >
                  {item.title.length > 15 ? item.title.slice(0,15)+".." : item.title}
                  </span>
                  <span className='text-[10px] italic text-gray-400 dark:text-gray-300'>
                  Created at {new Date(item.date).toDateString()}

                  </span>
                  </div>
                  
                  {/* delete icon  */}
                  <BsFillTrashFill className='flex-shrink-0 text-red-400 text-xl cursor-pointer mt-5 mr-0.5 lg:mr-1 hover:text-green-500 dark:hover:text-green-300 text-shadow z-10' 
                  onClick={()=>{
                    setShowDeletePopUp(true);
                    setDelID(item._id);
                  }}
                  />
                </span>
              </div>
        
            ))

            : 
           !loading && filteredProjects.length === 0 && !error &&
              <span className=' flex justify-center items-center w-full h-20 text-gray-500/80 dark:text-white/80 text-md font-semibold'>No Projects Found!</span>
           
          }

          { error && <span className=' flex justify-center items-center w-full h-20 text-red-500/80 dark:text-white/80 text-md font-semibold'>{error}</span>}
          
          {
            showDeletePopUp &&
            <section className='flex justify-center items-center fixed top-0 left-0 bg-gray-800/80 backdrop-blur-sm w-screen h-full z-40'>
            <DeleteModal setShowDeletePopUp={setShowDeletePopUp} delID={delID} fetchProjects={fetchProjects} />
          </section>
          }
          
    </section>
    </div>
  )
}

export default Home