import { useState, useEffect } from "react";

// 1. Using env variable as API URL because the backend URL has 2 ports
// 2. So, placing the same env variable name for both the URLs with different ports, stored in .env(frontend) and .env.alt (frontend) files

// 3. In Vite, environment variables are exposed to your app through import.meta.env, which is part of the ES Modules standard, unlike in CRA or Node.js where they are exposed through process.env.
// 4. Here, no need to import dotenv as Vite automatically loads the .env files in the root directory of your project.
// 5. The variables must start with VITE_ to be exposed to your code.

export const api_base_url = import.meta.env.VITE_API_URL


// import.meta.env.API_URL
export const useFetchUserDetails = () => {

      const [userData, setUserData] = useState({});
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [error, setError] = useState("");
   
     useEffect(() => {
   
       const userId = localStorage.getItem("userId");
   
       fetch(api_base_url + "/getuserdetails", {
         mode: "cors",
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ userId: userId }),
       })
         .then((res) => res.json())
         .then((data) => {
           if (data.success) {
             setIsLoggedIn(true);
             
             setUserData(data.user);
             console.log("userData", data.user);
           } else {
             setError(data.message);
           }
         })
         .catch((err) => {
           console.error(err);
         });
     }, []);

     return { userData, isLoggedIn, setIsLoggedIn, error };
 };
