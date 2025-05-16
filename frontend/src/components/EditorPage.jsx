import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import Editor from "@monaco-editor/react";
import { MdDarkMode, MdExpandMore, MdLightMode } from "react-icons/md";
import {
  FaExpandAlt,
  FaExpandArrowsAlt,
  FaSave,
  FaStepBackward,
} from "react-icons/fa";
import { BsArrowsExpand } from "react-icons/bs";
import { api_base_url, useFetchUserDetails } from "../Helper";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";

const EditorPage = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);

  const [isActiveTab, setIsActiveTab] = useState("html");

  const { projectId } = useParams();

  const { userData } = useFetchUserDetails();

  const [error, setError] = useState("");

  const [projectTitle, setProjectTitle] = useState("");

  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: orange; }");
  const [jsCode, setJsCode] = useState("console.log('Hello World');");

  //  const fetchProjectDetails = async () => {

  //   fetch(api_base_url + "/getproject", {
  //     mode: "cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: localStorage.getItem("userId"),
  //       projectId: projectId }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setHtmlCode(data.project.htmlCode);
  //         setCssCode(data.project.cssCode);
  //         setJsCode(data.project.jsCode);
  //       } else {
  //         setError(data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //   })
  //  }

  const runCode = () => {
    const html = htmlCode || "";
    const css = `<style>${cssCode || ""}</style>`;
    const js = `<script>${jsCode || ""}<\/script>`; // escape </script> to avoid breaking
    const iFrame = document.getElementById("output");
    if (iFrame) {
      iFrame.srcdoc = html + css + js;
    }
  };

  const handleKeyDown = (e) => {
  const isMac = navigator.userAgentData
  ? navigator.userAgentData.platform === 'macOS'
  : navigator.userAgent.toUpperCase().includes('MAC');
    const isSaveKey =
      (isMac && e.metaKey && e.key === "s") ||
      (!isMac && e.ctrlKey && e.key === "s");

   const calledFromButton = !e?.key;

  if (calledFromButton || isSaveKey) {
      e.preventDefault();
      console.log("Ctrl+S/Cmd+S default behavior disabled");

      // update the project with the current code

      fetch(api_base_url + "/updateproject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projectId: projectId,
          htmlCode: htmlCode,
          cssCode: cssCode,
          jsCode: jsCode,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Project updated successfully");
          } else {
            alert("Error updating project:", data.message);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  useEffect(() => {
    runCode();
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getproject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projectId: projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjectTitle(data.project.title);
          setHtmlCode(data.project.htmlCode);
          setCssCode(data.project.cssCode);
          setJsCode(data.project.jsCode);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const keydownHandler = (e) => handleKeyDown(e);

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [projectId, htmlCode, cssCode, jsCode]);

  return (
    <div className="flex flex-col">
      {/* editor navbar  */}
      <nav className="flex py-1 px-2 sticky top-20 w-full h-10 left-0 right-0 bg-white dark:bg-gray-900 dark:text-white md:px-4 items-center justify-between gap-2 sm:gap-10 shadow-md z-10">
        <span className="flex gap-1.5 items-center text-xs md:text-sm dark:text-gray-200">
            <span
            className="text-lg text-gray-800 dark:text-gray-300 cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 shadow p-1 rounded-sm"
            title="Go Back"
            onClick={() => window.history.back()}
          >
            <IoIosArrowBack />
          </span>
          <FaUser className="text-sky-800 dark:text-gray-300" />{" "}
          <strong>{userData.name}</strong>
        </span>
        <span className="flex gap-1 items-center text-xs md:text-sm ml-[-60px] md:ml-[-90px]">
          <BiSolidEditAlt className="text-sky-800 text-lg dark:text-gray-300" />
          <span title={projectTitle} >{projectTitle && projectTitle.length > 15 ? projectTitle.slice(0,15)+".." : projectTitle}</span>
        </span>
        {/* save, go-back, download buttons */}
        <span className="flex gap-1.5 md:gap-2.5 items-center">
          {/* <span
            className="text-lg text-gray-800 dark:text-gray-300 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 shadow p-1 rounded-sm"
            onClick={() => window.history.back()}
          >
            <IoIosArrowBack />
          </span> */}
          <span
            className="text-lg text-gray-800 dark:text-gray-300 cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 shadow p-1 rounded-sm"
            title="Save code"
            onClick={handleKeyDown}
          >
            <FaSave />
          </span>
          {/* <span className="text-lg text-gray-800 dark:text-gray-300 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 hover:dark:bg-gray-500 shadow p-1 rounded-sm"
          title="Download code"
          >
            <FiDownload />
          </span> */}
        </span>
      </nav>
      {/* main wrapper container: code writer + iframe */}
      <div
        className={
          isExpanded
            ? "flex flex-col overflow-y-auto"
            : "flex flex-col md:flex-row"
        }
      >
        {/* code writer section */}
        <section
          className={
            isExpanded
              ? "flex w-full flex-col border border-gray-400 "
              : "flex w-full flex-col md:w-1/2 border border-gray-400 min-h-dvh"
          }
        >
          {/* code writer navbar: (html, css, js tabs) + (theme, expand buttons)  */}
          <div
            className={`flex flex-wrap items-center justify-between pt-1 w-full px-1 ${
              darkTheme ? "bg-gray-900" : "bg-gray-300"
            } shadow h-fit top-30 left-0 text-white`}
          >
            {/* html, css, js tabs wrapper  */}
            <div className="flex flex-wrap gap-0.5 items-center pt-1">
              <span
                className={`px-4 ${
                  isActiveTab === "html" ? "bg-gray-600" : "bg-gray-800"
                } h-8 flex justify-between cursor-pointer w-fit gap-2 items-center rounded-t-xs text-xs`}
                onClick={() => setIsActiveTab("html")}
              >
                <span>HTML</span>
                {/* <IoMdClose className='text-lg' /> */}
              </span>

              <span
                className={`px-4 ${
                  isActiveTab === "css" ? "bg-gray-600" : "bg-gray-800"
                } h-8 flex justify-between cursor-pointer w-fit gap-2 items-center rounded-t-xs text-xs`}
                onClick={() => setIsActiveTab("css")}
              >
                <span>CSS</span>
                {/* <IoMdClose className='text-lg' /> */}
              </span>

              <span
                className={`px-4 ${
                  isActiveTab === "javascript" ? "bg-gray-600" : "bg-gray-800"
                } h-8 flex justify-between cursor-pointer w-fit gap-2 items-center rounded-t-xs text-xs`}
                onClick={() => setIsActiveTab("javascript")}
              >
                <span>JavaScript</span>
                {/* <IoMdClose className='text-lg' /> */}
              </span>
            </div>
            {/* setting buttons */}
            <div className="flex gap-2 cursor-pointer px-1">
              <div onClick={() => setDarkTheme((prev) => !prev)} title="Toggle Theme">
                {darkTheme ? (
                  <MdLightMode className="hover:bg-gray-600 w-6 h-6 bg-gray-400  shadow text-xs rounded-sm p-0.5" />
                ) : (
                  <MdDarkMode className="hover:bg-gray-600 w-6 h-6 bg-gray-400  shadow text-xs rounded-sm p-0.5" />
                )}
              </div>

              <FaExpandAlt
              title={isExpanded ? "Collapse" : "Expand"}
                className="hover:bg-gray-600 w-6 h-6 bg-gray-400  text-xs rounded-sm p-0.5"
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            </div>
            {/* online code editor  */}
            <Editor
              height="93dvh"
              theme={darkTheme ? "vs-dark" : "vs-light"}
              language={isActiveTab}
              value={
                isActiveTab === "html"
                  ? htmlCode
                  : isActiveTab === "css"
                  ? cssCode
                  : jsCode
              }
              onChange={(value) => {
                if (isActiveTab === "html") setHtmlCode(value);
                else if (isActiveTab === "css") setCssCode(value);
                else setJsCode(value);
              }}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                lineNumbers: "on",
                wordWrap: "on",
              }}
            />
          </div>
        </section>
        {/* iframe output section  */}
        <iframe
          className={
            isExpanded
              ? "w-full h-dvh bg-white text-black"
              : "w-full md:w-1/2 h-dvh bg-white text-black border border-gray-400"
          }
          id="output"
          title="Output"
        />
      </div>
    </div>
  );
};

export default EditorPage;
