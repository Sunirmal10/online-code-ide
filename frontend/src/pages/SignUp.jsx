import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api_base_url } from '../Helper';




const SignUp = () => {



 const [signUpData, setSignUpData] = useState({});
//  const [checkbox, setCheckbox] = useState(false);
const [error, setError] = useState("");

const navigate = useNavigate();

 const handleData = (e) => {
  setSignUpData((prev)=> {
    return {
      ...prev,
      [e.target.name]: e.target.value
    }
  });

   console.log(signUpData, "sign-up data");
   
 };

 const submitForm =(e)=> {
  e.preventDefault();

  if (signUpData.password === signUpData.confirmPassword) {
      fetch(api_base_url + "/signup", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        alert("User created successfully.");
        
        navigate("/login");
      } else {
        console.log(data.message);
        setError(data.message);
      }
    })
    .catch((err) => console.log(err));

  } else {
    setError("Password and confirm password do not match.");
  };

 };





  return (
    <main className="">
    <div className="flex flex-col items-center justify-center px-6 pt-6 pb-4 mx-auto ">
      <div className="w-full bg-white rounded-lg border-slate-200 border md:mt-0 sm:max-w-md xl:p-0  ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Sign Up
          </h1>
          <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e)=>submitForm(e)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                placeholder="name@example.com"
                required
                onChange={(e)=> handleData(e)}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                placeholder="John Doe"
                required
                onChange={(e)=> handleData(e)}

              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                required
                onChange={(e)=> handleData(e)}
            
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 outline-none"
                required
                onChange={(e)=> handleData(e)}

              />
            </div>
            {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:ring-3 focus:ring-sky-300 outline-none"
                  required
                  onChange={()=> setCheckbox(!checkbox)}
                  value={checkbox}
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{" "}
                  <Link
                    to={"#"}
                    className="font-medium text-sky-600 hover:underline "
                    
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div> */}
            <button
              type="submit"
               className="bg-gray-800 w-full text-white px-6 py-3 rounded-full hover:bg-gray-700 transition cursor-pointer"
             
            >
             Create Account
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-gray-900 hover:underline"
              >
                Login here
              </Link>
            </p>

            {error && <p className='text-red-500 text-sm'>{error}</p>}
            
          </form>
        </div>
      </div>
    </div>
  </main>
  )
}

export default SignUp