import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url, useFetchUserDetails } from "../Helper";
import { useEffect } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  //  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState("");

  
    const { isLoggedIn } = useFetchUserDetails();

  const navigate = useNavigate();

  const handleData = (e) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  };

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then( async (res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          console.log("Login successful");
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          navigate("/projects");
          window.location.reload();
        } else {
          console.error(data.message);
          setError(data.message);
        }
      }).catch((err) =>{
         console.error(err)
            setError("Something went wrong.");
        });
  };

   useEffect(() => {
    if (isLoggedIn) {
      navigate("/projects", { replace: true });
      alert("You are already logged in. Please log out to login again.");
    }
  }, [isLoggedIn]);

  return (
    <main className=" ">
      <div className="flex flex-col items-center justify-center px-6 pt-12 pb-4 mx-auto h-full">
        <div className="w-full bg-white rounded border-slate-200 border  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => submitForm(e)}
            >
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded  outline-none focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => handleData(e)}
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
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-green-700  outline-none focus:border-green-700 block w-full p-2.5"
                  required
                  onChange={(e) => handleData(e)}
                />
              </div>
              <div className="flex items-center justify-start">
                <Link
                  to={"#"}
                  className="text-sm font-medium text-gray-900 hover:underline "
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-gray-800 w-full text-white px-6 py-3 rounded-full hover:bg-gray-700 transition cursor-pointer"
            >
             Login
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-gray-900 hover:underline "
                >
                  Sign up
                </Link>
              </p>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
